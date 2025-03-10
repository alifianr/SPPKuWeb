<?php

namespace App\Http\Controllers\Auth;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Inertia\Inertia;
use Illuminate\Support\Facades\Session;

class ReviewUserController extends Controller
{
    // Menampilkan halaman ulasan
    public function index()
    {
        return Inertia::render('User/RatingPage', [
            'reviews' => Session::get('reviews', []),
        ]);
    }

    // Menyimpan ulasan
    public function store(Request $request)
    {
        $validated = $request->validate([
            'rating' => 'required|integer|min:1|max:5',
            'message' => 'required|string|max:300',
        ]);

        Session::push('reviews', [
            'rating' => $validated['rating'],
            'message' => $validated['message'],
            'date' => now()->format('d-m-Y H:i:s'),
        ]);

        return back()->with('success', 'Ulasan berhasil dikirim.');
    }
}
