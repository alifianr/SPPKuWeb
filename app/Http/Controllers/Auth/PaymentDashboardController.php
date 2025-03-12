<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PaymentDashboardController extends Controller
{
    private $payments = [
        [
            "invoice" => "1234567WXY89Z",
            "date" => "-",
            "description" => "SPP Mei",
            "amount" => "500.000",
            "method" => "-",
            "status" => "Belum Bayar",
            "year" => "2024",
            "student_nisn" => "202123456",
            "student_name" => "Zahra Aurira Hanifah",
            "student_class" => "11 IPA 1",
            "student_category" => "Reguler",
            "keterangan" => "-",
        ],
        [
            "invoice" => "1234567ABC89D",
            "date" => "-",
            "description" => "SPP Juni",
            "amount" => "500.000",
            "method" => "-",
            "status" => "Belum Bayar",
            "year" => "2024",
            "student_nisn" => "202123456",
            "student_name" => "Zahra Aurira Hanifah",
            "student_class" => "11 IPA 1",
            "student_category" => "Reguler",
            "keterangan" => "-",
        ]
    ];
    private $afterPayments = [
        [
            "invoice" => "1234567WXY89Z",
            "date" => "24/05/2024",
            "description" => "SPP Mei",
            "amount" => "500.000",
            "method" => "Alfamart",
            "status" => "Menunggu Pembayaran",
            "year" => "2024",
            "student_nisn" => "202123456",
            "student_name" => "Zahra Aurira Hanifah",
            "student_class" => "11 IPA 1",
            "student_category" => "Reguler",
            "keterangan" => "-",
        ],
        [
            "invoice" => "1234567ABC89D",
            "date" => "24/06/2024",
            "description" => "SPP Juni",
            "amount" => "500.000",
            "method" => "Alfamart",
            "status" => "Menunggu Pembayaran",
            "year" => "2024",
            "student_nisn" => "202123456",
            "student_name" => "Zahra Aurira Hanifah",
            "student_class" => "11 IPA 1",
            "student_category" => "Reguler",
            "keterangan" => "-",
        ]
    ];
    private $paymentLunas = [
        [
            "invoice" => "1234567WXY89Z",
            "date" => "24/05/2024",
            "description" => "SPP Mei",
            "amount" => "500.000",
            "method" => "Alfamart",
            "status" => "Lunas",
            "year" => "2023/2024",
            "student_nisn" => "202123456",
            "student_name" => "Zahra Aurira Hanifah",
            "student_class" => "11 IPA 1",
            "student_category" => "Reguler",
            "keterangan" => "Terlambat 4 Hari",
        ],
        [
            "invoice" => "1234567ABC89D",
            "date" => "24/06/2024",
            "description" => "SPP Juni",
            "amount" => "500.000",
            "method" => "Alfamart",
            "status" => "Lunas",
            "year" => "2023/2024",
            "student_nisn" => "202123456",
            "student_name" => "Zahra Aurira Hanifah",
            "student_class" => "11 IPA 1",
            "student_category" => "Reguler",
            "keterangan" => "Terlambat 4 Hari",
        ]
    ];
    public function index()
    {
        $payments = [
            ["id" => 1, "invoice" => "1234567ZXV891", "date" => "24/01/2024", "description" => "SPP Januari", "amount" => "500.000", "method" => "BCA", "status" => "Lunas", "year" => "2023/2024"],
            ["id" => 2, "invoice" => "1234567MNO89P", "date" => "24/02/2024", "description" => "SPP Februari", "amount" => "500.000", "method" => "BRI", "status" => "Lunas", "year" => "2023/2024"],
            ["id" => 3, "invoice" => "1234567YUD99Z", "date" => "24/03/2024", "description" => "SPP Maret", "amount" => "500.000", "method" => "BCA", "status" => "Lunas", "year" => "2023/2024"],
            ["id" => 4, "invoice" => "1234UIWXY89KO", "date" => "24/04/2024", "description" => "SPP April", "amount" => "500.000", "method" => "BCA", "status" => "Lunas", "year" => "2023/2024"],
            ["id" => 5, "invoice" => "1234567WXY89Z", "date" => "24/04/2024", "description" => "SPP Mei", "amount" => "500.000", "method" => "-", "status" => "Belum Bayar", "year" => "2023/2024"],
            ["id" => 6, "invoice" => "1234567ABC89D", "date" => "24/04/2024", "description" => "SPP Juni", "amount" => "500.000", "method" => "-", "status" => "Belum Bayar", "year" => "2023/2024", "url" => ""],
        ];

        return Inertia::render('User/UserPembayaran', [
            'payments' => $payments
        ]);
    }
    // Halaman Download Invoice
    public function download($invoice)
    {
        $payment = [
            "invoice" => $invoice,
            "date" => "24/04/2024",
            "description" => "SPP April",
            "amount" => "500.000",
            "method" => "BCA",
            "status" => "Lunas",
            "year" => "2023/2024",
            "student_nisn" => "202123456",
            "student_name" => "Zahra Aurira Hanifah",
            "student_class" => "11 IPA 1",
            "student_category" => "Reguler",
        ];

        return Inertia::render('User/DownloadPage', [
            'invoice' => $invoice,
            'payment' => $payment,
        ]);
    }

    // Halaman Lihat Detail Pembayaran
    public function view($invoice)
    {
        // Ambil data pembayaran berdasarkan invoice
        $payment = collect($this->payments)->firstWhere('invoice', $invoice);

        // Jika data tidak ditemukan, kembalikan error 404 atau halaman tidak ditemukan
        if (!$payment) {
            return abort(404, "Invoice tidak ditemukan");
        }

        return Inertia::render('User/ViewPaymentPage', [
            'payment' => $payment
        ]);
    }
    public function viewAfterPayment($invoice)
    {
        // Ambil data pembayaran berdasarkan invoice
        $payment = collect($this->afterPayments)->firstWhere('invoice', $invoice);

        // Jika data tidak ditemukan, kembalikan error 404 atau halaman tidak ditemukan
        if (!$payment) {
            return abort(404, "Invoice tidak ditemukan");
        }

        return Inertia::render('User/ViewAfterPayment', [
            'payment' => $payment
        ]);
    }
    public function viewPaymentFinish($invoice)
    {
        // Ambil data pembayaran berdasarkan invoice
        $payment = collect($this->paymentLunas)->firstWhere('invoice', $invoice);

        // Jika data tidak ditemukan, kembalikan error 404 atau halaman tidak ditemukan
        if (!$payment) {
            return abort(404, "Invoice tidak ditemukan");
        }

        return Inertia::render('User/ViewPaymentFinish', [
            'payment' => $payment
        ]);
    }
    public function pay()
    {
        $payment = [
            "invoice1" => "1234567WXY89Z",
            "invoice2" => "1234567ABC89D",
            "date" => "24/04/2024",
            "description" => "SPP April",
            "amount" => "500.000",
            "method" => "BCA",
            "status" => "Belum Lunas",
            "year" => "2023/2024",
            "student_nisn" => "202123456",
            "student_name" => "Zahra Aurira Hanifah",
            "student_class" => "11 IPA 1",
            "student_category" => "Reguler",
        ];

        return Inertia::render('User/UserPayment', [
            'payment' => $payment
        ]);
    }
    public function paymentMethod()
    {
        return Inertia::render('User/PaymentMethod');
    }

    public function paymentConfirmation()
    {
        return Inertia::render('User/PaymentConfirmation', [
            'payment' => [
                'amount' => 1000000,
                'payment_code' => 'SPPA 04PR ILSD TZE',
                'method' => 'Alfamart',
                'method_logo' => 'http://127.0.0.1:8000/img/alfamart.png',
                'expiry_date' => now()->addHours(24)->toDateTimeString(),
                'expiry_time' => 86400, // 24 jam dalam detik
            ]
        ]);
    }
    public function waitPay()
    {
        $payments = [
            ["id" => 1, "invoice" => "1234567ZXV891", "date" => "24/01/2024", "description" => "SPP Januari", "amount" => "500.000", "method" => "BCA", "status" => "Lunas", "year" => "2023/2024"],
            ["id" => 2, "invoice" => "1234567MNO89P", "date" => "24/02/2024", "description" => "SPP Februari", "amount" => "500.000", "method" => "BRI", "status" => "Lunas", "year" => "2023/2024"],
            ["id" => 3, "invoice" => "1234567YUD9MK", "date" => "24/03/2024", "description" => "SPP Maret", "amount" => "500.000", "method" => "BCA", "status" => "Lunas", "year" => "2023/2024"],
            ["id" => 4, "invoice" => "1234UIWXY89CE", "date" => "24/04/2024", "description" => "SPP April", "amount" => "500.000", "method" => "BCA", "status" => "Lunas", "year" => "2023/2024"],
            ["id" => 5, "invoice" => "1234567WXY89Z", "date" => "24/05/2024", "description" => "SPP Mei", "amount" => "500.000", "method" => "Alfamart", "status" => "Menunggu Pembayaran", "year" => "2023/2024"],
            ["id" => 6, "invoice" => "1234567ABC89D", "date" => "24/06/2024", "description" => "SPP Juni", "amount" => "500.000", "method" => "Alfamart", "status" => "Menunggu Pembayaran", "year" => "2023/2024"],
        ];

        return Inertia::render('User/UserWaitPembayaran', [
            'payments' => $payments
        ]);
    }
    public function statusMenungguPay()
    {
        $payments = [
            ["id" => 1, "invoice1" => "1234567WXY89Z", "invoice2" => "1234567ABC89D", "date" => "24/01/2024", "description" => "SPP Mei dan Juni", "amount" => "1.000.000", "method" => "Alfamart", "status" => "Menunggu Pembayaran", "year" => "2023/2024"],
        ];

        return Inertia::render('User/UserMenungguPembayaran2', [
            'payments' => $payments
        ]);
    }
    public function paymentLunas()
    {
        $payments = [
            ["id" => 1, "invoice" => "1234567ZXV891", "date" => "24/01/2024", "description" => "SPP Januari", "amount" => "500.000", "method" => "BCA", "status" => "Lunas", "year" => "2023/2024"],
            ["id" => 2, "invoice" => "1234567MNO89P", "date" => "24/02/2024", "description" => "SPP Februari", "amount" => "500.000", "method" => "BRI", "status" => "Lunas", "year" => "2023/2024"],
            ["id" => 3, "invoice" => "1234567YUD9MK", "date" => "24/03/2024", "description" => "SPP Maret", "amount" => "500.000", "method" => "BCA", "status" => "Lunas", "year" => "2023/2024"],
            ["id" => 4, "invoice" => "1234UIWXY89CE", "date" => "24/04/2024", "description" => "SPP April", "amount" => "500.000", "method" => "BCA", "status" => "Lunas", "year" => "2023/2024"],
            ["id" => 5, "invoice" => "1234567WXY89Z", "date" => "24/05/2024", "description" => "SPP Mei", "amount" => "500.000", "method" => "Alfamart", "status" => "Lunas", "year" => "2023/2024"],
            ["id" => 6, "invoice" => "1234567ABC89D", "date" => "24/06/2024", "description" => "SPP Juni", "amount" => "500.000", "method" => "Alfamart", "status" => "Lunas", "year" => "2023/2024"],
        ];

        return Inertia::render('User/UserPembayaranLunas', [
            'payments' => $payments
        ]);
    }
    public function paymentLunasDownload()
    {
        $dataSiswa = [
            [
                "student_nisn" => "202123456",
                "student_name" => "Zahra Aurira Hanifah",
                "student_class" => "11 IPA 1",
                "student_category" => "Reguler",
                "expiry_date" => now()->addHours(24)->toDateTimeString(),
            ],
        ];
        $payments = [
            ["id" => 1, "invoice" => "1234567ZXV891", "date" => "24/01/2024", "description" => "SPP Januari", "amount" => "500.000", "method" => "BCA", "status" => "Lunas", "year" => "2023/2024", "keterangan" => "Terlambat 1 Hari"],
            ["id" => 2, "invoice" => "1234567MNO89P", "date" => "24/02/2024", "description" => "SPP Februari", "amount" => "500.000", "method" => "BRI", "status" => "Lunas", "year" => "2023/2024", "keterangan" => "Tepat Waktu"],
            ["id" => 3, "invoice" => "1234567YUD9MK", "date" => "24/03/2024", "description" => "SPP Maret", "amount" => "500.000", "method" => "BCA", "status" => "Lunas", "year" => "2023/2024", "keterangan" => "Tepat Waktu"],
            ["id" => 4, "invoice" => "1234UIWXY89CE", "date" => "24/04/2024", "description" => "SPP April", "amount" => "500.000", "method" => "BCA", "status" => "Lunas", "year" => "2023/2024", "keterangan" => "Terlambat 2 bulan"],
            ["id" => 5, "invoice" => "1234567WXY89Z", "date" => "24/05/2024", "description" => "SPP Mei", "amount" => "500.000", "method" => "Alfamart", "status" => "Lunas", "year" => "2023/2024", "keterangan" => "Terlambat 1 bulan"],
            ["id" => 6, "invoice" => "1234567ABC89D", "date" => "24/06/2024", "description" => "SPP Juni", "amount" => "500.000", "method" => "Alfamart", "status" => "Lunas", "year" => "2023/2024", "keterangan" => "Terlambat 4 Hari"],
        ];

        return Inertia::render('User/DownloadPaymentFinish', [
            'payment' => $payments,
            'data' => $dataSiswa
        ]);
    }
    public function lihatStatus()
    {
        $payments = [
            "id" => 1,
            "student_nisn" => "202123456",
            "student_name" => "Zahra Aurira Hanifah",
            "student_class" => "11 IPA 1",
            "student_category" => "Reguler",
            "invoice1" => "1234567WXY89Z",
            "invoice2" => "1234567ABC89D",
            "date" => "28/01/2024",
            "description" => "SPP Mei dan Juni",
            "amount" => "1.000.000",
            "method" => "Alfamart",
            "status" => "Menunggu Pembayaran",
            "year" => "2023/2024",
            'payment_code' => 'SPPA 04PR ILSD TZE',
            'method' => 'Alfamart',
            'method_logo' => 'http://127.0.0.1:8000/img/alfamart.png',
            'expiry_date' => now()->addHours(24)->toDateTimeString(),
            'expiry_time' => 86400, // 24 jam dalam detik
        ];

        return Inertia::render('User/LihatPembayaran', [
            'payments' => $payments
        ]);
    }
    public function fullPayment()
    {
        $dataSiswa = [
            [
                "student_nisn" => "202123456",
                "student_name" => "Zahra Aurira Hanifah",
                "student_class" => "11 IPA 1",
                "student_category" => "Reguler",
                "expiry_date" => now()->addHours(24)->toDateTimeString(),
            ],
        ];

        $payments = [
            ["id" => 1, "invoice" => "1234567ZXV891", "date" => "24/01/2024", "description" => "SPP Januari", "amount" => "500.000", "method" => "BCA", "status" => "Lunas", "year" => "2023/2024", "keterangan" => "Terlambat 1 Hari"],
            ["id" => 2, "invoice" => "1234567MNO89P", "date" => "24/02/2024", "description" => "SPP Februari", "amount" => "500.000", "method" => "BRI", "status" => "Lunas", "year" => "2023/2024", "keterangan" => "Tepat Waktu"],
            ["id" => 3, "invoice" => "1234567YUD9MK", "date" => "24/03/2024", "description" => "SPP Maret", "amount" => "500.000", "method" => "BCA", "status" => "Lunas", "year" => "2023/2024", "keterangan" => "Tepat Waktu"],
            ["id" => 4, "invoice" => "1234UIWXY89CE", "date" => "24/04/2024", "description" => "SPP April", "amount" => "500.000", "method" => "BCA", "status" => "Lunas", "year" => "2023/2024", "keterangan" => "Tepat Waktu"],
            ["id" => 5, "invoice" => "1234567WXY89Z", "date" => "", "description" => "SPP Mei", "amount" => "500.000", "method" => "-", "status" => "Belum Bayar", "year" => "2023/2024", "keterangan" => "-"],
            ["id" => 6, "invoice" => "1234567ABC89D", "date" => "", "description" => "SPP Juni", "amount" => "500.000", "method" => "-", "status" => "Belum Bayar", "year" => "2023/2024", "keterangan" => "-"],
        ];

        return Inertia::render('User/FullPayment', [
            'payments' => $payments,
            'dataSiswa' => $dataSiswa
        ]);
    }
    public function waitPayDownload()
    {
        $dataSiswa = [
            [
                "student_nisn" => "202123456",
                "student_name" => "Zahra Aurira Hanifah",
                "student_class" => "11 IPA 1",
                "student_category" => "Reguler",
                "expiry_date" => now()->addHours(24)->toDateTimeString(),
            ],
        ];

        $payments = [
            ["id" => 1, "invoice" => "1234567ZXV891", "date" => "24/01/2024", "description" => "SPP Januari", "amount" => "500.000", "method" => "BCA", "status" => "Lunas", "year" => "2023/2024", "keterangan" => "-"],
            ["id" => 2, "invoice" => "1234567MNO89P", "date" => "24/02/2024", "description" => "SPP Februari", "amount" => "500.000", "method" => "BRI", "status" => "Lunas", "year" => "2023/2024", "keterangan" => "-"],
            ["id" => 3, "invoice" => "1234567YUD9MK", "date" => "24/03/2024", "description" => "SPP Maret", "amount" => "500.000", "method" => "BCA", "status" => "Lunas", "year" => "2023/2024", "keterangan" => "-"],
            ["id" => 4, "invoice" => "1234UIWXY89CE", "date" => "24/04/2024", "description" => "SPP April", "amount" => "500.000", "method" => "BCA", "status" => "Lunas", "year" => "2023/2024", "keterangan" => "-"],
            ["id" => 5, "invoice" => "1234567WXY89Z", "date" => "24/05/2024", "description" => "SPP Mei", "amount" => "500.000", "method" => "Alfamart", "status" => "Menunggu Pembayaran", "year" => "2023/2024", "keterangan" => "-"],
            ["id" => 6, "invoice" => "1234567ABC89D", "date" => "24/06/2024", "description" => "SPP Juni", "amount" => "500.000", "method" => "Alfamart", "status" => "Menunggu Pembayaran", "year" => "2023/2024", "keterangan" => "-"],
        ];

        return Inertia::render('User/DownloadWaitPayment', [
            'payments' => $payments,
            'dataSiswa' => $dataSiswa
        ]);
    }
}
