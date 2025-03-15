import React from "react";
import { Link, usePage } from "@inertiajs/react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import HeaderUser3 from "@/Components/HeaderUser3";

export default function UserHomepageLunas() {
    const { auth } = usePage().props; // Ambil data user yang sedang login

    return (
        <div className="bg-gray-100 min-h-screen font-poppins mobile:px-6 lg:px-10">
            {/* Header */}
            <HeaderUser3 />
            {/* Main Content */}
            <main className="flex flex-col-reverse mobile:flex-col-reverse md:flex-row lg:flex lg:p-8 lg:mt-7 items-center justify-between">
                <div className="md:w-1/2 lg:w-11/12 mobile:mt-12 mobile:px-4 lg:px-28">
                    <h1 className="font-extrabold text-yellow-500 mobile:text-4xl lg:text-6xl">Hallo {auth.user.name}!</h1>
                    <p className="text-2xl font-bold text-black mt-4">Selamat Datang di SPPku</p>
                    <p className="mt-4 text-black">
                        SPPku adalah website untuk pembayaran SPP sekolah dengan mudah, cepat, dan aman, memberikan kemudahan bagi orang tua dan siswa dalam mengelola kewajiban keuangan pendidikan.
                    </p>
                    <Link href="/user/pembayaran-lunas" className="mt-6 text-center inline-block px-6 py-3 bg-green-700 text-white rounded-full w-11/12">
                        Bayar SPP Sekarang
                    </Link>
                </div>
                <div className="md:w-1/2 mt-8 md:mt-0">
                    <img
                        alt="Illustration of a person making a payment"
                        height="500"
                        src="http://127.0.0.1:8000/img/UserWelcome.png"
                        width="500"
                    />
                </div>
            </main>

            {/* Footer */}
            <footer className="flex justify-between items-center p-4">
                <div className="flex items-center space-x-2">
                    <img
                        alt="Logo SPPku"
                        src="http://127.0.0.1:8000/img/LOGO FIX 4.png"
                        className="mobile:w-[60px] mobile:h-12 mobile:mr-6 lg:w-16 lg:h-20 lg:pt-2 lg:pb-2 lg:mr-6"
                    />
                    <div>
                        <div className="mb-2 text-black font-bold">
                            <p>Kontak Kami:</p>
                        </div>
                        <div className="flex items-center justify-center space-x-4">
                            <a className="text-green-700" href="#">
                                <FontAwesomeIcon icon={faWhatsapp} size="2x" />
                            </a>
                            <a className="text-green-700" href="#">
                                <img src="http://127.0.0.1:8000/img/gmail.png" alt="" className="w-8 h-8" />
                            </a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}
