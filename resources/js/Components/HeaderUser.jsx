import { Link, usePage } from '@inertiajs/react';
import { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faChevronDown,
    faChevronUp,
    faSignOutAlt,
    faUser,
    faBars,  // Ikon Hamburger
    faTimes, // Ikon Close
} from '@fortawesome/free-solid-svg-icons';
import { Inertia } from '@inertiajs/inertia';

export default function HeaderUser() {
    const { auth } = usePage().props;
    const [activeTab, setActiveTab] = useState(window.location.pathname);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const dropdownRef = useRef(null);

    // Menutup dropdown jika klik di luar
    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    // Fungsi Logout dengan Inertia.js
    const handleLogout = (e) => {
        e.preventDefault();
        Inertia.post(route("logout"), {}, {
            onSuccess: () => {
                setIsDropdownOpen(false);
            }
        });
    };

    return (
        <>
            {/* Header */}
            <header className="bg-transparent w-full flex justify-between items-center mobile:pt-6 lg:py-4 lg:px-6">
                {/* Hamburger Menu (Mobile) */}
                <div className="mt-2 ml-2 md:hidden">
                    <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-black">
                        <FontAwesomeIcon icon={isMobileMenuOpen ? faTimes : faBars} size="lg" />
                    </button>
                </div>

                {/* Logo SPPku */}
                <div className="flex justify-center flex-1 mobile:ml-6 md:flex-none lg:ml-0">
                    <img
                        alt="Logo SPPku"
                        className="h-10"
                        src="http://127.0.0.1:8000/img/LOGO FIX 4.png"
                    />
                </div>

                {/* Navbar Desktop (Tetap Tidak Diubah) */}
                <div className="hidden w-full md:flex justify-center">
                    <nav className="flex space-x-8 w-[70%]">
                        <Link
                            href="/user/dashboard"
                            className={`flex-1 text-center px-4 py-2 font-bold rounded-full ${activeTab === "/user/dashboard"
                                ? "bg-green-700 text-white"
                                : "border border-green-700 text-green-700 hover:outline hover:outline-2 hover:outline-green-900"
                                }`}
                        >
                            Beranda
                        </Link>

                        <Link
                            href="/user/pembayaran-spp"
                            className={`flex-1 text-center px-4 py-2 font-bold rounded-full ${["/user/pembayaran-spp", "/user/proses-pembayaran"].includes(activeTab)
                                ? "bg-green-700 text-white"
                                : "border border-green-700 text-green-700 hover:outline hover:outline-2 hover:outline-green-900"
                                }`}
                        >
                            Pembayaran SPP
                        </Link>

                        <Link
                            href="/user/ulasan"
                            className={`flex-1 text-center px-4 py-2 font-bold rounded-full ${activeTab === "/user/ulasan"
                                ? "bg-green-700 text-white"
                                : "border border-green-700 text-green-700 hover:outline hover:outline-2 hover:outline-green-900"
                                }`}
                        >
                            Ulasan
                        </Link>
                    </nav>
                </div>

                {/* Dropdown Menu (Profil) */}
                <div ref={dropdownRef} className="relative mobile:w-24 lg:w-44">
                    <div
                        className="flex items-center space-x-2 rounded-lg shadow-lg px-4 py-2 cursor-pointer bg-white border border-gray-200"
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    >
                        <img
                            alt={`Profile picture of ${auth.user.name}`}
                            className="rounded-full mobile:w-6 lg:w-10"
                            height="40"
                            src="http://127.0.0.1:8000/img/man.png"
                            width="40"
                        />
                        <div className="lg:pr-4">
                            <p className="font-bold text-black mobile:text-[10px] lg:text-lg">{auth.user.name}</p>
                            <p className="text-black mobile:text-[7.5px] lg:ml-1 lg:text-xs">{auth.user.kelas || "VIII"}</p>
                        </div>

                        {/* Ikon berubah saat dropdown terbuka */}
                        <FontAwesomeIcon
                            icon={isDropdownOpen ? faChevronUp : faChevronDown}
                            className="text-black mobile:text-[7px] lg:text-sm"
                        />
                    </div>

                    {/* Dropdown Menu */}
                    {isDropdownOpen && (
                        <div className="absolute left-0 mt-2 w-full bg-white rounded-lg shadow-lg z-50">
                            <Link href="/user/profile" className="flex items-center py-2 px-4 text-black hover:bg-yellow-500 hover:text-white mobile:text-[9px] lg:text-[14px]">
                                <FontAwesomeIcon icon={faUser} className="mr-2 mobile:text-xs lg:text-lg lg:mr-4" />
                                Profil Saya
                            </Link>
                            <button
                                onClick={handleLogout}
                                className="flex items-center w-full text-left px-4 py-2 text-black hover:bg-red-500 hover:text-white cursor-pointer mobile:text-[9px] lg:text-[14px]"
                            >
                                <FontAwesomeIcon icon={faSignOutAlt} className="mr-2 mobile:text-xs lg:text-lg lg:mr-4" />
                                Logout
                            </button>
                        </div>
                    )}
                </div>
            </header>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="md:hidden fixed top-0 left-0 w-full h-full bg-white flex flex-col items-center justify-start z-50">
                    {/* Tombol Close di Kiri Atas */}
                    <button
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="absolute top-4 left-4 text-black text-3xl"
                    >
                        <FontAwesomeIcon icon={faTimes} />
                    </button>

                    {/* Logo di Tengah */}
                    <img
                        alt="Logo SPPku"
                        className="h-16 mb-6"
                        src="http://127.0.0.1:8000/img/LOGO FIX 4.png"
                    />

                    {/* Navigasi Vertikal */}
                    <nav className="flex flex-col space-y-4 text-center w-full max-w-xs">
                        <Link
                            href="/user/dashboard"
                            className={`block text-lg font-bold py-3 w-full rounded ${activeTab === "/user/dashboard"
                                ? "bg-green-700 text-white"
                                : "border border-green-700 text-green-700 hover:bg-green-700 hover:text-white"
                                }`}
                            onClick={() => {
                                setActiveTab("/user/dashboard");
                                setIsMobileMenuOpen(false);
                            }}
                        >
                            Beranda
                        </Link>

                        <Link
                            href="/user/pembayaran-spp"
                            className={`block text-lg font-bold py-3 w-full rounded ${["/user/pembayaran-spp", "/user/proses-pembayaran"].includes(activeTab)
                                ? "bg-green-700 text-white"
                                : "border border-green-700 text-green-700 hover:bg-green-700 hover:text-white"
                                }`}
                            onClick={() => {
                                setActiveTab("/user/pembayaran-spp");
                                setIsMobileMenuOpen(false);
                            }}
                        >
                            Pembayaran SPP
                        </Link>

                        <Link
                            href="/user/ulasan"
                            className={`block text-lg font-bold py-3 w-full rounded ${activeTab === "/user/ulasan"
                                ? "bg-green-700 text-white"
                                : "border border-green-700 text-green-700 hover:bg-green-700 hover:text-white"
                                }`}
                            onClick={() => {
                                setActiveTab("/user/ulasan");
                                setIsMobileMenuOpen(false);
                            }}
                        >
                            Ulasan
                        </Link>
                    </nav>
                </div>
            )}
        </>
    );
}
