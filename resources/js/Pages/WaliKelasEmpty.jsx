import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import NavbarDashboard from '@/Components/NavbarDashboard';
import {
    faTimes,
    faPlus,
    faArchive
} from '@fortawesome/free-solid-svg-icons';
import Header from '@/Components/Header';
import Swal from 'sweetalert2';

export default function WaliKelas() {
    const [modalOpen, setModalOpen] = useState(false);
    const [waliKelas, setWaliKelas] = useState("");
    const [selectedCheckboxes, setSelectedCheckboxes] = useState([]);
    const [activeTab, setActiveTab] = useState(window.location.pathname);

    useEffect(() => {
        setActiveTab(window.location.pathname);
    }, [window.location.pathname]); // Update setiap kali URL berubah

    // Data dummy wali kelas (bisa diganti dengan data dari backend)
    const waliKelasData = [
        { id: 1, nama: "Vanya Karunia, S.Pd." },
        { id: 2, nama: "Melisa Oktavia, S.Pd." },
        { id: 3, nama: "Nanda Kusuma, S.Pd." },
        { id: 4, nama: "Muhammad Ibrah, S.Pd." },
        { id: 5, nama: "Hafiz, S.Pd." }
    ];

    // Simpan data ketika tombol "Tambah" ditekan
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Wali Kelas Ditambahkan:", waliKelas);
        // Kirim data ke backend dengan Inertia

        // Tampilkan notifikasi setelah sukses
        Swal.fire({
            title: "Sukses!",
            width: "800px",
            text: `Data Wali Kelas Berhasil Ditambahkan.`,
            imageUrl: "http://127.0.0.1:8000/img/CheckCircle.png",
            imageWidth: 150,
            imageHeight: 150,
            confirmButtonText: "OK",
            showCloseButton: true,
            closeButtonHtml: '<span style="color: black; font-size: 40px;">&times;</span>',
            timer: 3000, // Notifikasi otomatis hilang dalam 3 detik
            timerProgressBar: true,
            customClass: {
                confirmButton: "custom-confirm-button" // Tambahkan class untuk styling tombol
            },
        }).then(() => {
            window.location.href = "/wali-kelas";
        });

        setModalOpen(false); // Tutup modal setelah submit
        setWaliKelas(""); // Reset input
    };

    // Tombol Arsip hanya menyala jika semua checkbox dipilih
    const isAllChecked = selectedCheckboxes.length === waliKelasData.length;

    // Fungsi untuk menangani Arsip Semua Data
    const handleArchiveAll = () => {
        Swal.fire({
            title: `Semua Data Wali Kelas Berhasil Diarsipkan!`,
            width: "800px",
            imageUrl: "http://127.0.0.1:8000/img/CheckCircle.png",
            imageWidth: 150,
            imageHeight: 150,
            confirmButtonText: "OK",
            showCloseButton: true,
            closeButtonHtml: '<span style="color: black; font-size: 40px;">&times;</span>',
            timer: 3000, // Notifikasi otomatis hilang dalam 3 detik
            timerProgressBar: true,
            customClass: {
                confirmButton: "custom-confirm-button" // Tambahkan class untuk styling tombol
            },
        })
    };

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
                            className={`text-center rounded w-full sm:w-auto px-4 py-2 font-bold transition-all duration-200 ease-in-out ${activeTab === "/wali-kelas-empty"
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
                <div className="flex items-center mb-4 space-x-2 border-t border-black ">
                    <button
                        className="bg-yellow-500 text-white mt-4 px-4 py-2 rounded flex items-center"
                        onClick={() => setModalOpen(true)}
                    >
                        <FontAwesomeIcon icon={faPlus} className="mr-2" />
                        Tambah Data
                    </button>
                    {/* Modal Popup */}
                    {modalOpen && (
                        <div
                            className="fixed inset-0 bg-gray-300 bg-opacity-50 flex items-center justify-center z-[9999]"
                            onClick={() => setModalOpen(false)} // Klik luar modal untuk menutup
                        >
                            <div
                                className="bg-white p-6 rounded-lg shadow-lg w-[600px] border border-gray-300 relative"
                                onClick={(e) => e.stopPropagation()} // Mencegah modal tertutup jika dalam modal diklik
                            >
                                {/* Header Modal */}
                                <div className="p-3 rounded-t-lg border-2">
                                    <div className="flex justify-between align-content-center items-stretch bg-yellow-400 p-4 rounded-lg">
                                        <div>
                                            <h2 className="text-lg font-bold text-white">Tambah Data Wali Kelas</h2>
                                        </div>
                                        <div>
                                            <button onClick={() => setModalOpen(false)}>
                                                <FontAwesomeIcon icon={faTimes} className="text-white text-md pt-1" />
                                            </button>
                                        </div>
                                    </div>
                                    {/* Form */}
                                    <div className="w-full">
                                        <form onSubmit={handleSubmit} className="py-4">
                                            <label className="block text-gray-700 text-sm font-bold mb-2">Wali Kelas:</label>
                                            <input
                                                type="text"
                                                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
                                                placeholder="Masukkan nama wali kelas siswa"
                                                value={waliKelas}
                                                onChange={(e) => setWaliKelas(e.target.value)}
                                                required
                                            />

                                            {/* Tombol Aksi */}
                                            <div className="mt-10 space-y-2">
                                                <button
                                                    type="submit"
                                                    className="w-full bg-green-700 text-white py-2 rounded"
                                                >
                                                    Tambah
                                                </button>
                                                <button
                                                    type="button"
                                                    className="w-full border border-green-700 text-green-700 py-2 rounded"
                                                    onClick={() => setModalOpen(false)}
                                                >
                                                    Batal
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div >
                    )
                    }
                    <button className={`mt-4 px-4 py-2 rounded flex items-center ${isAllChecked ? "bg-green-700 text-white" : "bg-gray-400 text-gray-700 cursor-not-allowed"}`}
                        disabled={!isAllChecked} onClick={isAllChecked ? handleArchiveAll : null}>
                        <FontAwesomeIcon icon={faArchive} className="mr-2" />
                        Arsip Semua Data
                    </button>
                </div >
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
