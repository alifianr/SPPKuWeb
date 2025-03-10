import React, { useEffect, useState } from "react";
import '../../css/app.css';

export default function LihatPembayaran() {
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
                <hr className="border-t-2 border-black mb-6" />

                {/* Judul Bukti Pembayaran */}
                <div className="text-center mb-6 text-black">
                    <h2 className="font-bold mb-2 mobile:text-lg lg:text-xl">Bukti Pembayaran SPP Siswa</h2>
                    <p className="font-bold mobile:text-lg lg:text-xl">Mei dan Juni 2024</p> {/* Pastikan data tidak null */}
                </div>

                {/* Data Siswa */}
                <div className="mb-8">
                    <div className="border-b-2 border-gray-300 mb-8">
                        <h3 className="font-bold font-poppins mb-4 lg:text-xl">A. Data Pribadi</h3>
                    </div>
                    <div className="flex items-center">
                        <div className="">
                            <img src="http://127.0.0.1:8000/img/Zahra.png" alt="" />
                        </div>
                        <div className="flex gap-4 text-sm md:text-base ml-20">
                            <div>
                                <p className="mb-3">Nama Lengkap</p>
                                <p className="mb-3">Tempat, Tanggal Lahir</p>
                                <p className="mb-3">Email</p>
                                <p className="mb-3">No Handphone</p>
                            </div>
                            <div className="ml-16">
                                <p className="mb-3">: Zahra Aurira Hanifah </p>
                                <p className="mb-3">: Bali, 28 Mei 2003</p>
                                <p className="mb-3">: zahra@gmail.com </p>
                                <p className="mb-3">: 089991234567</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mb-8">
                    <div className="border-b-2 border-gray-300 mb-8">
                        <h3 className="font-bold font-poppins mb-4 lg:text-xl">B. Data Sekolah</h3>
                    </div>
                    <div className="flex items-center">
                        <div className="flex gap-4 text-sm md:text-base">
                            <div>
                                <p className="mb-3">Nama Lengkap</p>
                                <p className="mb-3">Tempat, Tanggal Lahir</p>
                                <p className="mb-3">Email</p>
                                <p className="mb-3">No Handphone</p>
                            </div>
                            <div className="ml-16">
                                <p className="mb-3">: Zahra Aurira Hanifah </p>
                                <p className="mb-3">: Bali, 28 Mei 2003</p>
                                <p className="mb-3">: zahra@gmail.com </p>
                                <p className="mb-3">: 089991234567</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="text-end py-10">Bali, 28 April 2024</div>
                {/* Tombol Kembali */}
                <a href="/siswa">
                    <div className="text-center mx-auto w-full border border-green-800 rounded-lg py-3 mt-4 mb-10 text-lg font-bold hover:bg-green-600 hover:text-white">
                        Kembali
                    </div>
                </a>
            </div>
        </div >
    );
}
