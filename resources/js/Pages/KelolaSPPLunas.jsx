import NavbarDashboard from '@/Components/NavbarDashboard';
import { useRef, useEffect, useState } from 'react';
import Header from '@/Components/Header';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArchive, faDownload, faEdit, faFilter, faPlus, faPrint, faSearch, faTimes } from '@fortawesome/free-solid-svg-icons';
import Paginator from '@/Components/Paginator';
import '../../css/app.css';


export default function KelolaSPPLunas() {
    const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
    const [selectedStatus, setSelectedStatus] = useState("");
    const [activeTab, setActiveTab] = useState(window.location.pathname);
    const [searchNama, setSearchNama] = useState("");
    const [searchNisn, setSearchNisn] = useState("");
    const tableContainerRef = useRef(null);
    const scrollThumbRef = useRef(null);
    const scrollbarRef = useRef(null);
    const [selectedKelas, setSelectedKelas] = useState("");
    const [selectedKategori, setSelectedKategori] = useState("");
    const [thumbWidth, setThumbWidth] = useState("20%");

    // Data siswa
    const siswaData = [
        { No: 1, nama: "Alifia Nurhasanah", NISN: "213456789", kode: "213456", invoice: "1234567MNO89P", bulan: "SPP Januari", kelas: "X", spp: "Rp 500.000", beasiswa: "Rp 100.000", spp: "Rp 500.000", pembayaran: "Rp 400.000", kategori: "Beasiswa", status: "Lunas" },
        { No: 2, nama: "Alifia Nurhasanah", NISN: "312456789", kode: "312456", invoice: "1234567OPQ89R", bulan: "SPP Januari", kelas: "X", spp: "Rp 500.000", beasiswa: "Rp 100.000", spp: "Rp 500.000", pembayaran: "Rp 400.000", kategori: "Beasiswa", status: "Lunas" },
    ];

    useEffect(() => {
        setActiveTab(window.location.pathname);
    }, [window.location.pathname]);

    const filteredSiswa = siswaData.filter((siswa) =>
        siswa.nama.toLowerCase().includes(searchNama.toLowerCase()) &&
        siswa.NISN.includes(searchNisn)
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

    // Sinkronisasi posisi thumb scrollbar dengan scroll tabel
    const handleTableScroll = () => {
        if (tableContainerRef.current && scrollbarRef.current && scrollThumbRef.current) {
            const scrollWidth = tableContainerRef.current.scrollWidth - tableContainerRef.current.clientWidth;
            const thumbMove = (tableContainerRef.current.scrollLeft / scrollWidth) * (scrollbarRef.current.clientWidth - scrollThumbRef.current.clientWidth);
            scrollThumbRef.current.style.transform = `translateX(${thumbMove}px)`;
        }
    };

    const handleFilterModal = () => {
        setIsFilterModalOpen(true);
    };

    const closeFilterModal = () => {
        setIsFilterModalOpen(false);
    };

    const handleFilter = () => {
        window.location.href = "/spp/kelola-spp-lunas";
    }

    // Opsi untuk filter dropdown
    const statusOptions = ["Lunas", "Belum Lunas"];
    const kategoriOptions = ["Reguler", "Beasiswa"];

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
                                : "border text-white border-green-700 text-green-700 bg-green-900"
                                }`}
                        >
                            <div className="flex items-center rounded">
                                <img src="http://127.0.0.1:8000/img/Users.png" alt="Data Wali Kelas" className="max-w-10 max-h-7 mr-3" />
                                <p className="px-3">Data SPP</p>
                            </div>
                        </button>
                    </a>

                    {/* Tombol Arsip Data */}
                    <a href="/siswa-arsip-empty">
                        <button
                            className="min-w-44 px-4 py-2 bg-white rounded flex items-center shadow hover:shadow-md font-bold transition-all duration-200 ease-in-out text-green-900"
                        >
                            <img src="http://127.0.0.1:8000/img/BoxArrowDown.png" alt="Data Wali Kelas" className="max-w-10 max-h-7 mr-3 " />
                            Beasiswa
                        </button>
                    </a>
                </div>

                <div className="flex space-x-6 mb-6 mt-4 border-t-2 border-black">
                    <button
                        className="min-w-56 bg-white text-green-800 font-bold mt-4 px-4 py-3 rounded flex items-center shadow hover:shadow-md justify-between" onClick={handleFilterModal}
                    >
                        Filter
                        <FontAwesomeIcon icon={faFilter} className="mr-2" />
                    </button>
                    <button className="min-w-56 bg-red-500 text-white mt-4 px-4 py-2 rounded flex items-center shadow hover:shadow-md">
                        <FontAwesomeIcon icon={faArchive} className="mr-2" />
                        Arsip Semua Data
                    </button>
                    <button className="min-w-56 bg-green-800 text-white mt-4 px-4 py-2 rounded flex items-center shadow hover:shadow-md">
                        <FontAwesomeIcon icon={faPrint} className="mr-2" />
                        Cetak Semua Data
                    </button>
                </div>

                {/* Modal Popup Filter */}
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
                {/* Tabel dengan scroll horizontal */}
                <div className="relative border border-gray-300 rounded-lg shadow-md bg-white max-w-[1200px]">
                    <div ref={tableContainerRef} className="overflow-x-auto relative custom-scroll max-w-[1200px]" onScroll={handleTableScroll}>
                        <table className="min-w-full w-full border-collapse">
                            <thead className="bg-green-50 border-b border-gray-300">

                                <tr>
                                    <th className="py-2 px-6 text-start">
                                        <input type="checkbox" />
                                    </th>
                                    <th className="py-2 px-4 border border-gray text-black font-bold">No</th>
                                    <th className="py-2 px-4 border border-gray text-black font-bold">Nama
                                        <div className="relative">
                                            <input
                                                type="text"
                                                placeholder="Cari Nama..."
                                                value={searchNama}
                                                onChange={(e) => setSearchNama(e.target.value)}
                                                className="min-w-28 px-3 py-2 border rounded focus:ring-2 focus:ring-green-500"
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
                                                className="min-w-28 px-3 py-2 border rounded focus:ring-2 focus:ring-green-500"
                                            />
                                            <FontAwesomeIcon icon={faSearch} className="absolute right-3 top-3 text-gray-400" />
                                        </div>
                                    </th>
                                    <th className="min-w-28 py-2 px-4 border border-gray text-black font-bold">Kode Akun</th>
                                    <th className="py-2 px-4 border border-gray text-black font-bold">No. Invoice</th>
                                    <th className="py-2 px-4 border border-gray text-black font-bold">Pembayaran</th>
                                    <th className="py-2 px-4 border border-gray text-black font-bold">Kelas</th>
                                    <th className="py-2 px-4 border border-gray text-black font-bold">Nominal SPP</th>
                                    <th className="min-w-28 py-2 px-6 border border-gray text-black text-center items-center justify-center font-bold">Nominal Beasiswa</th>
                                    <th className="py-2 px-6 border border-gray text-black text-center items-center justify-center font-bold">Nominal Pembayaran</th>
                                    <th className="py-2 px-6 border border-gray text-black text-center items-center justify-center font-bold">Kategori</th>
                                    <th className="py-2 px-6 border border-gray text-black text-center items-center justify-center font-bold">Status Pembayaran</th>
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
                                                />
                                            </td>
                                            {Object.entries(siswa).map(([key, value], colIndex) => (
                                                <td key={colIndex} className="py-2 px-4 border text-center text-black">
                                                    {/* Custom Styling untuk Kategori */}
                                                    {key === "kategori" ? (
                                                        <span
                                                            className={`px-3 py-1 rounded-full text-white text-sm font-semibold ${value === "Reguler" ? "bg-green-700" : "bg-yellow-500"
                                                                }`}
                                                        >
                                                            {value}
                                                        </span>
                                                    ) : key === "status" ? (
                                                        <span
                                                            className={`px-3 py-1 rounded-full text-white text-sm font-semibold ${value === "Lunas" ? "bg-green-700" : "bg-red-500"
                                                                }`}
                                                        >
                                                            {value}
                                                        </span>
                                                    ) : (
                                                        value
                                                    )}
                                                </td>
                                            ))}
                                            <td className="py-2 px-4 border text-center text-black flex items-center">
                                                <button className="text-black rounded mr-2">
                                                    <img src="http://127.0.0.1:8000/img/Money.png" alt="" className="mx-auto" />
                                                    Tunai
                                                </button>
                                                <button className="text-yellow-400 rounded mr-2">
                                                    <img src="http://127.0.0.1:8000/img/Download.png" alt="" className="mx-auto" />
                                                    <span className="text-black">Download</span>
                                                </button>
                                                <button className="text-black rounded">
                                                    <img src="http://127.0.0.1:8000/img/edit.png" alt="" />
                                                    Edit
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
                    </div>
                </div>
                <Paginator />
            </main>
        </div>
    );
}
