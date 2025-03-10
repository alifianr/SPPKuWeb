import { Link, usePage } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import NavbarDashboard from '@/Components/NavbarDashboard';
import Header from '@/Components/Header';

export default function ArsipWaliKelasEmpty() {
    const [activeTab, setActiveTab] = useState(window.location.pathname);

    useEffect(() => {
        setActiveTab(window.location.pathname);
    }, [window.location.pathname]); // Update setiap kali URL berubah

    return (
        <div className="bg-gray-100 font-sans flex min-h-screen">
            <NavbarDashboard />
            {/* Main Content */}
            <main className="flex-1 p-6">
                <Header />
                {/* Page Title */}
                <h1 className="text-3xl text-black font-bold mb-4">Data Wali Kelas</h1>
                {/* Actions */}
                <div className="flex items-center mb-4 space-x-2">
                    {/* Tombol Data Wali Kelas */}
                    <a href="/wali-kelas">
                        <button
                            className={`text-center rounded w-full sm:w-auto px-4 py-2 font-bold transition-all duration-200 ease-in-out ${activeTab === "/wali-kelas/arsip-empty"
                                ? "bg-green-700 text-white"
                                : "border border-green-700 text-green-700 hover:bg-green-100"
                                }`}
                        >
                            <div className="flex items-center rounded">
                                <img src="http://127.0.0.1:8000/img/Users.png" alt="Data Wali Kelas" className="max-w-10 max-h-7 ml-3" />
                                <p className="px-3">Data Wali Kelas</p>
                            </div>
                        </button>
                    </a>

                    {/* Tombol Arsip Data */}
                    <a href="/wali-kelas/arsip">
                        <button
                            className={`text-center rounded w-full sm:w-auto px-4 py-2 font-bold transition-all duration-200 ease-in-out ${activeTab === "/wali-kelas/arsip"
                                ? "bg-green-700 text-white"
                                : "border border-green-700 text-green-700 hover:bg-green-100"
                                }`}
                        >
                            <div className="flex items-center rounded">
                                <img src="http://127.0.0.1:8000/img/BoxArrowDown.png" alt="Arsip Data" className="max-w-10 max-h-7 ml-3" />
                                <p className="px-3">Arsip Data</p>
                            </div>
                        </button>
                    </a>
                </div>

                <div className="w-full">
                    <div className="">
                        <img src="http://127.0.0.1:8000/img/Vector.png" alt="" className='max-w-[10%] mx-auto mt-24' />
                    </div>
                    <div className="mt-10">
                        <p className="text-center text-xl">Saat ini tidak ada data wali kelas yang tersimpan.</p>
                    </div>
                </div>
            </main >
        </div >
    );
}
