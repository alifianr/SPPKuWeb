<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Inertia\Inertia;
use Illuminate\Support\Facades\Session;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Inertia::share([
            'flash' => function () {
                return [
                    'emailValidated' => Session::get('emailValidated'),
                    'status' => Session::get('status'),
                    'passwordResetSuccess' => Session::get('passwordResetSuccess'),
                ];
            },
            'errors' => function () {
                return Session::get('errors') ? Session::get('errors')->getBag('default')->toArray() : (object) [];
            },
        ]);
    }
}
