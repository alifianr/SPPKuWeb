import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import NavbarDashboard from '@/Components/NavbarDashboard';
import {
    faTimes,
    faPlus,
    faArchive,
    faBoxArchive
} from '@fortawesome/free-solid-svg-icons';
import Paginator from '@/Components/Paginator';
import Header from '@/Components/Header';
import Swal from 'sweetalert2';
import ButtonAdmin from '@/Components/ButtonAdmin';

export default function WaliKelas() {
    const [modalOpen, setModalOpen] = useState(false);
    const [waliKelas, setWaliKelas] = useState("");
    const [selectedCheckboxes, setSelectedCheckboxes] = useState([]);

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
        });

        setModalOpen(false); // Tutup modal setelah submit
        setWaliKelas(""); // Reset input
    };

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

    return (
        <div className="bg-gray-100 font-sans flex min-h-screen">
            <NavbarDashboard />
            {/* Main Content */}
            <main className="flex-1 p-6">
                <Header />
                {/* Page Title */}
                <h1 className="text-3xl text-black font-bold mb-4">Data Wali Kelas</h1>
                {/* Actions */}
                <ButtonAdmin />
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
                    <button className={`mt-4 px-4 py-2 rounded flex items-center ${isAllChecked ? "bg-red-500 text-white" : "bg-gray-400 text-gray-700 cursor-not-allowed"}`}
                        disabled={!isAllChecked} onClick={isAllChecked ? handleArchiveAll : null}>
                        <FontAwesomeIcon icon={faBoxArchive} className="mr-2" />
                        Arsip Semua Data
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
