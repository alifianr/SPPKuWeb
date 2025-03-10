import React, { useEffect, useState } from "react";
import { Link, usePage } from "@inertiajs/react";
import '../../../css/app.css';

export default function LihatPembayaran() {
    const { payments } = usePage().props; // Perbaikan: Ambil `payment`, bukan `payments`

    if (!payments) {
        return <div className="text-center p-10 text-red-500">Data tidak ditemukan</div>;
    }

    // State untuk countdown timer
    const [timeLeft, setTimeLeft] = useState(payments.expiry_time);

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

    return (
        <div className="bg-primary font-sans min-h-screen px-4 py-2 text-black">
            <div className="w-full mx-auto mt-6 rounded-lg mobile:px-2 lg:px-16">
                {/* Header Sekolah */}
                <div className="flex md:flex-row items-center mb-6">
                    <img
                        alt="School Logo"
                        className="w-24 h-24 mr-4"
                        src="http://127.0.0.1:8000/img/Logo-Resmi-SMA-Negeri-8-Denpasar 2.png"
                    />
                    <div className="text-black mobile:text-left lg:text-left">
                        <h1 className="font-bold font-poppins lg:text-xl">SMA NEGERI 8 DENPASAR</h1>
                        <p className="mobile:text-xs lg:text-lg">Jl. Antasura Jl. Dan Perumahan No.25, Peguyangan Kaja, Kec. Denpasar Utara, Kota Denpasar, Bali 80238</p>
                        <p className="mobile:text-xs lg:text-lg">Telepon: (0361) 9008200</p>
                        <p className="mobile:text-xs lg:text-lg">Laman: www.SPPNusa.ac.id</p>
                    </div>
                </div>
                <hr className="border-t-2 border-gray-300 mb-6" />

                {/* Judul Bukti Pembayaran */}
                <div className="text-center mb-6 text-black">
                    <h2 className="font-bold mb-2 mobile:text-lg lg:text-xl">Bukti Pembayaran SPP Siswa</h2>
                    <p className="font-bold mobile:text-lg lg:text-xl">Mei dan Juni 2024</p> {/* Pastikan data tidak null */}
                </div>

                {/* Data Siswa */}
                <div className="mb-8">
                    <div className="border-b-2 border-gray-300 mb-8">
                        <h3 className="font-bold font-poppins mb-4 lg:text-xl">A. Data Siswa</h3>
                    </div>
                    <div className="flex gap-4 text-sm md:text-base">
                        <div>
                            <p>NISN</p>
                            <p>Nama Lengkap</p>
                            <p>Kelas</p>
                            <p>Kategori Siswa</p>
                        </div>
                        <div className="ml-16">
                            <p>: {payments.student_nisn || "-"}</p>
                            <p>: {payments.student_name || "-"}</p>
                            <p>: {payments.student_class || "-"}</p>
                            <p>: {payments.student_category || "-"}</p>
                        </div>
                    </div>
                </div>

                {/* Data Pembayaran */}
                <div className="mb-4">
                    <div className="border-b-2 border-gray-300 mobile:mb-6 lg:mb-10">
                        <h3 className="font-bold mb-2 font-poppins lg:text-xl">B. Data Pembayaran</h3>
                    </div>
                    <div className="overflow-x-auto custom-scrollbar rounded-t-xl">
                        <table className="w-full border-collapse border border-gray-300 text-sm md:text-base">
                            <thead className="bg-green-50">
                                <tr>
                                    <th className="border border-gray-300 p-2">No</th>
                                    <th className="border border-gray-300 p-2">No. Invoice</th>
                                    <th className="border border-gray-300 p-2">Tanggal Pembayaran</th>
                                    <th className="border border-gray-300 p-2">Pembayaran</th>
                                    <th className="border border-gray-300 p-2">Nominal Pembayaran</th>
                                    <th className="border border-gray-300 p-2">Metode Pembayaran</th>
                                    <th className="border border-gray-300 p-2">Status Pembayaran</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="border border-gray-300 p-2 text-center">1</td>
                                    <td className="border border-gray-300 p-2 text-center">{payments.invoice1 || "-"} <br />{payments.invoice2 || "-"}</td>
                                    <td className="border border-gray-300 p-2 text-center">{payments.date || "-"}</td>
                                    <td className="border border-gray-300 p-2 text-center">{payments.description || "-"}</td>
                                    <td className="border border-gray-300 p-2 text-center">Rp. {payments.amount || "-"}</td>
                                    <td className="border border-gray-300 p-2 text-center">{payments.method || "-"}</td>
                                    <td
                                        className={`border border-gray-300 p-2 text-center ${payments.status === "Lunas" ? "text-green-600" : "text-yellow-400"
                                            }`}
                                    >
                                        {payments.status || "-"}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Detail Pembayaran */}
                <div className="mt-8">
                    <div className="border-b-2 border-gray-300 pb-2">
                        <h3 className="font-bold font-poppins lg:text-xl">C. Detail Pembayaran</h3>
                    </div>
                    <div className="justify-center justify-content-center items-center mx-auto ml-3">
                        {/* Total Pembayaran */}
                        <div className="rounded-lg mobile:p-2 lg:p-4">
                            <div className="flex justify-between">
                                <div>
                                    <h2 className="text-black mb-4 font-semibold text-center lg:text-lg">Total Pembayaran</h2>
                                </div>
                                <p className="text-red-500 font-bold lg:text-xl">Rp. {payments.amount.toLocaleString("id-ID")}</p>
                            </div>

                            {/* Countdown Timer */}
                            <div className="flex justify-between items-center">
                                <div>
                                    <h2 className="font-semibold text-black lg:text-xl">Sisa Waktu Pembayaran</h2>
                                </div>
                                <div>
                                    <p className="text-red-500 font-semibold text-right mobile:text-[10px] lg:text-sm">{formatTime(timeLeft)}</p>
                                    <p className="text-gray-500 mobile:text-[10px] mobile:text-right lg:text-sm">
                                        Jatuh Tempo: {new Date(payments.expiry_date).toLocaleString("id-ID")}
                                    </p>
                                </div>
                            </div>
                            {/* Detail Metode Pembayaran */}
                            <div className="rounded-lg mt-6">
                                <div className="flex justify-between items-center pb-4">
                                    <h2 className="font-semibold text-black lg:text-lg">Metode Pembayaran

                                    </h2>
                                    <img
                                        alt={payments.method}
                                        className=""
                                        height="100"
                                        src="http://127.0.0.1:8000/img/alfamart.png"
                                        width="100"
                                    />
                                </div>

                                {/* Nomor Pembayaran */}
                                <div className="mb-2 flex justify-between">
                                    <h2 className="font-semibold text-black lg:text-lg">Nomor Pembayaran</h2>
                                    <p className="text-red-500 font-bold mobile:text-[15px] mobile:text-end lg:text-2xl">{payments.payment_code}</p>
                                </div>

                            </div>
                            {/* Petunjuk Pembayaran */}
                            <div className="rounded-lg py-4">
                                <h2 className="font-semibold text-black mb-4 lg:text-xl">
                                    Petunjuk Pembayaran Melalui {payments.method}
                                </h2>
                                <ol className="list-decimal list-oustide space-y-4 lg:text-lg text-gray-700 ml-5">
                                    <li>
                                        Sampaikan kepada kasir Alfamart untuk melakukan pembayaran.
                                    </li>
                                    <li>
                                        Tunjukkan kode pembayaran ke kasir dan lakukan pembayaran sebesar{" "}
                                        <span className="text-black font-bold lg:text-xl">
                                            Rp. {payments.amount.toLocaleString("id-ID")}
                                        </span>
                                        .
                                    </li>
                                    <li>
                                        Setelah transaksi berhasil, kamu akan mendapatkan bukti pembayaran. Mohon simpan bukti <br /> pembayaran sebagai jaminan apabila diperlukan verifikasi lebih lanjut.
                                    </li>
                                    <li>
                                        Pembayaran Anda akan diverifikasi otomatis dalam sistem <strong>SPPku</strong>.
                                    </li>
                                </ol>
                                <p className="text-right mt-28">Bali {" "}{new Date(payments.expiry_date).toLocaleString("id-ID")}</p>
                            </div>
                        </div>
                        {/* Tombol Kembali */}
                        <a href="/user/pembayaran">
                            <div className="text-center mx-auto w-[98%] border border-green-800 rounded-lg py-3 mt-4 mb-10 text-lg font-bold hover:bg-green-600 hover:text-white">
                                Kembali
                            </div>
                        </a>
                    </div>
                </div>
            </div>
        </div >
    );
}
