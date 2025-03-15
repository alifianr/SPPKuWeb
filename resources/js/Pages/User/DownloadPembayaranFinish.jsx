import React from "react";
import { Link, usePage } from "@inertiajs/react";
import "../../../css/app.css"

export default function DownloadPaymentFinish() {
    const { payment } = usePage().props;

    return (
        <div className="bg-primary font-sans min-h-screen px-4 py-2 text-black">
            <div className="w-full mx-auto mt-6 rounded-lg lg:px-16">
                {/* Header Sekolah */}
                <div className="mobile:flex md:flex-row items-center mb-6">
                    <img
                        alt="School Logo"
                        className="mobile:w-16 mobile:h-16 lg:w-24 lg:h-24 mr-4"
                        src="http://127.0.0.1:8000/img/Logo-Resmi-SMA-Negeri-8-Denpasar 2.png"
                    />
                    <div className="text-black mobile:text-[10px] lg:text-lg md:text-left">
                        <h1 className="font-bold font-poppins mobile:text-lg lg:text-2xl">SMA NEGERI 8 DENPASAR</h1>
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
                    <div className="overflow-x-auto custom-scrollbar">
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
                                    <th className="border border-gray-300 p-2">Tahun Ajaran</th>
                                    <th className="border border-gray-300 p-2">Keterangan</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="hover:bg-gray-100">
                                    <td className="py-2 px-4 border text-center">1</td>
                                    <td className="py-2 px-4 border text-center">{payment.invoice}</td>
                                    <td className="py-2 px-4 border text-center">{payment.date || "-"}</td>
                                    <td className="py-2 px-4 border text-center">{payment.description}</td>
                                    <td className="py-2 px-4 border text-center">Rp. {payment.amount.toLocaleString("id-ID")}</td>
                                    <td className="py-2 px-4 border text-center">{payment.method || "-"}</td>
                                    <td className={`py-2 px-4 border text-center font-bold ${payment.status === "Lunas" ? "text-green-600" : "text-red-600"}`}>
                                        {payment.status}
                                    </td>
                                    <td className="py-2 px-4 border text-center">{payment.year}</td>
                                    <td className="py-2 px-4 border text-center">{payment.keterangan}</td>
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
                <Link href="/user/pembayaran-lunas">
                    <div className="text-center w-full bg-green-500 rounded-xl text-xl text-white py-2 mb-10">
                        Kembali
                    </div>
                </Link>
            </div>
        </div >
    );
}
