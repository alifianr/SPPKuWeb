import React, { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';

export default function ButtonAdmin() {
    const [activeTab, setActiveTab] = useState(window.location.pathname);

    // State untuk menyimpan gambar tombol
    const [images, setImages] = useState({
        "wali-kelas": "http://127.0.0.1:8000/img/Users.png",
        "arsip-wali-kelas": "http://127.0.0.1:8000/img/BoxArrowDown.png",
    });

    // Gambar aktif ketika tombol ditekan
    const activeImages = {
        "wali-kelas": "http://127.0.0.1:8000/img/UsersGreen.png",
        "arsip-wali-kelas": "http://127.0.0.1:8000/img/BoxArrowDownWhite.png",
    };

    const handleTabClick = (tab, path) => {
        setActiveTab(path);

        // Perbarui gambar saat tombol ditekan
        setImages({
            "wali-kelas": path === "/wali-kelas" ? activeImages["wali-kelas"] : "http://127.0.0.1:8000/img/Users.png",
            "arsip-wali-kelas": path === "/arsip-wali-kelas" ? activeImages["arsip-wali-kelas"] : "http://127.0.0.1:8000/img/BoxArrowDown.png",
        });

        // Redirect ke halaman dengan Inertia.js
        Inertia.visit(path);
    };

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
                        <img src="http://127.0.0.1:8000/img/Users.png" alt="Data Wali Kelas" className="max-w-10 max-h-7 ml-3" />
                        <p className="px-3">Data Wali Kelas</p>
                    </div>
                </button>
            </a>

            {/* Tombol Arsip Data */}
            <a href="/wali-kelas/arsip-empty">
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
    );
}
