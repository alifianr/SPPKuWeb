import React, { useEffect, useState } from "react";
import { Link, usePage } from "@inertiajs/react";
import Swal from "sweetalert2";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaste } from '@fortawesome/free-solid-svg-icons';

export default function PaymentConfirmation() {
    const { payment } = usePage().props; // Data dari Laravel

    // State untuk countdown timer
    const [timeLeft, setTimeLeft] = useState(payment.expiry_time);

    useEffect(() => {
        const interval = setInterval(() => {
            setTimeLeft((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    // Fungsi untuk format countdown
    const formatTime = (seconds) => {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;
        return `${hours} Jam ${minutes} Menit ${secs} Detik`;
    };

    // Fungsi untuk menyalin nomor pembayaran
    const copyToClipboard = () => {
        Swal.fire({
            title: "Nomor Pembayaran Berhasil Disalin!",
            width: "800px",
            imageUrl: "http://127.0.0.1:8000/img/CheckCircle.png",
            imageWidth: 150,
            imageHeight: 150,
            confirmButtonText: "OK",
            customClass: {
                confirmButton: "custom-confirm-button" // Tambahkan kelas kustom
            },
        });
    };

    return (
        <div className="bg-primary min-h-screen lg:px-6">
            <div className="bg-yellow-500 text-white p-4 rounded-b-3xl">
                <h1 className="font-semibold mobile:text-xl mobile:text-start mobile:ml-6 lg:text-2xl lg:text-center">Pembayaran</h1>
            </div>
            <div className="max-w-5xl justify-center justify-content-center items-center p-6 mt-4 mx-auto">
                {/* Total Pembayaran */}
                <div className="bg-white p-4 rounded-lg mb-4">
                    <div className="mb-4 flex justify-between border-b-2 border-black">
                        <div>
                            <h2 className="text-black mb-4 font-semibold lg:text-lg lg:text-center">Total Pembayaran</h2>
                        </div>
                        <p className="text-red-500 font-bold lg:text-xl">Rp. {payment.amount.toLocaleString("id-ID")}</p>
                    </div>

                    {/* Countdown Timer */}
                    <div className="flex justify-between items-center">
                        <div>
                            <h2 className="font-semibold text-black mobile:text-[12px] lg:text-lg">Sisa Waktu Pembayaran</h2>
                        </div>
                        <div>
                            <p className="text-red-500 font-semibold text-right mobile:text-[12px] lg:text-sm">{formatTime(timeLeft)}</p>
                            <p className="text-gray-500 mobile:text-[10px] lg:text-sm">
                                Jatuh Tempo: {new Date(payment.expiry_date).toLocaleString("id-ID")}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Detail Metode Pembayaran */}
                <div className="bg-white mb-4 p-4 border rounded-lg">
                    <div className="flex items-center mb-2 border-b-2 border-black pb-4">
                        <img
                            alt={payment.method}
                            className="mr-2"
                            height="20"
                            src={payment.method_logo}
                            width="50"
                        />
                        <h2 className="font-semibold text-black lg:text-lg">{payment.method}</h2>
                    </div>

                    {/* Nomor Pembayaran */}
                    <div className="mb-2">
                        <h2 className="font-semibold text-black lg:text-lg">Nomor Pembayaran</h2>
                    </div>
                    <div className="flex justify-between">
                        <div>
                            <p className="text-red-500 text-xl font-bold">{payment.payment_code}</p>
                        </div>
                        <button onClick={copyToClipboard} className="flex items-center text-green-500">
                            <FontAwesomeIcon icon={faPaste} className="mr-4 w-full" /> Salin
                        </button>
                    </div>
                    {/* Tombol Salin */}
                </div>

                {/* Petunjuk Pembayaran */}
                <div className="p-4 border rounded-lg bg-white">
                    <h2 className="font-semibold mb-2 text-black lg:text-lg">
                        Petunjuk Pembayaran Melalui {payment.method}
                    </h2>
                    <ol className="list-decimal list-inside space-y-2 mobile:text-[12px] lg:text-sm text-gray-700">
                        <li>
                            Sampaikan kepada kasir bahwa Anda ingin melakukan pembayaran melalui{" "}
                            <strong>{payment.method}</strong>.
                        </li>
                        <li>
                            Tunjukkan kode pembayaran ke kasir dan lakukan pembayaran sebesar{" "}
                            <span className="text-red-500 font-bold">
                                Rp. {payment.amount.toLocaleString("id-ID")}
                            </span>
                            .
                        </li>
                        <li>
                            Simpan bukti pembayaran sebagai jaminan apabila diperlukan verifikasi lebih lanjut.
                        </li>
                        <li>
                            Pembayaran Anda akan diverifikasi otomatis dalam sistem <strong>SPPku</strong>.
                        </li>
                    </ol>
                </div>

                {/* Tombol Kembali */}
                <Link href="/user/homepage">
                    <div className="mt-4 text-center bg-green-600 p-2 rounded-lg">
                        <p className="text-white rounded-full">
                            OK
                        </p>
                    </div>
                </Link>
            </div>
        </div>
    );
}
