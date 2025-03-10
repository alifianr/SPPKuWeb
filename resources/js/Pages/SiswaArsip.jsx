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

export default function SiswaArsip() {
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

    const handleUnArchiveAll = () => {
        Swal.fire({
            title: `Semua Data Siswa Berhasil Dipulihkan!`,
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
            window.location.href = "/siswa";
        });
    };

    const handleArchive = () => {
        Swal.fire({
            title: `Data Siswa Berhasil Dipulihkan!`,
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
    };

    // Fungsi untuk menangani klik checkbox "Pilih Semua"
    const handleSelectAll = () => {
        if (selectedCheckboxes.length === siswaData.length) {
            setSelectedCheckboxes([]); // Jika semua sudah dipilih, batalkan semua
        } else {
            setSelectedCheckboxes(siswaData.map((siswa) => siswa.id)); // Pilih semua checkbox
        }
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
                    <a href="/siswa-empty">
                        <button
                            className={`text-center rounded w-full sm:w-auto px-4 py-2 font-bold transition-all duration-200 ease-in-out ${activeTab === "/siswa"
                                ? "bg-green-800 text-white"
                                : "border border-green-700 text-green-700 bg-white"
                                }`}
                        >
                            <div className="flex items-center rounded">
                                <img src="http://127.0.0.1:8000/img/UsersGreen.png" alt="Data Wali Kelas" className="max-w-10 max-h-7 mr-3" />
                                <p className="px-3">Data Siswa</p>
                            </div>
                        </button>
                    </a>

                    {/* Tombol Arsip Data */}
                    <a href="/siswa-empty">
                        <button
                            className="min-w-44 px-4 py-2 bg-green-800 rounded flex items-center shadow hover:shadow-md font-bold transition-all duration-200 ease-in-out text-white"
                        >
                            <img src="http://127.0.0.1:8000/img/BoxArrowDownWhite.png" alt="Data Wali Kelas" className="max-w-10 max-h-7 mr-3 " />
                            Arsip Data
                        </button>
                    </a>
                </div>
                <div className="w-full flex mb-4 space-x-2 border-t border-black ">
                    <button
                        className="min-w-44 bg-white text-green-700 mt-4 px-4 py-2 rounded flex items-center justify-between font-bold shadow hover:shadow-md"
                    >
                        Filter
                        <FontAwesomeIcon icon={faFilter} className="mr-2" />
                    </button>
                    <button className="min-w-44 bg-yellow-400 text-white mt-4 px-4 py-2 rounded flex items-center shadow hover:shadow-md" onClick={handleUnArchiveAll}>
                        <FontAwesomeIcon icon={faArchive} className="mr-2" />
                        Buka Arsip Data
                    </button>
                </div >

                {/* Data Table */}
                < div className="w-full overflow-hidden rounded-lg" >
                    <table className="min-w-full bg-white rounded-lg overflow-hidden">
                        <thead className="rounded-full">
                            <tr className="bg-green-50 border border-gray">
                                <th className="py-2 px-6 text-start">
                                    <input type="checkbox" checked={isAllChecked}
                                        onChange={handleSelectAll} />
                                </th>
                                <th className="py-2 px-4 border border-gray text-black text-center font-bold">No</th>
                                <th className="py-2 px-4 border border-gray text-black font-bold">Nama
                                    <div className="relative">
                                        <input
                                            type="text"
                                            placeholder="Cari Nama..."
                                            value={searchNama}
                                            onChange={(e) => setSearchNama(e.target.value)}
                                            className="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-green-500"
                                        />
                                        <FontAwesomeIcon icon={faSearch} className="absolute right-3 top-3 text-gray-400" />
                                    </div>
                                </th>
                                <th className="py-2 px-4 border border-gray text-black font-bold">NISN
                                    <div className="relative">
                                        <input
                                            type="text"
                                            placeholder="Cari NISN..."
                                            value={searchNisn}
                                            onChange={(e) => setSearchNisn(e.target.value)}
                                            className="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-green-500"
                                        />
                                        <FontAwesomeIcon icon={faSearch} className="absolute right-3 top-3 text-gray-400" />
                                    </div>
                                </th>
                                <th className="py-2 px-4 border border-gray text-black font-bold">Kode Akun</th>
                                <th className="py-2 px-4 border border-gray text-black font-bold">Kelas</th>
                                <th className="py-2 px-4 border border-gray text-black font-bold">Email</th>
                                <th className="py-2 px-4 border border-gray text-black font-bold">No.Handphone</th>
                                <th className="py-2 px-4 border border-gray text-black font-bold">Kategori</th>
                                <th className="py-2 px-6 border border-gray text-black text-center items-center justify-center font-bold">Action</th>
                            </tr>

                        </thead>
                        <tbody>
                            {filteredSiswa.length > 0 ? (
                                filteredSiswa.map((siswa) => (
                                    <tr key={siswa.id} className="hover:bg-gray-100">
                                        <td className="py-4 px-6 border-b text-center">
                                            <input
                                                type="checkbox"
                                                checked={selectedCheckboxes.includes(siswa.id)}
                                                onChange={() => handleCheckboxChange(siswa.id)}
                                            />
                                        </td>
                                        <td className="py-2 px-4 border text-black text-center">{siswa.id + 1}</td>
                                        <td className="py-2 px-4 border text-black text-center">{siswa.nama}</td>
                                        <td className="py-2 px-4 border text-black text-center">{siswa.nisn}</td>
                                        <td className="py-2 px-4 border text-black text-center">{siswa.kode}</td>
                                        <td className="py-2 px-4 border text-black text-center">{siswa.kelas}</td>
                                        <td className="py-2 px-4 border text-black text-center">{siswa.email}</td>
                                        <td className="py-2 px-4 border text-black text-center">{siswa.no}</td>
                                        <td className="py-2 px-4 border text-black text-center">
                                            <p className="bg-green-800 text-white p-2 rounded-full text-xs">{siswa.kategori}</p></td>
                                        <td className="py-4 px-4 border-b border-r text-center flex items-center justify-center space-x-3">
                                            <button className="text-green-600 flex flex-col items-center">
                                                <FontAwesomeIcon icon={faEdit} className="text-lg" />
                                                <p className="text-xs text-black mt-1">Edit</p>
                                            </button>
                                            <button className="text-red-600 flex flex-col items-center" onClick={handleArchive}>
                                                <FontAwesomeIcon icon={faArchive} className="text-lg" />
                                                <p className="text-xs text-black mt-1">Buka Arsip</p>
                                            </button>
                                            <button className="text-yellow-500 flex flex-col items-center">
                                                <FontAwesomeIcon icon={faDownload} className="text-lg" />
                                                <p className="text-xs text-black mt-1">Download</p>
                                            </button>
                                        </td>

                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="9" className="py-4 text-center text-red-500">
                                        Data tidak ditemukan
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div >
                <Paginator />
            </main >
        </div >
    );
}
