import { Link, usePage } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import NavbarDashboard from '@/Components/NavbarDashboard';
import {
    faBoxArchive
} from '@fortawesome/free-solid-svg-icons';
import Paginator from '@/Components/Paginator';
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

    const handleArchive = (e) => {
        e.preventDefault();
        console.log("Wali Kelas Ditambahkan:", waliKelas);
        // Kirim data ke backend dengan Inertia

        // Tampilkan notifikasi setelah sukses
        Swal.fire({
            title: `Data Wali Kelas Berhasil Diarsipkan!`,
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
        });

        setModalOpen(false); // Tutup modal setelah submit
        setWaliKelas(""); // Reset input
    };

    // Fungsi untuk menangani klik checkbox
    const handleCheckboxChange = (id) => {
        setSelectedCheckboxes((prev) => {
            const isSelected = prev.includes(id);
            if (isSelected) {
                return prev.filter((checkboxId) => checkboxId !== id);
            } else {
                return [...prev, id];
            }
        });
    };

    // Fungsi untuk menangani klik checkbox "Pilih Semua"
    const handleSelectAll = () => {
        if (selectedCheckboxes.length === waliKelasData.length) {
            setSelectedCheckboxes([]);
        } else {
            setSelectedCheckboxes(waliKelasData.map((wali) => wali.id));
        }
    };

    // Tombol Arsip hanya menyala jika semua checkbox dipilih
    const isAllChecked = selectedCheckboxes.length === waliKelasData.length;

    // Fungsi untuk menangani Arsip Semua Data
    const handleArchiveAll = () => {
        Swal.fire({
            title: `Semua Data Wali Kelas Berhasil Dipulihkan!`,
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
        }).then(() => {
            window.location.href = "/wali-kelas";
        });
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
                    <a href="/wali-kelas-empty">
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
                <div className="flex items-center mb-4 space-x-2 border-t border-black ">
                    <button className={`mt-4 px-4 py-2 rounded flex items-center ${isAllChecked ? "bg-yellow-500 text-white" : "bg-gray-400 text-gray-700 cursor-not-allowed"}`}
                        disabled={!isAllChecked} onClick={isAllChecked ? handleArchiveAll : null}>
                        <FontAwesomeIcon icon={faBoxArchive} className="mr-2" />
                        Buka Arsip Data
                    </button>
                </div >

                {/* Data Table */}
                <div className="w-full overflow-hidden rounded-lg">
                    <table className="min-w-full bg-white rounded-lg overflow-hidden border border-gray-300">
                        <thead>
                            <tr className="bg-green-50">
                                <th className="max-w-10 py-2 px-6 border border-gray-300 text-center">
                                    <input type="checkbox" checked={isAllChecked}
                                        onChange={handleSelectAll} />
                                </th>
                                <th className="py-2 px-4 border border-gray-300 text-black text-center font-bold">No</th>
                                <th className="py-2 px-4 border border-gray-300 text-black font-bold">Nama</th>
                                <th className="max-w-10 py-2 px-4 border border-gray-300 text-black text-center font-bold">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {waliKelasData.map((wali, index) => (
                                <tr key={wali.id} className="hover:bg-gray-100">
                                    <td className="max-w-10 py-4 px-6 border border-gray-300 text-center">
                                        <input type="checkbox" checked={selectedCheckboxes.includes(wali.id)}
                                            onChange={() => handleCheckboxChange(wali.id)} />
                                    </td>
                                    <td className="py-2 px-6 border border-gray-300 text-black text-center">{index + 1}</td>
                                    <td className="py-2 px-6 border border-gray-300 text-black text-center">{wali.nama}</td>
                                    <td className="py-4 px-4 border border-gray-300 text-center">
                                        <div className="max-w-10 flex justify-center items-center space-x-4 mx-auto text-center">
                                            <button className="flex-row items-center space-x-1">
                                                <img src="http://127.0.0.1:8000/img/edit.png" alt="" className="w-5 ml-2" />
                                                <span className="text-black text-xs">Edit</span>
                                            </button>
                                            <button onClick={handleArchive} className="flex-row items-center space-x-1">
                                                <img src="http://127.0.0.1:8000/img/arsip.png" alt="" className="w-5 ml-2" />
                                                <span className="text-black text-xs">Arsip</span>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <Paginator />
            </main >
        </div >
    );
}
