import NavbarDashboard from '@/Components/NavbarDashboard';
import { useRef, useEffect, useState } from 'react';
import Header from '@/Components/Header';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArchive, faCalendarAlt, faFilter, faPen, faPenAlt, faPlus, faPrint, faSearch, faTimes } from '@fortawesome/free-solid-svg-icons';
import Paginator from '@/Components/Paginator';
import '../../css/app.css';
import Swal from 'sweetalert2';

export default function KelolaSPP() {
    const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
    const [isDownloadModalOpen, setIsDownloadModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedStatus, setSelectedStatus] = useState("");
    const [activeTab, setActiveTab] = useState(window.location.pathname);
    const [searchNama, setSearchNama] = useState("");
    const tableContainerRef = useRef(null);
    const scrollThumbRef = useRef(null);
    const scrollbarRef = useRef(null);
    const [selectedKategori, setSelectedKategori] = useState("");
    const [thumbWidth, setThumbWidth] = useState("20%");

    // Data siswa
    const siswaData = [
        { id: 0, nama: "JFLS", nominal: "Rp. 150.000", jumlah: "100", masa: "24 September - 24 Oktober 2024", },
        { id: 1, nama: "SejutaCita", nominal: "Rp. 100.000", jumlah: "200", masa: "24 September - 24 Oktober 2024", },
        { id: 2, nama: "Pertamina", nominal: "Rp. 200.000", jumlah: "30", masa: "24 September - 24 Oktober 2024", },
        { id: 3, nama: "SejutaCita", nominal: "Rp. 100.000", jumlah: "50", masa: "24 September - 24 Oktober 2024", },
        { id: 4, nama: "JFLS", nominal: "Rp. 100.000", jumlah: "150", masa: "24 September - 24 Oktober 2024", },
    ];

    useEffect(() => {
        setActiveTab(window.location.pathname);
    }, [window.location.pathname]);

    const filteredSiswa = siswaData.filter((siswa) =>
        siswa.nama.toLowerCase().includes(searchNama.toLowerCase())
    );

    // Menyesuaikan ukuran scrollbar thumb
    useEffect(() => {
        const updateThumbWidth = () => {
            if (tableContainerRef.current && scrollbarRef.current) {
                const tableScrollWidth = tableContainerRef.current.scrollWidth;
                const tableClientWidth = tableContainerRef.current.clientWidth;
                const scrollbarWidth = scrollbarRef.current.clientWidth;
                const newThumbWidth = (tableClientWidth / tableScrollWidth) * scrollbarWidth;
                setThumbWidth(`${newThumbWidth}px`);
            }
        };

        updateThumbWidth();
        window.addEventListener("resize", updateThumbWidth);
        return () => window.removeEventListener("resize", updateThumbWidth);
    }, []);

    // Menangani pergerakan scrollbar manual
    const handleMouseDown = (e) => {
        e.preventDefault();
        const startX = e.clientX;
        const startScrollLeft = tableContainerRef.current.scrollLeft;

        const handleMouseMove = (moveEvent) => {
            const deltaX = moveEvent.clientX - startX;
            const scrollWidth = tableContainerRef.current.scrollWidth - tableContainerRef.current.clientWidth;
            const thumbMove = deltaX * (scrollWidth / (scrollbarRef.current.clientWidth - scrollThumbRef.current.clientWidth));
            tableContainerRef.current.scrollLeft = startScrollLeft + thumbMove;
        };

        const handleMouseUp = () => {
            document.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseup", handleMouseUp);
        };

        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseup", handleMouseUp);
    };

    const closeFilterModal = () => {
        setIsFilterModalOpen(false);
    };

    const closeDownloadModal = () => {
        setIsDownloadModalOpen(false);
    };
    const handleEditModal = () => {
        setIsEditModalOpen(true);
    };

    const closeEditModal = () => {
        setIsEditModalOpen(false);
    };

    const handleFilter = () => {
        window.location.href = "/spp/kelola-spp-lunas";
    }
    const handleDownload = () => {
        window.location.href = "/spp/download-spp";
    }
    const handleEdit = () => {
        window.location.href = "/spp/kelola-spp";
    }
    const handleKategoriButton = () => {
        window.location.href = "/spp/kelola-penerima-beasiswa";
    };

    // Opsi untuk filter dropdown
    const statusOptions = ["Lunas", "Menunggu Pembayaran", "Belum Lunas"];
    const kategoriOptions = ["Reguler", "Beasiswa"];
    const kelasOptions = ["X", "XI", "XII"];
    const tahunOptions = ["2021/2022", "2022/2023", "2023/2024"];
    const bulanOptions = [
        "Januari", "Februari", "Maret", "April", "Mei", "Juni",
        "Juli", "Agustus", "September", "Oktober", "November", "Desember"
    ];

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

                <div className="flex space-x-6 mb-6 mt-4 border-t-2">
                    <button
                        className="min-w-56 bg-yellow-500 text-white font-bold mt-4 px-4 py-3 rounded flex items-center shadow hover:shadow-md"
                    >
                        <FontAwesomeIcon icon={faPlus} className="mr-2" />
                        Tambah Beasiswa
                    </button>
                    <button className="min-w-56 bg-red-500 text-white mt-4 px-4 py-2 rounded flex items-center shadow hover:shadow-md" onClick={handleKategoriButton}>
                        <FontAwesomeIcon icon={faPen} className="mr-2" />
                        Update Kategori Siswa
                    </button>
                    <button className="min-w-56 bg-green-800 text-white mt-4 px-4 py-2 rounded flex items-center shadow hover:shadow-md">
                        <FontAwesomeIcon icon={faPrint} className="mr-2" />
                        Cetak Kelola Beasiswa
                    </button>
                </div>

                {/* Modal Popup Download */}
                {isFilterModalOpen && (
                    <div
                        className="fixed inset-0 bg-gray-300 bg-opacity-50 flex items-center justify-center z-[9999]"
                        onClick={closeFilterModal}
                    >
                        <div
                            className="bg-white p-6 rounded-lg shadow-lg w-[500px] border border-gray-300 relative"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Header Modal */}
                            <div className="flex justify-between items-center bg-yellow-400 p-4 rounded-t-lg">
                                <h2 className="text-lg font-bold text-white mx-auto">Filtering Kelola SPP</h2>
                                <button onClick={closeFilterModal}>
                                    <FontAwesomeIcon icon={faTimes} className="text-white text-xl" />
                                </button>
                            </div>

                            {/* Form Filter */}
                            <div className="w-full py-4">
                                {/* Pilihan Status Pembayaran */}
                                <label className="block text-black text-sm font-bold mb-2">Status Pembayaran SPP:</label>
                                <div className="flex flex-col space-y-2">
                                    {statusOptions.map((status, index) => (
                                        <label key={index} className="flex justify-between items-center border border-green-500 rounded-xl px-4 py-2 cursor-pointer text-black">
                                            {status}
                                            <input
                                                type="radio"
                                                name="status"
                                                value={status}
                                                checked={selectedStatus === status}
                                                onChange={(e) => setSelectedStatus(e.target.value)}
                                                className="form-radio text-green-500"
                                            />
                                        </label>
                                    ))}
                                </div>

                                {/* Dropdown Kategori */}
                                <label className="block text-black text-sm font-bold mt-4 mb-2">Kategori:</label>
                                <select
                                    className="w-full px-3 py-2 border border-green-500 rounded focus:ring-2 text-black focus:ring-green-500"
                                    value={selectedKategori}
                                    onChange={(e) => setSelectedKategori(e.target.value)}
                                >
                                    <option value="">Pilih Kategori</option>
                                    {kategoriOptions.map((kategori, index) => (
                                        <option key={index} value={kategori}>
                                            {kategori}
                                        </option>
                                    ))}
                                </select>

                                {/* Tombol Aksi */}
                                <div className="mt-6 space-y-2">
                                    <button
                                        onClick={handleFilter}
                                        className="w-full bg-green-700 text-white py-2 rounded"
                                    >
                                        Filter
                                    </button>
                                    <button
                                        onClick={closeFilterModal}
                                        className="w-full border border-green-700 text-green-700 py-2 rounded"
                                    >
                                        Batal
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                {/* Modal Popup Filter */}
                {isDownloadModalOpen && (
                    <div
                        className="fixed inset-0 bg-gray-300 bg-opacity-50 flex items-center justify-center z-[9999]"
                        onClick={closeFilterModal}
                    >
                        <div
                            className="bg-white p-6 rounded-lg shadow-lg w-[500px] border border-gray-300 relative"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Header Modal */}
                            <div className="flex justify-between items-center bg-yellow-400 p-4 rounded-t-lg">
                                <h2 className="text-lg font-bold text-white mx-auto">Filtering Kelola SPP</h2>
                                <button onClick={closeFilterModal}>
                                    <FontAwesomeIcon icon={faTimes} className="text-white text-xl" />
                                </button>
                            </div>

                            {/* Form Filter */}
                            <div className="w-full py-4">
                                {/* Pilihan Status Pembayaran */}
                                <label className="block text-black text-sm font-bold mb-2">Status Pembayaran SPP:</label>
                                <div className="flex flex-col space-y-2">
                                    {statusOptions.map((status, index) => (
                                        <label key={index} className="flex justify-between items-center border border-green-500 rounded-xl px-4 py-2 cursor-pointer text-black">
                                            {status}
                                            <input
                                                type="radio"
                                                name="status"
                                                value={status}
                                                checked={selectedStatus === status}
                                                onChange={(e) => setSelectedStatus(e.target.value)}
                                                className="form-radio text-green-500"
                                            />
                                        </label>
                                    ))}
                                </div>

                                {/* Dropdown Kategori */}
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
                                <label className="block text-black text-sm font-bold mt-4 mb-2">Bulan Pembayaran SPP</label>
                                <select
                                    className="w-full px-3 py-2 border border-green-500 rounded focus:ring-2 text-black focus:ring-green-500"
                                    value={selectedKategori}
                                    onChange={(e) => setSelectedKategori(e.target.value)}
                                >
                                    <option value="">Pilih Bulan Pembayaran SPP</option>
                                    {bulanOptions.map((kategori, index) => (
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
                                    <button
                                        onClick={closeDownloadModal}
                                        className="w-full border border-green-700 text-green-700 py-2 rounded"
                                    >
                                        Batal
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                {isEditModalOpen && (
                    <div
                        className="fixed inset-0 bg-gray-300 bg-opacity-50 flex items-center justify-center z-[9999]"
                        onClick={closeEditModal}
                    >
                        <div
                            className="bg-white p-6 rounded-lg shadow-lg w-[500px] border border-gray-300 relative"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Header Modal */}
                            <div className="flex justify-between items-center bg-yellow-400 p-4 rounded-t-lg">
                                <h2 className="text-lg font-bold text-white mx-auto">Edit Tagihan</h2>
                                <button onClick={closeEditModal}>
                                    <FontAwesomeIcon icon={faTimes} className="text-white text-xl" />
                                </button>
                            </div>

                            {/* Form Filter */}
                            <div className="w-full py-4">
                                {/* Pilihan Status Pembayaran */}
                                <label className="block text-black text-sm font-bold mb-2">Generate Tagihan Siswa Berdasarkan:</label>
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
                                <label className="block text-black text-sm font-bold mt-4 mb-2">Bulan Pembayaran SPP</label>
                                <select
                                    className="w-full px-3 py-2 border border-green-500 rounded focus:ring-2 text-black focus:ring-green-500"
                                    value={selectedKategori}
                                    onChange={(e) => setSelectedKategori(e.target.value)}
                                >
                                    <option value="">Pilih Bulan Pembayaran SPP</option>
                                    {bulanOptions.map((kategori, index) => (
                                        <option key={index} value={kategori}>
                                            {kategori}
                                        </option>
                                    ))}
                                </select>
                                {/* Dropdown Kategori */}
                                <label className="block text-black text-sm font-bold mt-4 mb-2">Tahun Ajaran  Pembayaran SPP:</label>
                                <select
                                    className="w-full px-3 py-2 border border-green-500 rounded focus:ring-2 text-black focus:ring-green-500"
                                    value={selectedKategori}
                                    onChange={(e) => setSelectedKategori(e.target.value)}
                                >
                                    <option value="">Pilih Tahun Ajaran</option>
                                    {tahunOptions.map((kategori, index) => (
                                        <option key={index} value={kategori}>
                                            {kategori}
                                        </option>
                                    ))}
                                </select>
                                <label className="block text-black text-sm font-bold mt-4 mb-2">Nominal Pembayaran</label>
                                <input
                                    type="text"
                                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 text-black"
                                    placeholder="Masukkan Nominal"
                                    required
                                />
                                <label className="block text-black text-sm font-bold mt-4 mb-2">Batas Pembayaran</label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 text-black pr-10"
                                        placeholder="Masukkan Batas Pembayaran"
                                        required
                                    />
                                    <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                                        <FontAwesomeIcon icon={faCalendarAlt} className="text-gray-400 mr-2" />
                                    </div>
                                </div>

                                {/* Tombol Aksi */}
                                <div className="mt-6 space-y-2">
                                    <button
                                        onClick={handleEdit}
                                        className="w-full bg-green-700 text-white py-2 rounded"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={closeEditModal}
                                        className="w-full border border-green-700 text-green-700 py-2 rounded"
                                    >
                                        Batal
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                {/* Tabel dengan scroll horizontal */}
                <div className="w-full overflow-hidden rounded-lg border border-black">
                    <table className="min-w-full bg-white rounded-lg overflow-hidden">
                        <thead>
                            <tr className="bg-green-50 border border-gray rounded-t-lg">
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
                                <th className="py-2 px-4 border border-gray text-black font-bold">Nominal Potongan</th>
                                <th className="py-2 px-4 border border-gray text-black font-bold">Jumlah Siswa</th>
                                <th className="py-2 px-4 border border-gray text-black font-bold">Masa Berakhir</th>
                                <th className="py-2 px-4 border border-gray text-black font-bold rounded-tr-lg">Action</th>
                            </tr>
                        </thead>
                        <tbody className="border border-black">
                            {filteredSiswa.length > 0 ? (
                                filteredSiswa.map((siswa, index) => (
                                    <tr key={siswa.id} className="hover:bg-gray-100">
                                        <td className="py-2 px-4 border text-black text-center">{index + 1}</td>
                                        <td className="py-2 px-4 border text-black text-center">{siswa.nama}</td>
                                        <td className="py-2 px-4 border text-black text-center">{siswa.nominal}</td>
                                        <td className="py-2 px-4 border text-black text-center">{siswa.jumlah}</td>
                                        <td className="py-2 px-4 border text-black text-center">{siswa.masa}</td>
                                        <td className="py-2 px-4 border text-black text-center">
                                            <button className="text-black rounded" onClick={handleEditModal}>
                                                <img src="http://127.0.0.1:8000/img/edit.png" alt="" className="mx-auto" />
                                                Edit
                                            </button>
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
