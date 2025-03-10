import { Link, usePage } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import { Inertia } from '@inertiajs/inertia';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import NavbarDashboard from '@/Components/NavbarDashboard';
import {
    faEdit, faTrash, faPlus,
    faArchive,
    faDownload,
    faFilter,
    faSearch,
    faPrint,
    faFileExcel
} from '@fortawesome/free-solid-svg-icons';
import Paginator from '@/Components/Paginator';
import Header from '@/Components/Header';
import Swal from 'sweetalert2';

export default function Siswa() {
    const [siswa, setSiswa] = useState("");
    // State untuk pencarian
    const [searchNama, setSearchNama] = useState("");
    const [searchNisn, setSearchNisn] = useState("");
    const [activeTab, setActiveTab] = useState(window.location.pathname);
    const [selectedCheckboxes, setSelectedCheckboxes] = useState([]);

    useEffect(() => {
        setActiveTab(window.location.pathname);
    }, [window.location.pathname]);

    // Data dummy siswa
    const siswaData = [
        { id: 0, nama: "Zahra Aurira Hanifah", nisn: "321890008", kode: "742213", kelas: "XII", email: "zahra@gmail.com", no: "08959870912", kategori: "Reguler" },
        { id: 1, nama: "Vanya Karunia, S.Pd.", nisn: "321890009", kode: "742213", kelas: "XII", email: "vanya@gmail.com", no: "08564462512", kategori: "Reguler" },
    ];

    // Filter data siswa berdasarkan input
    const filteredSiswa = siswaData.filter((siswa) =>
        siswa.nama.toLowerCase().includes(searchNama.toLowerCase()) &&
        siswa.nisn.includes(searchNisn)
    );

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
        }).then(() => {
            window.location.href = "/wali-kelas-empty";
        });
    };

    // Tombol Arsip hanya menyala jika semua checkbox dipilih
    const isAllChecked = selectedCheckboxes.length === siswaData.length;

    return (
        <div className="bg-gray-100 font-sans flex min-h-screen">
            <NavbarDashboard />
            {/* Main Content */}
            <main className="flex-1 p-6">
                <Header />
                {/* Page Title */}
                <h1 className="text-3xl text-black font-bold mb-4">Data Siswa</h1>
                {/* Actions */}
                <div className="flex items-center mb-4 space-x-2">
                    {/* Tombol Data Wali Kelas */}
                    <a href="/siswa">
                        <button
                            className={`text-center rounded w-full sm:w-auto px-4 py-2 font-bold transition-all duration-200 ease-in-out ${activeTab === "/siswa"
                                ? "bg-green-800 text-white"
                                : "bg-green-800 border border-green-700 text-white"
                                }`}
                        >
                            <div className="flex items-center rounded">
                                <img src="http://127.0.0.1:8000/img/Users.png" alt="Data Wali Kelas" className="max-w-10 max-h-7 mr-3" />
                                <p className="px-3">Data Siswa</p>
                            </div>
                        </button>
                    </a>

                    {/* Tombol Arsip Data */}
                    <a href="/siswa-arsip">
                        <button
                            className="min-w-44 px-4 py-2 bg-white rounded flex items-center shadow hover:shadow-md font-bold transition-all duration-200 ease-in-out text-green-900"
                        >
                            <img src="http://127.0.0.1:8000/img/BoxArrowDown.png" alt="Data Wali Kelas" className="max-w-10 max-h-7 mr-3 " />
                            Arsip Data
                        </button>
                    </a>
                </div>
                <div className="w-full flex justify-stretch justify-items-stretch mb-4 space-x-2 border-t border-black ">
                    <button
                        className="min-w-56 bg-white text-green-700 mt-4 px-4 py-2 rounded flex items-center justify-between font-bold shadow hover:shadow-md"
                    >
                        Filter
                        <FontAwesomeIcon icon={faFilter} className="mr-2" />
                    </button>
                    <a href="/siswa-tambah-data">
                        <button
                            className="min-w-56 bg-yellow-500 text-white mt-4 px-4 py-3 rounded flex items-center shadow hover:shadow-md"
                        >
                            <FontAwesomeIcon icon={faPlus} className="mr-2" />
                            Tambah Data
                        </button>
                    </a>
                    <button className="min-w-56 bg-red-500 text-white mt-4 px-4 py-2 rounded flex items-center shadow hover:shadow-md" onClick={handleArchiveAll}>
                        <FontAwesomeIcon icon={faArchive} className="mr-2" />
                        Arsip Semua Data
                    </button>
                    <button className="min-w-56 bg-green-800 text-white mt-4 px-4 py-2 rounded flex items-center shadow hover:shadow-md">
                        <FontAwesomeIcon icon={faPrint} className="mr-2" />
                        Cetak Semua Data
                    </button>
                    <button className="min-w-56 bg-white border-2 border-green-700 font-bold text-green-800 mt-4 px-4 py-2 rounded flex items-center shadow hover:shadow-md">
                        <FontAwesomeIcon icon={faFileExcel} className="mr-2" />
                        Import Excel
                    </button>
                </div >
                <div className="w-full">
                    <div className="">
                        <img src="http://127.0.0.1:8000/img/Vector.png" alt="" className='max-w-[10%] mx-auto mt-24' />
                    </div>
                    <div className="mt-10">
                        <p className="text-center text-xl">Saat ini tidak ada data yang diarsipkan.</p>
                    </div>
                </div>
            </main >
        </div >
    );
}
