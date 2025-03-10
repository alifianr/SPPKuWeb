import React, { useState, useEffect } from 'react';
import { Inertia } from '@inertiajs/inertia';

export default function ButtonAdmin() {
    const [activeTab, setActiveTab] = useState(window.location.pathname);

    useEffect(() => {
        setActiveTab(window.location.pathname);
    }, [window.location.pathname]); // Update setiap kali URL berubah

    return (
        <div className="flex items-center mb-4 space-x-2">
            {/* Tombol Data Wali Kelas */}
            <a href="/wali-kelas">
                <button
                    className={`text-center rounded w-full sm:w-auto px-4 py-2 font-bold transition-all duration-200 ease-in-out ${activeTab === "/wali-kelas"
                        ? "bg-green-700 text-white"
                        : "border border-green-700 text-green-700 hover:bg-green-100"
                        }`}
                >
                    <div className="flex items-center rounded">
                        <img src="http://127.0.0.1:8000/img/UsersGreen.png" alt="Data Wali Kelas" className="max-w-10 max-h-7 ml-3" />
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
                        <img src="http://127.0.0.1:8000/img/BoxArrowDownWhite.png" alt="Arsip Data" className="max-w-10 max-h-7 ml-3" />
                        <p className="px-3">Arsip Data</p>
                    </div>
                </button>
            </a>
        </div>
    );
}
