import { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import NavbarDashboard from '@/Components/NavbarDashboard';
import {
    faTimes, faEdit, faPlus
} from '@fortawesome/free-solid-svg-icons';
import Paginator from '@/Components/Paginator';
import Header from '@/Components/Header';
import Swal from 'sweetalert2';

export default function Kelas() {
    const [modalOpen, setModalOpen] = useState(false);
    const [kelas, setKelas] = useState("");
    const [selectedTeacher, setSelectedTeacher] = useState("");

    // Data dummy wali kelas (bisa diganti dengan data dari backend)
    const kelasData = [
        { id: 1, total: "300", kelas: "X" },
        { id: 2, total: "350", kelas: "XI" },
        { id: 3, total: "300", kelas: "XII" }
    ];

    const teachers = [
        "Tessa S.pd",
        "Tasyi S.pd",
        "Tasya S.pd"
    ];

    // Simpan data ketika tombol "Tambah" ditekan
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Kelas Ditambahkan:", kelas);
        setModalOpen(false)
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
    };

    return (
        <div className="bg-gray-100 font-sans flex min-h-screen">
            <NavbarDashboard />
            {/* Main Content */}
            <main className="flex-1 p-6">
                <Header />
                {/* Page Title */}
                <h1 className="text-3xl text-black font-bold mb-4">Data Kelas</h1>
                {/* Actions */}
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
                                            <h2 className="text-lg font-bold text-white">Tambah Data Kelas</h2>
                                        </div>
                                        <div>
                                            <button onClick={() => setModalOpen(false)}>
                                                <FontAwesomeIcon icon={faTimes} className="text-white text-md pt-1" />
                                            </button>
                                        </div>
                                    </div>
                                    {/* Form */}
                                    <div className="w-full">
                                        <form className="py-4">
                                            <label className="block text-gray-700 text-sm font-bold mb-2">Data Kelas</label>
                                            <input
                                                type="text"
                                                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
                                                placeholder="Masukkan Kelas"
                                                value={kelas}
                                                onChange={(e) => setKelas(e.target.value)}
                                                required
                                            />
                                            <label className="block text-gray-700 text-sm font-bold mt-4 mb-2">
                                                Nama Wali Kelas
                                            </label>
                                            <select
                                                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 text-black"
                                                value={selectedTeacher}
                                                onChange={(e) => setSelectedTeacher(e.target.value)}
                                                required
                                            >
                                                <option value="" className="text-gray-700">Pilih Wali Kelas</option>
                                                {teachers.map((teacher, index) => (
                                                    <option key={index} value={teacher} className="text-black">
                                                        {teacher}
                                                    </option>
                                                ))}
                                            </select>

                                            {/* Tombol Aksi */}
                                            <div className="mt-10 space-y-2">
                                                <button
                                                    type="submit"
                                                    className="w-full bg-green-700 text-white py-2 rounded" onClick={handleSubmit}
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
                </div >

                {/* Data Table */}
                <div className="w-full overflow-hidden rounded-lg">
                    <table className="min-w-full bg-white rounded-lg overflow-hidden border border-gray-300">
                        <thead>
                            <tr className="bg-green-50">
                                <th className="py-2 px-4 text-black text-center font-bold">No</th>
                                <th className="py-2 px-4 text-black font-bold">Kelas</th>
                                <th className="py-2 px-4 text-black font-bold">Total Siswa</th>
                                <th className="py-2 px-4 text-black text-center font-bold">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {kelasData.map((kelas, index) => (
                                <tr key={kelas.id} className="hover:bg-gray-100">
                                    <td className="max-w-20 py-2 px-4 border border-gray-300 text-black text-center">{index + 1}</td>
                                    <td className="py-2 px-24 border border-gray-300 text-center text-black">{kelas.kelas}</td>
                                    <td className="py-2 px-24 border border-gray-300 text-center text-black">{kelas.total}</td>
                                    <td className="max-w-20 py-2 px-2 border border-gray-300 text-end">
                                        <button className="text-green-600 flex items-center space-x-1 text-start pl-10">
                                            <FontAwesomeIcon icon={faEdit} />
                                            <span>Edit</span>
                                        </button>
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
