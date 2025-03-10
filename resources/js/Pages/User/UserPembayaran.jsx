import React from "react";
import { usePage } from "@inertiajs/react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload, faEye, faFileAlt, faHourglassHalf } from "@fortawesome/free-solid-svg-icons";
import HeaderUser from "@/Components/HeaderUser";
import { Inertia } from "@inertiajs/inertia";
import ButtonPayment from "@/Components/ButtonPayment";
import '../../../css/app.css';

export default function UserPembayaran() {
    const { payments } = usePage().props;
    const handleDownload = (invoice) => {
        Inertia.visit(`/user/download/${invoice}`);
    };

    // Fungsi untuk mengarahkan ke halaman lihat detail pembayaran
    const handleView = (invoice) => {
        Inertia.visit(`/user/lihat/${invoice}`);
    };

    return (
        <div className="bg-primary min-h-screen font-poppins mobile:px-6 lg:px-10">
            <HeaderUser />
            <div className="w-full mx-auto lg:p-6">
                <div className="max-w-xl flex bg-yellow-500 justify-center items-center px-2 py-2 rounded-xl mobile:mt-10 mobile:mb-6 lg:mt-0 lg:mb-6">
                    <h1 className="font-bold text-center text-green-800 mobile:text-white mobile:text-[12px] lg:text-lg">
                        Pembayaran SPP Siswa Semester 2023/2024 (Genap)
                    </h1>
                </div>

                {/* Filter & Actions */}
                <ButtonPayment />

                {/* Tabel Pembayaran */}
                <div className="overflow-x-auto custom-scrollbar">
                    <table className="min-w-full bg-white border border-gray-200">
                        <thead>
                            <tr className="bg-green-50">
                                <th className="py-2 px-4 border-b border-gray-200">
                                    <input type="checkbox" />
                                </th>
                                <th className="py-2 px-4 border-b border-gray-200 text-black mobile:text-[12px] lg:text-[16px]">No</th>
                                <th className="py-2 px-4 border-b border-gray-200 text-black mobile:text-[12px] lg:text-[16px]">No. Invoice</th>
                                <th className="py-2 px-4 border-b border-gray-200 text-black mobile:text-[12px] lg:text-[16px]">Tanggal Pembayaran</th>
                                <th className="py-2 px-4 border-b border-gray-200 text-black mobile:text-[12px] lg:text-[16px]">Pembayaran</th>
                                <th className="py-2 px-4 border-b border-gray-200 text-black mobile:text-[12px] lg:text-[16px]">Nominal Pembayaran</th>
                                <th className="py-2 px-4 border-b border-gray-200 text-black mobile:text-[12px] lg:text-[16px]">Metode Pembayaran</th>
                                <th className="py-2 px-4 border-b border-gray-200 text-black mobile:text-[12px] lg:text-[16px]">Status Pembayaran</th>
                                <th className="py-2 px-4 border-b border-gray-200 text-black mobile:text-[12px] lg:text-[16px]">Tahun Ajaran</th>
                                <th className="py-2 px-4 border-b border-gray-200 text-black mobile:text-[12px] lg:text-[16px]">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {payments.map((payment, index) => (
                                <tr key={payment.id}>
                                    <td className="py-2 px-4 border-b border-gray-200">
                                        <input type="checkbox" defaultChecked={payment.status === "Lunas"} />
                                    </td>
                                    <td className="py-2 px-4 border-b border-gray-200 text-black mobile:text-[12px] lg:text-[16px]">{index + 1}</td>
                                    <td className="py-2 px-4 border-b border-gray-200 text-black mobile:text-[12px] lg:text-[16px]">{payment.invoice}</td>
                                    <td className="py-2 px-4 border-b border-gray-200 text-black text-center mobile:text-[12px] lg:text-[16px]">{payment.date || "-"}</td>
                                    <td className="py-2 px-4 border-b border-gray-200 text-black mobile:text-[12px] lg:text-[16px]">{payment.description}</td>
                                    <td className="py-2 px-4 border-b border-gray-200 text-center text-black mobile:text-[12px] lg:text-[16px]">Rp. {payment.amount}</td>
                                    <td className="py-2 px-4 border-b border-gray-200 text-black text-center mobile:text-[12px] lg:text-[16px]">{payment.method || "-"}</td>
                                    <td
                                        className={`py-2 px-4 border-b border-gray-200 text-center mobile:text-[12px] lg:text-[16px] ${payment.status === "Lunas" ? "text-green-600" : "text-red-600"
                                            }`}
                                    >
                                        {payment.status}
                                    </td>
                                    <td className="py-2 px-4 border-b border-gray-200 text-black text-center mobile:text-[12px] lg:text-[16px]">{payment.year}</td>
                                    <td className="py-2 px-4 border-b border-gray-200 text-black flex space-x-2 mobile:text-[12px] lg:text-[16px]">
                                        <button className="text-gray-600" onClick={() => handleDownload(payment.invoice)}>
                                            <FontAwesomeIcon icon={faDownload} /> Download
                                        </button>
                                        <button className="text-gray-600" onClick={() => handleView(payment.invoice)}>
                                            <FontAwesomeIcon icon={faEye} /> Lihat
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Tombol Bayar Sekarang */}
                <a href="/user/proses-pembayaran">
                    <div className="w-full mt-6 flex justify-center bg-green-800 rounded-xl">
                        <h2 className="text-white px-6 py-3 rounded-lg text-lg">Bayar Sekarang</h2>
                    </div>
                </a>
            </div>
        </div>
    );
}
