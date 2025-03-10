import { React } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload } from "@fortawesome/free-solid-svg-icons";
import HeaderUser from "@/Components/HeaderUser";
import ButtonPayment3 from '@/Components/ButtonPayment3';
import { usePage } from "@inertiajs/react";

export default function UserMenungguPembayaran2() {
    const { payments } = usePage().props;
    return (
        <div className="bg-primary min-h-screen font-poppins mobile:px-6 lg:px-10">
            <HeaderUser />
            <div className="w-full mx-auto lg:p-6">
                <div className="max-w-xl flex bg-yellow-500 justify-center items-center px-2 py-2 rounded-xl mobile:mt-10 mobile:mb-6 lg:mt-0 lg:mb-6">
                    <h1 className="font-bold text-center text-green-800 mobile:text-white mobile:text-[12px] lg:text-lg">
                        Pembayaran SPP Siswa Semester 2023/2024 (Genap)
                    </h1>
                </div>

                <div className="flex mb-6 justify-between">
                    <ButtonPayment3 />
                </div>

                {/* Tabel Pembayaran */}
                <div className="overflow-x-auto">
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
                            </tr>
                        </thead>
                        <tbody>
                            {payments.map((payment, index) => (
                                <tr key={payment.id}>
                                    <td className="py-2 px-4 border-b border-gray-200 mobile:text-[12px] lg:text-[16px]">
                                        <input type="checkbox" />
                                    </td>
                                    <td className="py-2 px-4 border-b border-gray-200 text-black text-center mobile:text-[12px] lg:text-[16px]">{index + 1}</td>
                                    <td className="py-2 px-4 border-b border-gray-200 text-black text-center mobile:text-[12px] lg:text-[16px]">{payment.invoice1}<br />{payment.invoice2}</td>
                                    <td className="py-2 px-4 border-b border-gray-200 text-black text-center mobile:text-[12px] lg:text-[16px]">{payment.date || "-"}</td>
                                    <td className="py-2 px-4 border-b border-gray-200 text-black text-center mobile:text-[12px] lg:text-[16px]">{payment.description}</td>
                                    <td className="py-2 px-4 border-b border-gray-200 text-center text-black mobile:text-[12px] lg:text-[16px]">Rp. {payment.amount}</td>
                                    <td className="py-2 px-4 border-b border-gray-200 text-black text-center font-bold mobile:text-[12px] lg:text-[16px]">{payment.method || "-"}</td>
                                    <td
                                        className={`py-2 px-4 border-b border-gray-200 text-center mobile:text-[12px] lg:text-[16px] ${payment.status === "Lunas" ? "text-green-600" : "text-yellow-400"
                                            }`}
                                    >
                                        {payment.status}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
