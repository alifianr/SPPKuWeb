import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faFilter,
    faPlus,
    faPrint,
    faTimes,
    faChevronDown,
    faCalendarAlt,
} from "@fortawesome/free-solid-svg-icons";
import NavbarDashboard from "@/Components/NavbarDashboard";
import Header from "@/Components/Header";
import Swal from "sweetalert2";

export default function SPP() {
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedKelas, setSelectedKelas] = useState("");
    const [selectedBulan, setSelectedBulan] = useState("");
    const [selectedTahun, setSelectedTahun] = useState("");
    const [nominalPembayaran, setNominalPembayaran] = useState("");
    const [activeTab, setActiveTab] = useState(window.location.pathname);

    const kelasOptions = ["Kelas X", "Kelas XI", "Kelas XII"];
    const bulanOptions = [
        "Januari",
        "Februari",
        "Maret",
        "April",
        "Mei",
        "Juni",
        "Juli",
        "Agustus",
        "September",
        "Oktober",
        "November",
        "Desember",
    ];
    const tahunOptions = ["2023/2024", "2024/2025", "2025/2026"];

    useEffect(() => {
        setActiveTab(window.location.pathname);
    }, [window.location.pathname]);

    const handleBuatSPP = () => {
        setModalOpen(false);
        event.preventDefault();
        Swal.fire({
            title: `Tambah Tagihan SPP Berhasil Dibuat`,
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
            window.location.href = "/spp/kelola-spp";
        });
    }

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
                                <p className="px-3">Kelola SPP</p>
                            </div>
                        </button>
                    </a>

                    {/* Tombol Arsip Data */}
                    <a href="/spp/beasiswa">
                        <button
                            className="min-w-44 px-4 py-2 bg-white rounded flex items-center shadow hover:shadow-md font-bold transition-all duration-200 ease-in-out text-green-900"
                        >
                            <img src="http://127.0.0.1:8000/img/BoxArrowDown.png" alt="Data Wali Kelas" className="max-w-10 max-h-7 mr-3 " />
                            Beasiswa
                        </button>
                    </a>
                </div>

                <div className="w-full flex justify-start gap-4 justify-items-stretch mb-4 space-x-2 border-t border-black">
                    <button className="min-w-56 bg-white text-green-700 mt-4 px-4 py-2 rounded flex items-center justify-between shadow-md font-bold">
                        Filter
                        <FontAwesomeIcon icon={faFilter} className="mr-2" />
                    </button>

                    <button
                        className="min-w-56 bg-yellow-500 text-white mt-4 px-4 py-2 rounded flex items-center shadow-md"
                        onClick={() => setModalOpen(true)}
                    >
                        <FontAwesomeIcon icon={faPlus} className="mr-2" />
                        Tambah Tagihan
                    </button>

                    <button className="min-w-56 bg-white border border-green-700 font-bold text-green-800 mt-4 px-4 py-2 rounded flex items-center shadow-md">
                        <FontAwesomeIcon icon={faPrint} className="mr-2" />
                        Cetak Kelola Data
                    </button>
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
                                <label className="block text-black text-sm font-bold mb-2">Kelas</label>
                                <div className="relative">
                                    <select
                                        className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 appearance-none text-black"
                                        value={selectedKelas}
                                        onChange={(e) => setSelectedKelas(e.target.value)}
                                    >
                                        <option value="">Pilih Kelas</option>
                                        {kelasOptions.map((kelas) => (
                                            <option key={kelas} value={kelas} className="text-black">
                                                {kelas}
                                            </option>
                                        ))}
                                    </select>
                                    <FontAwesomeIcon
                                        icon={faChevronDown}
                                        className="absolute right-3 top-3 text-gray-400"
                                    />
                                </div>

                                {/* Dropdown Bulan */}
                                <label className="block text-black text-sm font-bold mt-4 mb-2">
                                    Bulan Pembayaran SPP
                                </label>
                                <div className="relative">
                                    <select
                                        className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 appearance-none text-black"
                                        value={selectedBulan}
                                        onChange={(e) => setSelectedBulan(e.target.value)}
                                    >
                                        <option value="">Pilih Bulan Pembayaran SPP</option>
                                        {bulanOptions.map((bulan) => (
                                            <option key={bulan} value={bulan} className="text-black">
                                                {bulan}
                                            </option>
                                        ))}
                                    </select>
                                    <FontAwesomeIcon
                                        icon={faChevronDown}
                                        className="absolute right-3 top-3 text-gray-400"
                                    />
                                </div>

                                {/* Dropdown Tahun Ajaran */}
                                <label className="block text-black text-sm font-bold mt-4 mb-2">
                                    Tahun Ajaran Pembayaran SPP
                                </label>
                                <div className="relative">
                                    <select
                                        className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 appearance-none text-black"
                                        value={selectedTahun}
                                        onChange={(e) => setSelectedTahun(e.target.value)}
                                    >
                                        <option value="" className="">Pilih Tahun Ajaran</option>
                                        {tahunOptions.map((tahun) => (
                                            <option key={tahun} value={tahun} className="text-black">
                                                {tahun}
                                            </option>
                                        ))}
                                    </select>
                                    <FontAwesomeIcon
                                        icon={faChevronDown}
                                        className="absolute right-3 top-3 text-gray-400"
                                    />
                                </div>

                                {/* Input Nominal Pembayaran */}
                                <label className="block text-black text-sm font-bold mt-4 mb-2">Nominal Pembayaran</label>
                                <input
                                    type="number"
                                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 placeholder:text-black text-black"
                                    placeholder="Masukan Nominal Pembayaran"
                                    value={nominalPembayaran}
                                    onChange={(e) => setNominalPembayaran(e.target.value)}
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
                                    <button className="w-full bg-green-900 font-bold text-white py-2 rounded" onClick={handleBuatSPP}>Buat</button>
                                    <button className="w-full border border-green-700 font-bold text-green-700 py-2 rounded" onClick={() => setModalOpen(false)}>Batal</button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
                <div className="w-full">
                    <div className="">
                        <img src="http://127.0.0.1:8000/img/Vector.png" alt="" className='max-w-[10%] mx-auto mt-24' />
                    </div>
                    <div className="mt-10">
                        <p className="text-center text-xl">Belum ada data yang ter-generate. Generate data sekarang!</p>
                    </div>
                </div>
            </main>
        </div>
    );
}
