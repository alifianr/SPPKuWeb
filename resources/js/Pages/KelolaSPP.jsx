import NavbarDashboard from '@/Components/NavbarDashboard';
import { useRef, useEffect, useState } from 'react';
import Header from '@/Components/Header';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArchive, faCalendarAlt, faChevronDown, faFilter, faPlus, faPrint, faSearch, faTimes } from '@fortawesome/free-solid-svg-icons';
import Paginator from '@/Components/Paginator';
import '../../css/app.css';
import Swal from 'sweetalert2';

export default function KelolaSPP() {
    const [modalOpen, setModalOpen] = useState(false);
    const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
    const [isDownloadModalOpen, setIsDownloadModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedStatus, setSelectedStatus] = useState("");
    const [activeTab, setActiveTab] = useState(window.location.pathname);
    const [selectedKelas, setSelectedKelas] = useState("");
    const [selectedBulan, setSelectedBulan] = useState("");
    const [selectedTahun, setSelectedTahun] = useState("");
    const [nominalPembayaran, setNominalPembayaran] = useState("");
    const [searchNama, setSearchNama] = useState("");
    const [searchNisn, setSearchNisn] = useState("");
    const tableContainerRef = useRef(null);
    const scrollThumbRef = useRef(null);
    const scrollbarRef = useRef(null);
    const [selectedKategori, setSelectedKategori] = useState("");
    const [thumbWidth, setThumbWidth] = useState("20%");

    // Data siswa
    const siswaData = [
        { No: 1, nama: "Zahra Aurira Hanifah", NISN: "123456789", kode: "123456", invoice: "1234567ZXV8910", bulan: "SPP Januari", kelas: "X", spp: "Rp 500.000", beasiswa: "Rp 0", spp: "Rp 500.000", pembayaran: "Rp 500.000", kategori: "Reguler", status: "Belum Lunas" },
        { No: 2, nama: "Alifia Nurhasanah", NISN: "213456789", kode: "213456", invoice: "1234567MNO89P", bulan: "SPP Januari", kelas: "X", spp: "Rp 500.000", beasiswa: "Rp 100.000", spp: "Rp 500.000", pembayaran: "Rp 400.000", kategori: "Beasiswa", status: "Lunas" },
        { No: 3, nama: "Alifia Nurhasanah", NISN: "312456789", kode: "312456", invoice: "1234567OPQ89R", bulan: "SPP Januari", kelas: "X", spp: "Rp 500.000", beasiswa: "Rp 100.000", spp: "Rp 500.000", pembayaran: "Rp 400.000", kategori: "Beasiswa", status: "Lunas" },
        { No: 4, nama: "Zahra Aurira Hanifah", NISN: "412356789", kode: "412456", invoice: "1234567STU89V", bulan: "SPP Januari", kelas: "X", spp: "Rp 500.000", beasiswa: "Rp 0", spp: "Rp 500.000", pembayaran: "Rp 500.000", kategori: "Reguler", status: "Belum Lunas" },
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

    const handleCash = () => {
        Swal.fire({
            title: `Apakah Anda yakin siswa yang bernama Zahra Aurira Hanifah dari kelas X telah membayar SPP secara tunai sebesar Rp 500.000?`,
            width: "1000px",
            imageUrl: "http://127.0.0.1:8000/img/transaksi.png",
            imageWidth: 150,
            imageHeight: 150,
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
        }).then(() => {
            window.location.href = "/spp/kelola-spp-lunas-satu";
        });

    };

    const handleFilterModal = () => {
        setIsFilterModalOpen(true);
    };

    const closeFilterModal = () => {
        setIsFilterModalOpen(false);
    };
    const handleDownloadModal = () => {
        setIsDownloadModalOpen(true);
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

    // Opsi untuk filter dropdown
    const statusOptions = ["Lunas", "Menunggu Pembayaran", "Belum Lunas"];
    const kategoriOptions = ["Reguler", "Beasiswa"];
    const kelasOptions = ["X", "XI", "XII"];
    const tahunOptions = ["2021/2022", "2022/2023", "2023/2024"];
    const bulanOptions = [
        "Januari", "Februari", "Maret", "April", "Mei", "Juni",
        "Juli", "Agustus", "September", "Oktober", "November", "Desember"
    ];

    const [selectedFilters, setSelectedFilters] = useState({
        status: "",
        kategori: "",
    });

    // Fungsi untuk menangani perubahan filter
    const handleFilterChange = (type, value) => {
        setSelectedFilters((prevFilters) => ({
            ...prevFilters,
            [type]: value,
        }));
    };

    // Fungsi untuk menghapus filter tertentu
    const removeFilter = (type) => {
        setSelectedFilters((prevFilters) => ({
            ...prevFilters,
            [type]: "",
        }));
    };

    // Filter data berdasarkan filter yang dipilih
    const filterSiswa = siswaData.filter((siswa) => {
        return (
            // Filter Nama (Jika input pencarian tidak kosong, cocokkan dengan nama siswa)
            (!searchNama || siswa.nama.toLowerCase().includes(searchNama.toLowerCase())) &&
            // Filter NISN (Jika input pencarian tidak kosong, cocokkan dengan NISN siswa)
            (!searchNisn || siswa.NISN.includes(searchNisn)) &&
            // Filter Status (Jika filter status tidak kosong, cocokkan dengan status siswa)
            (!selectedFilters.status || siswa.status === selectedFilters.status) &&
            // Filter Kategori (Jika filter kategori tidak kosong, cocokkan dengan kategori siswa)
            (!selectedFilters.kategori || siswa.kategori === selectedFilters.kategori)
        );
    });

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
                    <a href="/spp/kelola-beasiswa">
                        <button
                            className="min-w-44 px-4 py-2 bg-white rounded flex items-center shadow hover:shadow-md font-bold transition-all duration-200 ease-in-out text-green-900"
                        >
                            <img src="http://127.0.0.1:8000/img/BoxArrowDown.png" alt="Data Wali Kelas" className="max-w-10 max-h-7 mr-3 " />
                            Beasiswa
                        </button>
                    </a>
                </div>

                <div className="flex space-x-6 mb-6 mt-4 border-t-2">
                    <button
                        className="min-w-56 bg-white text-green-800 font-bold mt-4 px-4 py-3 rounded flex items-center shadow hover:shadow-md justify-between" onClick={handleFilterModal}
                    >
                        Filter
                        <FontAwesomeIcon icon={faFilter} className="mr-2" />
                    </button>
                    <button className="min-w-56 bg-yellow-500 text-white mt-4 px-4 py-2 rounded flex items-center shadow hover:shadow-md" onClick={() => setModalOpen(true)}>
                        <FontAwesomeIcon icon={faPlus} className="mr-4" />
                        Tambah Tagihan
                    </button>
                    <button className="min-w-56 bg-white text-green-800 mt-4 px-4 py-2 rounded flex items-center shadow hover:shadow-md">
                        <FontAwesomeIcon icon={faPrint} className="mr-4" />
                        Cetak Kelola SPP
                    </button>
                </div>
                {/* Hasil Filter yang Dipilih */}
                <div className="flex flex-wrap gap-3 my-4">
                    {selectedFilters.status && (
                        <div className="min-w-28 flex items-center bg-white font-bold text-black px-4 py-1 rounded-lg border border-green-900 shadow-md">
                            {selectedFilters.status}
                            <button
                                onClick={() => removeFilter("status")}
                                className="ml-4 text-green-900 hover:text-red-500 mx-auto"
                            >
                                <FontAwesomeIcon icon={faTimes} />
                            </button>
                        </div>
                    )}
                    {selectedFilters.kategori && (
                        <div className="min-w-28 flex items-center bg-white font-bold text-black px-4 py-1 rounded-lg border border-yellow-500 shadow-md">
                            {selectedFilters.kategori}
                            <button
                                onClick={() => removeFilter("kategori")}
                                className="ml-2 text-yellow-900 hover:text-red-500"
                            >
                                <FontAwesomeIcon icon={faTimes} />
                            </button>
                        </div>
                    )}
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
                            <label className="block text-black text-sm font-bold mb-2">Status Pembayaran:</label>
                            <div className="flex flex-col space-y-2">
                                {statusOptions.map((status, index) => (
                                    <label key={index} className="flex justify-between items-center border border-green-500 rounded-xl px-4 py-2 cursor-pointer text-black">
                                        {status}
                                        <input
                                            type="radio"
                                            name="status"
                                            value={status}
                                            checked={selectedFilters.status === status}
                                            onChange={() => handleFilterChange("status", status)}
                                            className="form-radio text-green-500"
                                        />
                                    </label>
                                ))}
                            </div>

                            {/* Kategori */}
                            <label className="block text-black text-sm font-bold mt-4 mb-2">Kategori:</label>
                            <select
                                className="w-full px-3 py-2 border border-green-500 rounded focus:ring-2 text-black focus:ring-green-500"
                                value={selectedFilters.kategori}
                                onChange={(e) => handleFilterChange("kategori", e.target.value)}
                            >
                                <option value="">Pilih Kategori</option>
                                {kategoriOptions.map((kategori, index) => (
                                    <option key={index} value={kategori}>{kategori}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                )}
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
                            <tbody className="border border-black">
                                {filterSiswa.length > 0 ? (
                                    filterSiswa.map((siswa) => (
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
                                            <td className="py-3 px-5 text-center text-black flex items-center">
                                                <button className="text-black rounded mr-2" onClick={handleCash}>
                                                    <img src="http://127.0.0.1:8000/img/Money.png" alt="" className="mx-auto" />
                                                    Tunai
                                                </button>
                                                <button className="text-yellow-400 rounded mr-2" onClick={handleDownloadModal}>
                                                    <img src="http://127.0.0.1:8000/img/Download.png" alt="" className="mx-auto" />
                                                    <span className="text-black">Download</span>
                                                </button>
                                                <button className="text-black rounded" onClick={handleEditModal}>
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
