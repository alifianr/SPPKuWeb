<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class UserMiddleware
{
    public function handle(Request $request, Closure $next)
    {
        // Jika user tidak login atau role-nya bukan 'user', redirect ke home
        if (!Auth::check() || Auth::user()->role !== 'user') {
            return redirect('/')->withErrors(['access' => 'Akses ditolak.']);
        }

        return $next($request);
    }
}
