import React from "react";
import { Link, usePage } from "@inertiajs/react";

export default function ViewPaymentPage() {
    const { payment } = usePage().props;

    // Jika payment tidak ditemukan, tampilkan pesan error
    if (!payment) {
        return <div className="text-center p-10 text-red-500">Data tidak ditemukan</div>;
    }

    return (
        <div className="bg-primary font-sans min-h-screen px-4 py-2 text-black">
            <div className="w-full mx-auto mt-6 rounded-lg px-16">
                {/* Header Sekolah */}
                <div className="flex flex-col md:flex-row items-center mb-6">
                    <img
                        alt="School Logo"
                        className="w-24 h-24 mr-4"
                        src="http://127.0.0.1:8000/img/Logo-Resmi-SMA-Negeri-8-Denpasar 2.png"
                    />
                    <div className="text-center text-black md:text-left">
                        <h1 className="text-xl font-bold font-poppins">SMA NEGERI 8 DENPASAR</h1>
                        <p>Jl. Antasura Jl. Dan Perumahan No.25, Peguyangan Kaja, Kec. Denpasar Utara, Kota Denpasar, Bali 80238</p>
                        <p>Telepon: (0361) 9008200</p>
                        <p>Laman: www.SPPNusa.ac.id</p>
                    </div>
                </div>
                <hr className="border-t-2 border-gray-300 mb-6" />

                {/* Judul Bukti Pembayaran */}
                <div className="text-center mb-3 text-black">
                    <h2 className="text-xl font-bold">Bukti Pembayaran SPP Siswa</h2>
                </div>
                <div className="text-center mb-6 text-black">
                    <h2 className="text-xl font-bold">{payment.description}{" "}{payment.year}</h2>
                </div>

                {/* Data Siswa */}
                <div className="mb-6">
                    <h3 className="text-xl font-bold mb-2 font-poppins">A. Data Siswa</h3>
                    <div className="flex gap-4 text-sm md:text-base">
                        <div>
                            <p>NISN</p>
                            <p>Nama Lengkap</p>
                            <p>Kelas</p>
                            <p>Kategori Siswa</p>
                        </div>
                        <div className="ml-16">
                            <p>: {payment.student_nisn || "-"}</p>
                            <p>: {payment.student_name || "-"}</p>
                            <p>: {payment.student_class || "-"}</p>
                            <p>: {payment.student_category || "-"}</p>
                        </div>
                    </div>
                </div>

                {/* Data Pembayaran */}
                <div className="mb-4">
                    <h3 className="text-xl font-bold mb-2 font-poppins">B. Data Pembayaran</h3>
                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse border border-gray-300 text-sm md:text-base">
                            <thead className="bg-gray-200">
                                <tr>
                                    <th className="border border-gray-300 p-2">No</th>
                                    <th className="border border-gray-300 p-2">No. Invoice</th>
                                    <th className="border border-gray-300 p-2">Tanggal Pembayaran</th>
                                    <th className="border border-gray-300 p-2">Pembayaran</th>
                                    <th className="border border-gray-300 p-2">Nominal Pembayaran</th>
                                    <th className="border border-gray-300 p-2">Metode Pembayaran</th>
                                    <th className="border border-gray-300 p-2">Status Pembayaran</th>
                                    <th className="border border-gray-300 p-2">Keterangan</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="py-2 px-4 border border-gray-200 text-black text-center">1</td>
                                    <td className="py-2 px-4 border border-gray-200 text-black text-center">{payment.invoice}</td>
                                    <td className="py-2 px-4 border border-gray-200 text-black text-center">{payment.date || "-"}</td>
                                    <td className="py-2 px-4 border border-gray-200 text-black text-center">{payment.description}</td>
                                    <td className="py-2 px-4 border border-gray-200 text-black text-center">Rp. {payment.amount}</td>
                                    <td className="py-2 px-4 border border-gray-200 text-black text-center">{payment.method || "-"}</td>
                                    <td className={`py-2 px-4 border border-gray-200 text-center ${payment.status === "Lunas" ? "text-green-600" : "text-red-600"}`}>
                                        {payment.status}
                                    </td>
                                    <td className="py-2 px-4 border border-gray-200 text-black text-center">{payment.keterangan}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Tanda Tangan */}
                <div className="text-right mb-14 mt-10">
                    <p>Bali, 28 April 2024</p>
                </div>

                {/* Tombol Kembali */}
                <Link href="/user/pembayaran-spp">
                    <div className="text-center w-full bg-green-500 rounded-xl text-xl text-white py-2 mb-10">
                        Kembali
                    </div>
                </Link>
            </div>
        </div >
    );
}
