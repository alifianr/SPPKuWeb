<?php

use App\Http\Controllers\NewsController;
use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Models\News;
use App\Http\Resources\NewsCollection;
use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Auth\ForgotPasswordController;
use App\Http\Controllers\Auth\PaymentDashboardController;
use App\Http\Controllers\Auth\ReviewUserController;
use App\Http\Controllers\Auth\UserProfileController;

// ===== ROUTE UNTUK ADMIN =====
Route::get('/admin/login', [AuthenticatedSessionController::class, 'createAdmin'])
    ->middleware('guest')
    ->name('admin.login');

Route::post('/admin/login', [AuthenticatedSessionController::class, 'storeAdmin']) // Panggil storeAdmin()
    ->name('admin.login.submit');

Route::post('/admin/logout', [AuthenticatedSessionController::class, 'destroyAdmin'])->name('logout.admin');


Route::middleware(['auth'])->group(function () {
    Route::get('/admin/dashboard', function () {
        return Inertia::render('Dashboard');
    })->name('admin.dashboard');
});

// ===== ROUTE UNTUK USER =====
Route::get('/user/login', [AuthenticatedSessionController::class, 'createUser'])
    ->middleware('guest')
    ->name('user.login');

Route::post('/user/login', [AuthenticatedSessionController::class, 'storeUser'])
    ->name('user.login.submit');

Route::get('/user/profile', [UserProfileController::class, 'index'])->name('user.profile');

Route::middleware(['auth'])->group(function () {
    Route::get('/user/dashboard', function () {
        return Inertia::render('User/UserDashboard');
    })->name('user.dashboard');

    Route::get('/user/homepage', function () {
        return Inertia::render('User/UserHomepage');
    })->name('user.homepage');

    Route::get('/user/homepage-lunas', function () {
        return Inertia::render('User/UserHomepageLunas');
    })->name('user.homepage');

    Route::get('/user/menunggu-pembayaran', function () {
        return Inertia::render('User/UserMenungguPembayaran');
    })->name('user.menungguBayar');
    Route::get('/user/pembayaran-lunas/menunggu', function () {
        return Inertia::render('User/UserWaitPembayaranLunas');
    })->name('user.menungguBayarLunas');

    Route::get('/user/ulasan', [ReviewUserController::class, 'index'])->name('user.review');
    Route::post('/user/ulasan', [ReviewUserController::class, 'store']);

    Route::post('/user/logout', [AuthenticatedSessionController::class, 'destroy'])
        ->name('user.logout');
});

Route::middleware(['auth'])->group(function () {
    Route::get('/user/pembayaran-spp', [PaymentDashboardController::class, 'index'])->name('user.pembayaran-spp');
    Route::get('/user/pembayaran', [PaymentDashboardController::class, 'waitPay'])->name('user.pembayaran-spp');
    Route::get('/user/pembayaran-lunas', [PaymentDashboardController::class, 'paymentLunas'])->name('user.pembayaran-lunas');
    Route::get('/user/download/{invoice}', [PaymentDashboardController::class, 'download'])->name('user.download');
    Route::get('/user/lihat/{invoice}', [PaymentDashboardController::class, 'viewBeforePayment'])->name('user.lihat');
    Route::get('/user/lihat/{invoice}', [PaymentDashboardController::class, 'view'])->name('user.lihat');
    Route::get('/user/lihat-{invoice}', [PaymentDashboardController::class, 'viewAfterPayment'])->name('user.viewAfterPay');
    Route::get('/user/download-lunas/{invoice}', [PaymentDashboardController::class, 'viewPaymentFinish'])->name('user.viewPayFinish');
    Route::get('/user/lihat-pay-lunas/{invoice}', [PaymentDashboardController::class, 'downloadPaymentFinish'])->name('user.downloadPayFinish');
    Route::get('/user/proses-pembayaran', [PaymentDashboardController::class, 'pay'])->name('user.bayar');
    Route::get('/user/metode-pembayaran', [PaymentDashboardController::class, 'paymentMethod'])->name('user.method-payment');
    Route::get('/user/konfirmasi-pembayaran', [PaymentDashboardController::class, 'paymentConfirmation'])->name('user.confirm-payment');
    Route::get('/user/user-menunggu-pembayaran', [PaymentDashboardController::class, 'statusMenungguPay'])->name('user.waitStatus');
    Route::get('/user/status-payment', [PaymentDashboardController::class, 'lihatStatus'])->name('user.lihatStatus');
    Route::get('/user/view-bill', [PaymentDashboardController::class, 'fullPayment'])->name('user.viewStatus');
    Route::get('/user/download-bill', [PaymentDashboardController::class, 'waitPayDownload'])->name('user.downloadWaitPay');
    Route::get('/user/download-payment-finish', [PaymentDashboardController::class, 'paymentLunasDownload'])->name('user.downloadLunasPay');
});

Route::post('/logout', [AuthenticatedSessionController::class, 'destroy'])
    ->middleware('auth')
    ->name('logout');

// Step 1: Validasi email
Route::post('/forgot/password/validate-email', [ForgotPasswordController::class, 'validateEmail'])
    ->middleware('guest')
    ->name('password.validateEmail');

// Step 2: Reset password
Route::post('/forgot/password/reset', [ForgotPasswordController::class, 'resetPassword'])
    ->middleware('guest')
    ->name('password.reset');

// ===== ROUTE LUPA PASSWORD =====
// ===== ROUTE LUPA PASSWORD =====
Route::middleware(['guest', 'web'])->group(function () {
    // Menampilkan halaman lupa password
    Route::get('/forgot/password', [ForgotPasswordController::class, 'showResetForm'])
        ->name('password.request');

    // Step 1: Validasi email
    Route::post('/forgot/password/validate-email', [ForgotPasswordController::class, 'validateEmail'])
        ->name('password.validateEmail');

    // Step 2: Reset password
    Route::post('/forgot/password/reset', [ForgotPasswordController::class, 'resetPassword'])
        ->name('password.reset');
});

// // ===== ROUTE UNTUK PERCOBAAAN =====
Route::get('/', [AuthenticatedSessionController::class, 'create'])
    ->middleware('guest')
    ->name('login');

// Route::post('/login', [AuthenticatedSessionController::class, 'store']);

// Route::post('/logout/admin', [AuthenticatedSessionController::class, 'destroyAdmin'])
//     ->middleware('auth')
//     ->name('logout.admin');

// Route::get('/homepage', [NewsController::class, 'index']);
// Route::post('/news', [NewsController::class, 'store'])->middleware(['auth', 'verified'])->name('create.news');
// Route::get('/news', [NewsController::class, 'show'])->middleware(['auth', 'verified'])->name('my.news');
// Route::get('/news/edit', [NewsController::class, 'edit'])->middleware(['auth', 'verified'])->name('edit.news');
// Route::post('/news/update', [NewsController::class, 'update'])->middleware(['auth', 'verified'])->name('update.news');
// Route::post('/news/delete', [NewsController::class, 'destroy'])->middleware(['auth', 'verified'])->name('delete.news');

// Route::get('/formulir', function () {
//     $news = new NewsCollection(News::paginate(9));
//     return Inertia::render('Formulir', [
//         'title' => 'Formulir Berita',
//         'description' => 'Formulir berita',
//         'news' => $news
//     ]);
// });

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::get('/wali-kelas', function () {
    return Inertia::render('WaliKelas', [
        'auth' => ['user' => auth()->user()]
    ]);
})->middleware(['auth']);
Route::get('/wali-kelas-empty', function () {
    return Inertia::render('WaliKelasEmpty', [
        'auth' => ['user' => auth()->user()]
    ]);
})->middleware(['auth']);

Route::get('/wali-kelas/arsip', function () {
    return Inertia::render('ArsipWaliKelas', [
        'auth' => ['user' => auth()->user()]
    ]);
})->middleware(['auth']);

Route::get('/wali-kelas/arsip-empty', function () {
    return Inertia::render('ArsipWaliKelasEmpty', [
        'auth' => ['user' => auth()->user()]
    ]);
})->middleware(['auth']);

Route::get('/kelas', function () {
    return Inertia::render('Kelas', [
        'auth' => ['user' => auth()->user()]
    ]);
})->middleware(['auth']);

Route::get('/wali-kelas', function () {
    return Inertia::render('WaliKelas', [
        'auth' => ['user' => auth()->user()]
    ]);
})->middleware(['auth']);

Route::get('/siswa', function () {
    return Inertia::render('Siswa', [
        'auth' => ['user' => auth()->user()]
    ]);
})->middleware(['auth']);

Route::get('/siswa-empty', function () {
    return Inertia::render('SiswaEmpty', [
        'auth' => ['user' => auth()->user()]
    ]);
})->middleware(['auth']);

Route::get('/siswa-arsip', function () {
    return Inertia::render('SiswaArsip', [
        'auth' => ['user' => auth()->user()]
    ]);
})->middleware(['auth']);

Route::get('/siswa-arsip-empty', function () {
    return Inertia::render('SiswaArsipEmpty', [
        'auth' => ['user' => auth()->user()]
    ]);
})->middleware(['auth']);

Route::get('/siswa-arsip-nama', function () {
    return Inertia::render('SiswaArsipOne', [
        'auth' => ['user' => auth()->user()]
    ]);
})->middleware(['auth']);

Route::get('/siswa-detail', function () {
    return Inertia::render('SiswaDetail', [
        'auth' => ['user' => auth()->user()]
    ]);
})->middleware(['auth']);

Route::get('/siswa-tambah-data', function () {
    return Inertia::render('TambahSiswa', [
        'auth' => ['user' => auth()->user()]
    ]);
})->middleware(['auth']);

Route::get('/siswa-tambah-sekolah', function () {
    return Inertia::render('TambahSiswa2', [
        'auth' => ['user' => auth()->user()]
    ]);
})->middleware(['auth']);

Route::get('/spp', function () {
    return Inertia::render('SPP', [
        'auth' => ['user' => auth()->user()]
    ]);
})->middleware(['auth']);

Route::get('/spp/beasiswa', function () {
    return Inertia::render('Beasiswa', [
        'auth' => ['user' => auth()->user()]
    ]);
})->middleware(['auth']);

Route::get('/spp/kelola-spp', function () {
    return Inertia::render('KelolaSPP', [
        'auth' => ['user' => auth()->user()]
    ]);
})->middleware(['auth']);

Route::get('/spp/kelola-beasiswa', function () {
    return Inertia::render('KelolaBeasiswa', [
        'auth' => ['user' => auth()->user()]
    ]);
})->middleware(['auth']);

Route::get('/spp/kelola-penerima-beasiswa', function () {
    return Inertia::render('KelolaPenerimaBeasiswa', [
        'auth' => ['user' => auth()->user()]
    ]);
})->middleware(['auth']);

Route::get('/spp/download-beasiswa', function () {
    return Inertia::render('UnduhPenerimaBeasiswa', [
        'auth' => ['user' => auth()->user()]
    ]);
})->middleware(['auth']);

Route::get('/riwayat-bayar/unduh', function () {
    return Inertia::render('UnduhDataRiwayat', [
        'auth' => ['user' => auth()->user()]
    ]);
})->middleware(['auth']);

Route::get('/riwayat-bayar/unduh-satu', function () {
    return Inertia::render('UnduhDataRiwayatSatu', [
        'auth' => ['user' => auth()->user()]
    ]);
})->middleware(['auth']);

Route::get('/spp/kelola-spp-lunas', function () {
    return Inertia::render('KelolaSPPLunas', [
        'auth' => ['user' => auth()->user()]
    ]);
})->middleware(['auth']);

Route::get('/spp/kelola-spp-lunas-satu', function () {
    return Inertia::render('KelolaSPPLunasSatu', [
        'auth' => ['user' => auth()->user()]
    ]);
})->middleware(['auth']);

Route::get('/spp/download-spp', function () {
    return Inertia::render('KelolaSPPDownload', [
        'auth' => ['user' => auth()->user()]
    ]);
})->middleware(['auth']);

Route::get('/spp/download-spp-satu', function () {
    return Inertia::render('KelolaSPPDownloadSatu', [
        'auth' => ['user' => auth()->user()]
    ]);
})->middleware(['auth']);

Route::get('/riwayat-bayar', function () {
    return Inertia::render('RiwayatBayar', [
        'auth' => ['user' => auth()->user()]
    ]);
})->middleware(['auth']);

Route::get('/feedback', function () {
    return Inertia::render('Feedback', [
        'auth' => ['user' => auth()->user()]
    ]);
})->middleware(['auth']);

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
