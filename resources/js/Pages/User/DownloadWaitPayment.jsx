import React, { useEffect, useState } from "react";
import { Link, usePage } from "@inertiajs/react";
import '../../../css/app.css';

export default function DownloadWaitPayment() {
    const { payments } = usePage().props; // Perbaikan: Ambil `payment`, bukan `payments`
    const { dataSiswa } = usePage().props;

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
                    <h2 className="text-xl font-bold mb-2">Bukti Pembayaran SPP Siswa</h2>
                    <p className="text-xl font-bold">Mei dan Juni 2024</p> {/* Pastikan data tidak null */}
                </div>

                {/* Data Siswa */}
                <div className="mb-8">
                    <div className="border-b-2 border-gray-300 mb-8">
                        <h3 className="text-xl font-bold font-poppins mb-4">A. Data Siswa</h3>
                    </div>
                    {payments.length > 0 ? (
                        dataSiswa.map((data, index) => (
                            <div key={index} className="flex gap-4 text-sm md:text-base">
                                <div>
                                    <p>NISN</p>
                                    <p>Nama Lengkap</p>
                                    <p>Kelas</p>
                                    <p>Kategori Siswa</p>
                                </div>
                                <div className="ml-16">
                                    <p>: {data.student_nisn || "-"}</p>
                                    <p>: {data.student_name || "-"}</p>
                                    <p>: {data.student_class || "-"}</p>
                                    <p>: {data.student_category || "-"}</p>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-red-500">Data siswa tidak ditemukan</p>
                    )}
                </div>

                {/* Data Pembayaran */}
                <div className="mb-4">
                    <div className="border-b-2 border-gray-300 mb-10">
                        <h3 className="text-xl font-bold mb-2 font-poppins">B. Data Pembayaran</h3>
                    </div>
                    <div className="overflow-x-auto custom-scrollbar">
                        <table className="min-w-max w-full bg-white border border-gray-200">
                            <thead>
                                <tr className="bg-green-50">
                                    <th className="py-2 px-4 border-b border-gray-200 text-black whitespace-nowrap">No</th>
                                    <th className="py-2 px-4 border-b border-gray-200 text-black whitespace-nowrap">No. Invoice</th>
                                    <th className="py-2 px-4 border-b border-gray-200 text-black whitespace-nowrap">Tanggal Pembayaran</th>
                                    <th className="py-2 px-4 border-b border-gray-200 text-black whitespace-nowrap">Pembayaran</th>
                                    <th className="py-2 px-4 border-b border-gray-200 text-black whitespace-nowrap">Nominal Pembayaran</th>
                                    <th className="py-2 px-4 border-b border-gray-200 text-black whitespace-nowrap">Metode Pembayaran</th>
                                    <th className="py-2 px-4 border-b border-gray-200 text-black whitespace-nowrap">Status Pembayaran</th>
                                    <th className="py-2 px-4 border-b border-gray-200 text-black whitespace-nowrap">Tahun Ajaran</th>
                                    <th className="py-2 px-4 border-b border-gray-200 text-black whitespace-nowrap">Keterangan</th>
                                </tr>
                            </thead>
                            <tbody>
                                {payments.map((payment, index) => (
                                    <tr key={payment.id}>
                                        <td className="py-2 px-4 border-b border-gray-200 text-black text-center">{index + 1}</td>
                                        <td className="py-2 px-4 border-b border-gray-200 text-black">{payment.invoice}</td>
                                        <td className="py-2 px-4 border-b border-gray-200 text-black text-center">{payment.date || "-"}</td>
                                        <td className="py-2 px-4 border-b border-gray-200 text-black">{payment.description}</td>
                                        <td className="py-2 px-4 border-b border-gray-200 text-center text-black">Rp. {payment.amount}</td>
                                        <td className="py-2 px-4 border-b border-gray-200 text-black text-center">{payment.method || "-"}</td>
                                        <td className={`py-2 px-4 border-b border-gray-200 text-center ${payment.status === "Lunas" ? "text-green-600" : "text-yellow-400"}`}>
                                            {payment.status}
                                        </td>
                                        <td className="py-2 px-4 border-b border-gray-200 text-black text-center">{payment.year}</td>
                                        <td className="py-2 px-4 border-b border-gray-200 text-black text-center">
                                            {payment.keterangan}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    {/* Tombol Kembali */}
                    <a href="/user/pembayaran">
                        <div className="text-center mx-auto w-full border border-green-800 rounded-lg py-3 mt-4 mb-10 text-xl font-bold hover:bg-green-600 hover:text-white">
                            Kembali
                        </div>
                    </a>
                </div>
            </div>
        </div >
    );
}
