import React from "react";
import { Link, usePage } from "@inertiajs/react";
import HeaderUser from "@/Components/HeaderUser";

export default function UserPayment() {
    const { payment } = usePage().props;

    // Jika data tidak ditemukan, tampilkan pesan error
    if (!payment) {
        return (
            <div className="flex flex-col items-center justify-center h-screen">
                <h1 className="text-2xl font-bold text-red-500">Data pembayaran tidak ditemukan</h1>
                <p className="text-gray-500 mt-2">Silakan periksa kembali atau hubungi administrator.</p>
                <Link href="/user/pembayaran-spp" className="mt-4 px-6 py-3 bg-green-500 text-white rounded-lg">
                    Kembali ke Pembayaran
                </Link>
            </div>
        );
    }

    return (
        <div className="bg-primary text-black font-sans min-h-screen px-6">
            <HeaderUser />
            <div className="mx-auto mt-6 mobile:w-[97%] lg:max-w-[85%] lg:pb-10">
                {/* Header */}
                <div className="w-full bg-yellow-400 text-center text-lg rounded-md mobile:mb-6 lg:mb-10 lg:p-2 lg:max-w-lg ">
                    <span className="font-bold text-center text-green-800 mobile:text-white mobile:text-[12px] lg:text-lg">Pembayaran SPP Siswa Semester 2023/2024 (Genap)</span>
                </div>

                <h1 className="text-center font-bold mobile:text-lg mobile:mb-6 lg:mb-4 lg:text-xl">Detail Pembayaran SPP</h1>

                {/* Form Pembayaran */}
                <form>
                    <div className="mb-4">
                        <label className="block text-sm font-bold mb-1">NISN</label>
                        <input type="text" value={payment.student_nisn} className="w-full p-2 border rounded-md" readOnly />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-bold mb-1">Nama Lengkap</label>
                        <input type="text" value={payment.student_name} className="w-full p-2 border rounded-md" readOnly />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-bold mb-1">Kelas</label>
                        <input type="text" value={payment.student_class} className="w-full p-2 border rounded-md" readOnly />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-bold mb-1">Nominal Wajib Bayar</label>
                        <input type="text" value={`Rp. ${payment.amount}`} className="w-full p-2 border rounded-md" readOnly />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-bold mb-1">No.Invoice</label>
                        <textarea className="w-full p-2 border rounded-md" rows="2" readOnly value={`${payment.invoice1}\n${payment.invoice2}`}></textarea>
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-bold mb-1">Status Bayar</label>
                        <input
                            type="text"
                            value={payment.status}
                            className={`w-full p-2 border rounded-md ${payment.status === "Lunas" ? "text-green-500" : "text-red-500"}`}
                            readOnly
                        />
                    </div>

                    {/* Tombol Aksi */}
                    <div className="flex-row w-full mt-6">
                        <Link href="/user/metode-pembayaran">
                            <div className="mb-2 bg-green-800 py-2 px-4 font-bold rounded-md">
                                <p className="text-white text-center">
                                    Pilih Metode Pembayaran
                                </p>
                            </div>
                        </Link>
                        <Link href="/user/pembayaran-spp">
                            <div className="bg-white border border-green-700 text-black py-2 px-4 rounded-md">
                                <p className="text-center font-bold">
                                    Kembali
                                </p>
                            </div>
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}
