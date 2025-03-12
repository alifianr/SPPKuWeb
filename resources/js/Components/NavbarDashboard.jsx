import { Link, usePage } from '@inertiajs/react';
import { Inertia } from '@inertiajs/inertia';
import React from "react";
import Swal from "sweetalert2"; // Import SweetAlert2
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faHome,
    faUserFriends,
    faChalkboardTeacher,
    faUserGraduate,
    faMoneyCheckAlt,
    faHistory,
    faCommentDots,
    faSignOutAlt
} from '@fortawesome/free-solid-svg-icons';

export default function NavbarDashboard() {
    const { url } = usePage(); // Mengambil informasi user & URL aktif

    const handleLogout = () => {
        Swal.fire({
            title: "Apakah Anda yakin ingin keluar dari akun SPPKu?",
            width: "800px",
            imageUrl: "http://127.0.0.1:8000/img/logout.png",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yakin",
            cancelButtonText: "Tidak",
            customClass: {
                popup: "rounded-lg",
                title: "text-xl font-bold mb-6",
                confirmButton: "bg-red-600 hover:bg-red-700 px-10 w-44 py-3 rounded-lg text-lg",
                cancelButton: "bg-gray-300 hover:bg-gray-400 px-10 w-44 py-3 rounded-lg text-lg",
            }
        }).then((result) => {
            if (result.isConfirmed) {
                Inertia.post(route('logout.admin'), {}, {
                    preserveScroll: true,
                    onSuccess: () => {
                        Swal.fire({
                            title: "Logout Berhasil!",
                            text: "Anda telah keluar.",
                            icon: "success",
                            timer: 2000,
                            showConfirmButton: false
                        });

                        // Redirect setelah logout tanpa error re-render
                        setTimeout(() => {
                            window.location.href = "/admin/login";
                        }, 2000);
                    },
                    onError: () => {
                        Swal.fire({
                            title: "Logout Gagal!",
                            text: "Terjadi kesalahan saat logout. Coba lagi!",
                            icon: "error",
                            confirmButtonText: "OK"
                        });
                    }
                });
            }
        });
    };

    return (
        <>
            <aside className="w-1/5 bg-red-50 p-6 flex flex-col">
                <div className="flex flex-col items-center">
                    <img
                        alt="Logo"
                        className="mb-6 w-24"
                        src="http://127.0.0.1:8000/img/LOGO FIX 4.png"
                    />
                </div>
                {/* Navigation */}
                <nav className="mt-6 space-y-4">
                    {[
                        { name: 'Dashboard', icon: faHome, link: '/dashboard' },
                        { name: 'Data Wali Kelas', icon: faUserFriends, link: '/wali-kelas' },
                        { name: 'Data Kelas', icon: faChalkboardTeacher, link: '/kelas' },
                        { name: 'Data Siswa', icon: faUserGraduate, link: '/siswa' },
                        { name: 'Kelola SPP', icon: faMoneyCheckAlt, link: '/spp' },
                        { name: 'Riwayat Pembayaran SPP', icon: faHistory, link: '/riwayat-bayar' },
                        { name: 'Record Feedback User', icon: faCommentDots, link: '/feedback' },
                    ].map((item, index) => (
                        <Link
                            key={index}
                            href={item.link}
                            className={`flex items-center p-2 rounded-lg transition ${url.startsWith(item.link) ? 'bg-green-700 text-white' : 'text-gray-700 hover:bg-gray-200'
                                }`}
                        >
                            <FontAwesomeIcon icon={item.icon} className="mr-2 text-lg" />
                            {item.name}
                        </Link>
                    ))}
                </nav>
                {/* Logout Button */}
                <div className="mt-20">
                    <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 text-white rounded-lg bg-red-500 hover:bg-red-600 flex items-center"
                    >
                        <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" />
                        Logout
                    </button>
                </div>
            </aside>
        </>
    );
}
