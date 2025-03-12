import { React } from 'react';
import HeaderUser3 from "@/Components/HeaderUser3";
import ButtonPayment4 from '@/Components/ButtonPayment4';
import { usePage } from "@inertiajs/react";

export default function UserMenungguPembayaran2() {
    const { payments } = usePage().props;
    return (
        <div className="bg-primary min-h-screen font-poppins mobile:px-6 lg:px-10">
            <HeaderUser3 />
            <div className="w-full mx-auto lg:p-6">
                <div className="max-w-xl flex bg-yellow-500 justify-center items-center px-2 py-2 rounded-xl mobile:mt-10 mobile:mb-6 lg:mt-0 lg:mb-6">
                    <h1 className="font-bold text-center text-green-800 mobile:text-white mobile:text-[12px] lg:text-lg">
                        Pembayaran SPP Siswa Semester 2023/2024 (Genap)
                    </h1>
                </div>

                <div className="flex mb-6 justify-between">
                    <ButtonPayment4 />
                </div>

                <div className="w-full">
                    <div className="">
                        <img src="http://127.0.0.1:8000/img/Vector.png" alt="" className='max-w-lg mx-auto mt-24' />
                    </div>
                    <div className="mt-10">
                        <p className="text-center text-2xl">Saat ini tidak ada pembayaran SPP yang perlu dilakukan.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
