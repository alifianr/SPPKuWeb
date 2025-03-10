import NavbarDashboard from '@/Components/NavbarDashboard';
import { useRef, useEffect, useState } from 'react';
import Header from '@/Components/Header';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArchive, faArrowLeft, faCalendarAlt, faFilter, faPen, faPlus, faPrint, faSearch, faTimes } from '@fortawesome/free-solid-svg-icons';
import Paginator from '@/Components/Paginator';
import '../../css/app.css';
import Swal from 'sweetalert2';

export default function KelolaPenerimaBeasiswa() {
    const [modalOpen, setModalOpen] = useState(false);
    const [activeTab, setActiveTab] = useState(window.location.pathname);
    const [searchNama, setSearchNama] = useState("");
    const [searchNisn, setSearchNisn] = useState("");
    const tableContainerRef = useRef(null);
    const scrollbarRef = useRef(null);
    const [selectedKategori, setSelectedKategori] = useState("");

    // Data siswa
    const siswaData = [
        { No: 1, nama: "Zahra Aurira Hanifah", NISN: "123456789", kode: "123456", invoice: "1234567ZXV8910", bulan: "SPP Januari", kelas: "X", spp: "Rp 500.000", beasiswa: "Rp 0", spp: "Rp 500.000", pembayaran: "Rp 100.000", kategori: "Beasiswa", status: "Belum Lunas" },
        { No: 2, nama: "Alifia Nurhasanah", NISN: "213456789", kode: "213456", invoice: "1234567MNO89P", bulan: "SPP Januari", kelas: "X", spp: "Rp 500.000", beasiswa: "Rp 100.000", spp: "Rp 500.000", pembayaran: "Rp 200.000", kategori: "Beasiswa", status: "Lunas" },
        { No: 3, nama: "Alifia Nurhasanah", NISN: "312456789", kode: "312456", invoice: "1234567OPQ89R", bulan: "SPP Januari", kelas: "X", spp: "Rp 500.000", beasiswa: "Rp 100.000", spp: "Rp 500.000", pembayaran: "Rp 150.000", kategori: "Beasiswa", status: "Lunas" },
    ];

    const filteredSiswa = siswaData.filter((siswa) =>
        siswa.nama.toLowerCase().includes(searchNama.toLowerCase()) &&
        siswa.NISN.includes(searchNisn)
    );

    useEffect(() => {
        setActiveTab(window.location.pathname);
    }, [window.location.pathname]);

    const handleTambah = () => {
        Swal.fire({
            title: `Siswa Berhasil Ditambahkan ke Program Beasiswa`,
            width: "800px",
            imageUrl: "http://127.0.0.1:8000/img/CheckCircle.png",
            imageWidth: 150,
            imageHeight: 150,
            confirmButtonText: "Yakin",
            showCloseButton: true,
            closeButtonHtml: '<span style="color: black; font-size: 40px;">&times;</span>',
            timer: 3000, // Notifikasi otomatis hilang dalam 3 detik
            timerProgressBar: true,
            customClass: {
                confirmButton: "custom-confirm-button",
            },
        });
    }

    const handleUpdateKategori = () => {
        Swal.fire({
            title: `Apakah Anda yakin ingin mengubah kategori siswa dari Beasiswa menjadi Reguler?`,
            width: "1000px",
            icon: "question",
            confirmButtonText: "Yakin",
            cancelButtonText: "Tidak",
            showCloseButton: true,
            closeButtonHtml: '<span style="color: black; font-size: 40px;">&times;</span>',
            timer: 3000, // Notifikasi otomatis hilang dalam 3 detik
            timerProgressBar: true,
            customClass: {
                confirmButton: "custom-confirm-button-cash",
                cancelButton: "custom-cancel-button-cash", // Tambahkan class untuk styling tombol
                actions: "custom-actions-cash",
            },
        });
    }

    const handleDownload = () => {
        setModalOpen(false); // Tutup modal terlebih dahulu
        window.location.href = "/spp/download-beasiswa";
    };

    // Opsi untuk filter dropdown
    const kelasOptions = ["X", "XI", "XII"];

    return (
        <div className="bg-gray-100 font-sans flex min-h-screen">
            <NavbarDashboard />
            <main className="flex-1 p-6">
                <Header />
                <h1 className="text-3xl text-black font-bold mb-4">Kelola SPP</h1>

                {/* Actions */}
                <div className="flex items-center mb-2 space-x-2">
                    {/* Tombol Data Wali Kelas */}
                    <a href="/spp/kelola-spp">
                        <button
                            className={`text-center rounded w-full sm:w-auto px-4 py-2 font-bold transition-all duration-200 ease-in-out ${activeTab === "/siswa"
                                ? "bg-green-800 text-white"
                                : "border text-green-900 border-green-700 text-green-700 bg-white"
                                }`}
                        >
                            <div className="flex items-center rounded">
                                <img src="http://127.0.0.1:8000/img/UsersGreen.png" alt="Data Wali Kelas" className="max-w-10 max-h-7 mr-3" />
                                <p className="px-3">Kelola SPP</p>
                            </div>
                        </button>
                    </a>
                    {/* Tombol Arsip Data */}
                    <a href="/spp/kelola-beasiswa">
                        <button
                            className="min-w-44 px-4 py-2 bg-green-900 rounded flex items-center shadow hover:shadow-md font-bold transition-all duration-200 ease-in-out text-white"
                        >
                            <img src="http://127.0.0.1:8000/img/BoxArrowDownWhite.png" alt="Data Wali Kelas" className="max-w-10 max-h-7 mr-3 " />
                            Beasiswa
                        </button>
                    </a>
                </div>
                <div className="border-t-2 border-black">
                    <p className="mt-4 text-green-900 font-medium">Kelola Beasiswa / Penerima Beasiswa</p>
                    <div className="flex space-x-6 mb-6">
                        <a href="/spp/kelola-beasiswa">
                            <button
                                className="max-w-28 bg-green-800 text-white font-bold mt-4 px-4 py-3 rounded flex items-center shadow hover:shadow-md"
                            >
                                <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
                                Kembali
                            </button>
                        </a>
                        <button
                            className="min-w-56 bg-white text-green-800 font-bold mt-4 px-4 py-3 rounded flex items-center shadow hover:shadow-md justify-between"
                        >
                            Filter
                            <FontAwesomeIcon icon={faFilter} className="mr-2" />
                        </button>
                        <button
                            className="min-w-56 bg-yellow-500 text-white font-bold mt-4 px-4 py-3 rounded flex items-center shadow hover:shadow-md" onClick={handleTambah}
                        >
                            <FontAwesomeIcon icon={faPlus} className="mr-2" />
                            Tambah Siswa
                        </button>
                        <button className="min-w-56 bg-red-500 text-white mt-4 px-4 py-2 rounded flex items-center shadow hover:shadow-md" onClick={handleUpdateKategori}>
                            <FontAwesomeIcon icon={faPen} className="mr-2" />
                            Update Kategori Siswa
                        </button>
                        <button className="min-w-56 bg-white text-yellow-500 mt-4 px-4 py-2 rounded flex items-center shadow hover:shadow-md border border-yellow-500" onClick={() => setModalOpen(true)}>
                            <FontAwesomeIcon icon={faPrint} className="mr-2" />
                            Cetak Kelola Beasiswa
                        </button>
                    </div>
                    <div className="relative mb-4">
                        <input
                            type="text"
                            placeholder="Cari berdasarkan nama atau NISN atau kelas"
                            value={searchNama}
                            onChange={(e) => setSearchNama(e.target.value)}
                            className="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-green-500"
                        />
                        <FontAwesomeIcon icon={faSearch} className="absolute right-3 top-3 text-gray-400" />
                    </div>
                </div>
                {/* Modal Tambah Tagihan */}
                {modalOpen && (
                    <div
                        className="fixed inset-0 bg-gray-300 bg-opacity-50 flex items-center justify-center z-[9999]"
                        onClick={() => setModalOpen(false)}
                    >
                        <div
                            className="bg-white p-6 rounded-lg shadow-lg w-[600px] border border-gray-300 relative"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Header Modal */}
                            <div className="bg-yellow-400 p-4 rounded-t-lg flex justify-center relative">
                                <h2 className="text-lg font-bold text-white">Tambah Tagihan</h2>
                                <button
                                    onClick={() => setModalOpen(false)}
                                    className="absolute right-4 text-white text-xl"
                                >
                                    <FontAwesomeIcon icon={faTimes} />
                                </button>
                            </div>

                            {/* Form */}
                            <form className="py-4">
                                {/* Dropdown Kelas */}
                                <label className="block text-black text-sm font-bold mt-4 mb-2">Kelas</label>
                                <select
                                    className="w-full px-3 py-2 border border-green-500 rounded focus:ring-2 text-black focus:ring-green-500"
                                    value={selectedKategori}
                                    onChange={(e) => setSelectedKategori(e.target.value)}
                                >
                                    <option value="">Pilih Kelas</option>
                                    {kelasOptions.map((kategori, index) => (
                                        <option key={index} value={kategori}>
                                            {kategori}
                                        </option>
                                    ))}
                                </select>
                                {/* Tombol Aksi */}
                                <div className="mt-6 space-y-2">
                                    <button
                                        onClick={handleDownload}
                                        className="w-full bg-green-700 text-white py-2 rounded"
                                    >
                                        Cetak
                                    </button>
                                    <button className="w-full border border-green-700 font-bold text-green-700 py-2 rounded" onClick={() => setModalOpen(false)}>Batal</button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
                {/* Tabel dengan scroll horizontal */}
                <div className="w-full overflow-hidden rounded-lg border border-black">
                    <table className="min-w-full bg-white rounded-lg overflow-hidden">
                        <thead>
                            <tr className="bg-green-50 border border-gray rounded-t-lg">
                                <th className="py-2 px-6 text-center">
                                    <input type="checkbox" />
                                </th>
                                <th className="py-2 px-4 border border-gray text-black text-center font-bold rounded-tl-lg">No</th>
                                <th className="max-w-44 py-2 px-4 border border-gray text-black font-bold">Nama
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
                                <th className="py-2 px-4 border border-gray text-black font-bold">Kelas</th>
                                <th className="py-2 px-4 border border-gray text-black font-bold">Nominal Pembayaran</th>
                                <th className="py-2 px-4 border border-gray text-black font-bold rounded-tr-lg">Kategori</th>
                            </tr>
                        </thead>
                        <tbody className="border border-black">
                            {filteredSiswa.length > 0 ? (
                                filteredSiswa.map((siswa, index) => (
                                    <tr key={siswa.No} className="hover:bg-gray-100">
                                        <td className="py-4 px-6 border-b text-center">
                                            <input
                                                type="checkbox"
                                            />
                                        </td>
                                        <td className="py-2 px-4 border text-black text-center">{index + 1}</td>
                                        <td className="py-2 px-4 border text-black text-center">{siswa.nama}</td>
                                        <td className="py-2 px-4 border text-black text-center">{siswa.NISN}</td>
                                        <td className="py-2 px-4 border text-black text-center">{siswa.kelas}</td>
                                        <td className="py-2 px-4 border text-black text-center">{siswa.pembayaran}</td>
                                        <td className="py-2 px-4 border text-black text-center">
                                            <div className="bg-yellow-500 text-white rounded-xl">
                                                {siswa.kategori}
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6" className="py-4 text-center text-red-500 rounded-b-lg">
                                        Data tidak ditemukan
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                <Paginator />
            </main>
        </div>
    );
}
