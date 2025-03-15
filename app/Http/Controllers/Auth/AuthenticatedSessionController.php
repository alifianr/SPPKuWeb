<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Inertia\Response;

class AuthenticatedSessionController extends Controller
{
    // Form login untuk admin
    public function createAdmin()
    {
        return Inertia::render('Auth/Login');
    }

    // Form login untuk user
    public function createUser()
    {
        return Inertia::render('Auth/UserLogin');
    }

    // LOGIN ADMIN - hanya admin yang bisa login
    public function storeAdmin(Request $request)
    {
        $credentials = $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        if (Auth::attempt($credentials)) {
            $user = Auth::user();

            // Hanya izinkan admin login
            if ($user->role === 'admin') {
                return redirect()->route('admin.dashboard');
            }

            // Logout jika bukan admin
            Auth::logout();
            return back()->withErrors(['email' => 'Hanya admin yang diperbolehkan login di sini.']);
        }

        return back()->withErrors(['email' => 'Email atau Password Salah!']);
    }

    // LOGIN USER - hanya user yang bisa login
    public function storeUser(Request $request)
    {
        $credentials = $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        if (Auth::attempt($credentials)) {
            $user = Auth::user();

            // Jika yang login adalah admin, keluarkan mereka
            if ($user->role === 'admin') {
                Auth::logout();
                return back()->withErrors(['email' => 'Admin tidak diperbolehkan login sebagai user.']);
            }

            return redirect()->route('user.dashboard');
        }

        return back()->withErrors(['email' => 'Email atau Password Salah']);
    }

    // LOGOUT
    public function destroy(Request $request)
    {
        Auth::logout();
        return redirect('/user/login');
    }
    public function destroyAdmin(Request $request)
    {
        Auth::logout();
        return redirect('/admin/login');
    }

    public function create(): Response
    {
        return Inertia::render('Auth/UserLogin', [
            'canResetPassword' => Route::has('password.request'),
            'status' => session('status'),
        ]);
    }
    public function logout(Request $request)
    {
        Auth::guard('admin')->logout(); // Pastikan guard sesuai
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect('/admin/login');
    }
}
