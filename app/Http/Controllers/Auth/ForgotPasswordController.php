<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\Facades\Validator;
use App\Models\User;
use Inertia\Inertia;

class ForgotPasswordController extends Controller
{
    /**
     * Menampilkan halaman lupa password
     */
    public function showResetForm()
    {
        return Inertia::render('Auth/ForgotPassword');
    }

    /**
     * STEP 1: Validasi Email
     */
    public function validateEmail(Request $request)
    {
        $request->validate([
            'email' => 'required|email|exists:users,email',
        ]);

        // Batasi percobaan agar tidak bisa brute-force
        $key = 'validate-email:' . $request->ip();
        if (RateLimiter::tooManyAttempts($key, 5)) {
            return back()->withErrors(['email' => 'Terlalu banyak percobaan. Coba lagi dalam beberapa menit.']);
        }
        RateLimiter::hit($key, 60);

        // Simpan email yang divalidasi ke dalam session
        session()->put('resetEmail', $request->email);
        session()->flash('emailValidated', true);

        // Kembalikan respons JSON agar kompatibel dengan Inertia
        return back();
    }

    /**
     * STEP 2: Reset Password
     */
    public function resetPassword(Request $request)
    {
        // Ambil email dari session atau request
        $email = session()->get('resetEmail', $request->email);

        if (!$email) {
            return back()->withErrors(['email' => 'Terjadi kesalahan! Silakan ulangi proses dari awal.']);
        }

        // Validasi input password
        $request->validate([
            'password' => 'required|min:8|confirmed',
        ]);

        // Cari user berdasarkan email
        $user = User::where('email', $email)->first();
        if (!$user) {
            return back()->withErrors(['email' => 'Email tidak ditemukan']);
        }

        // Update password hanya jika berbeda dengan sebelumnya
        if (!Hash::check($request->password, $user->password)) {
            $user->password = Hash::make($request->password);
            $user->save();
        }

        // Hapus session reset email setelah password berhasil diubah
        session()->forget('resetEmail');

        // Gunakan flash message agar frontend bisa menangkapnya
        session()->flash('passwordResetSuccess', 'Password berhasil diubah!');

        // Kembalikan ke halaman yang sama agar Inertia bisa menangkap flash message
        return back();
    }
}
