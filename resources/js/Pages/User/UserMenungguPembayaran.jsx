import { React } from 'react';
import HeaderUser from "@/Components/HeaderUser";
import ButtonPayment from '@/Components/ButtonPayment';

export default function UserMenungguPembayaran() {
    return (
        <div className="bg-primary min-h-screen font-poppins mobile:px-6 lg:px-10">
            <HeaderUser />
            <div className="w-full mx-auto lg:p-6">
                <div className="max-w-xl flex bg-yellow-500 justify-center items-center px-2 py-2 rounded-xl mobile:mt-10 mobile:mb-6 lg:mt-0 lg:mb-6">
                    <h1 className="font-bold text-center text-green-800 mobile:text-white mobile:text-[12px] lg:text-lg">
                        Pembayaran SPP Siswa Semester 2023/2024 (Genap)
                    </h1>
                </div>
                <ButtonPayment />
                {/* Tabel Pembayaran */}
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
