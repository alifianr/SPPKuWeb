import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import NavbarDashboard from '@/Components/NavbarDashboard';
import {
    faEdit, faPlus,
    faArchive,
    faDownload,
    faFilter,
    faSearch,
    faPrint,
    faTimes,
} from '@fortawesome/free-solid-svg-icons';
import Paginator from '@/Components/Paginator';
import Header from '@/Components/Header';
import Swal from 'sweetalert2';

export default function Siswa() {
    // State untuk pencarian
    const [searchNama, setSearchNama] = useState("");
    const [searchNisn, setSearchNisn] = useState("");
    const [activeTab, setActiveTab] = useState(window.location.pathname);
    const [selectedCheckboxes, setSelectedCheckboxes] = useState([]);
    const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
    const [isPrintModalOpen, setIsPrintModalOpen] = useState(false);
    const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
    const [selectedKelas, setSelectedKelas] = useState("");
    const [selectedKelasPrint, setSelectedKelasPrint] = useState("");
    const [selectedKategori, setSelectedKategori] = useState("");
    const [selectedFile, setSelectedFile] = useState(null);
    const [fileError, setFileError] = useState("");

    // Fungsi menangani pemilihan file
    const handleFileChange = (event) => {
        const file = event.target.files[0];

        if (file && (file.type === "application/vnd.ms-excel" || file.type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")) {
            setSelectedFile(file);
            setFileError("");
        } else {
            setFileError("Format file tidak valid! Harap unggah file .xls atau .xlsx");
            setSelectedFile(null);
        }
    };

    // Fungsi menangani unggah file
    const handleFileUpload = () => {
        setIsUploadModalOpen(false)
        Swal.fire({
            title: `Data Siswa Berhasil Di-import!`,
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
        })
    };


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

    const handleArchiveAll = () => {
        Swal.fire({
            title: `Semua Data Siswa Berhasil Diarsipkan!`,
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
            window.location.href = "/siswa-arsip";
        });
    };

    const handleArchive = () => {
        Swal.fire({
            title: `Data Siswa Berhasil Diarsipkan!`,
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
            window.location.href = "/siswa-arsip-nama"
        });
    }
    const handlePrint = () => {
        setIsPrintModalOpen(false);
        Swal.fire({
            title: `Data Siswa Berhasil Dicetak!`,
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
            window.location.href = "/siswa-detail"
        });
    }

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

    // Fungsi membuka modal filter
    const handleFilterModal = () => {
        setIsFilterModalOpen(true);
    };

    const handlePrintModal = () => {
        setIsPrintModalOpen(true);
    };
    const handleUploadModal = () => {
        setIsUploadModalOpen(true);
    };
    const closeUploadModal = () => {
        setIsUploadModalOpen(false);
    };

    // Fungsi menutup modal filter
    const closePrintModal = () => {
        setIsPrintModalOpen(false);
    };
    const closeFilterModal = () => {
        setIsFilterModalOpen(false);
    };

    // Fungsi untuk menerapkan filter
    const applyFilter = () => {
        setIsFilterModalOpen(false);
    };

    // Fungsi untuk menghapus filter tertentu
    const removeFilter = (filterType) => {
        if (filterType === "kelas") {
            setSelectedKelas("");
        } else if (filterType === "kategori") {
            setSelectedKategori("");
        }
    };

    const kelasOptions = ["X", "XI", "XII"];
    const kategoriOptions = ["Reguler", "Beasiswa"];


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
                                : "border border-green-700 text-green-700 hover:bg-green-100"
                                }`}
                        >
                            <div className="flex items-center rounded">
                                <img src="http://127.0.0.1:8000/img/Users.png" alt="Data Wali Kelas" className="max-w-10 max-h-7 mr-3" />
                                <p className="px-3">Data Siswa</p>
                            </div>
                        </button>
                    </a>

                    {/* Tombol Arsip Data */}
                    <a href="/siswa-arsip-empty">
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
                        onClick={handleFilterModal}
                        className="min-w-56 bg-white text-green-700 mt-4 px-4 py-2 rounded flex items-center justify-between font-bold shadow hover:shadow-md"
                    >
                        {selectedKelas || selectedKategori ? (
                            <div className="flex items-center space-x-2">
                                {selectedKelas && (
                                    <span className="text-green-700 px-3 py-1 rounded-full flex items-center space-x-1">
                                        <span>{`Kelas ${selectedKelas}`}</span>
                                        <button onClick={() => removeFilter("kelas")}>
                                            <FontAwesomeIcon icon={faTimes} className="bg-green-800 p-1 rounded-full text-white text-xs" />
                                        </button>
                                    </span>
                                )}
                                {selectedKategori && (
                                    <span className="text-yellow-400 px-3 py-1 rounded-full flex items-center space-x-1">
                                        <span>{selectedKategori}</span>
                                        <button onClick={() => removeFilter("kategori")}>
                                            <FontAwesomeIcon icon={faTimes} className="bg-green-800 p-1 rounded-full text-white text-xs" />
                                        </button>
                                    </span>
                                )}
                            </div>
                        ) : (
                            <>
                                Filter
                                <FontAwesomeIcon icon={faFilter} className="ml-2" />
                            </>
                        )}
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
                    <button className="min-w-56 bg-green-800 text-white mt-4 px-4 py-2 rounded flex items-center shadow hover:shadow-md" onClick={handlePrintModal}>
                        <FontAwesomeIcon icon={faPrint} className="mr-2" />
                        Cetak Semua Data
                    </button>
                    <button className="min-w-56 bg-white border-2 border-green-700 font-bold text-green-800 mt-4 px-4 py-2 rounded flex items-center shadow hover:shadow-md" onClick={handleUploadModal}>
                        <img src="http://127.0.0.1:8000/img/FileXls.png" alt="" className="mr-3" />
                        Import Excel
                    </button>
                </div >
                {/* Modal Popup Filter */}
                {isFilterModalOpen && (
                    <div
                        className="fixed inset-0 bg-gray-300 bg-opacity-50 flex items-center justify-center z-[9999]"
                        onClick={closeFilterModal} // Klik luar modal untuk menutup
                    >
                        <div
                            className="bg-white p-6 rounded-lg shadow-lg w-[500px] border border-gray-300 relative"
                            onClick={(e) => e.stopPropagation()} // Mencegah modal tertutup jika dalam modal diklik
                        >
                            {/* Header Modal */}
                            <div className="flex justify-between items-center bg-yellow-400 p-4 rounded-t-lg">
                                <h2 className="text-lg font-bold text-white ml-32">Filtering Data Siswa</h2>
                                <button onClick={closeFilterModal}>
                                    <FontAwesomeIcon icon={faTimes} className="text-white text-xl" />
                                </button>
                            </div>

                            {/* Form Filter */}
                            <div className="w-full py-4">
                                {/* Dropdown Kelas */}
                                <label className="block text-black text-sm font-bold mb-2">
                                    Kelas:
                                </label>
                                <select
                                    className="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-green-500 text-black"
                                    value={selectedKelas}
                                    onChange={(e) => setSelectedKelas(e.target.value)}
                                >
                                    <option value="" className="text-gray-400">Semua Kelas</option>
                                    {kelasOptions.map((kelas, index) => (
                                        <option key={index} value={kelas}>
                                            {kelas}
                                        </option>
                                    ))}
                                </select>

                                {/* Dropdown Kategori */}
                                <label className="block text-black text-sm font-bold mt-4 mb-2">
                                    Kategori:
                                </label>
                                <select
                                    className="w-full px-3 py-2 border rounded focus:ring-2 text-black focus:ring-green-500"
                                    value={selectedKategori}
                                    onChange={(e) => setSelectedKategori(e.target.value)}
                                >
                                    <option value="" className="text-gray-400">Semua Kategori</option>
                                    {kategoriOptions.map((kategori, index) => (
                                        <option key={index} value={kategori} className="text-black">
                                            {kategori}
                                        </option>
                                    ))}
                                </select>

                                {/* Tombol Aksi */}
                                <div className="mt-6 space-y-2">
                                    <button
                                        onClick={applyFilter}
                                        className="w-full bg-green-700 text-white py-2 rounded"
                                    >
                                        Terapkan Filter
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
                {/* Modal Popup Print */}
                {isPrintModalOpen && (
                    <div
                        className="fixed inset-0 bg-gray-300 bg-opacity-50 flex items-center justify-center z-[9999]"
                        onClick={closePrintModal} // Klik luar modal untuk menutup
                    >
                        <div
                            className="bg-white p-6 rounded-lg shadow-lg w-[500px] border border-gray-300 relative"
                            onClick={(e) => e.stopPropagation()} // Mencegah modal tertutup jika dalam modal diklik
                        >
                            {/* Header Modal */}
                            <div className="flex justify-between items-center bg-yellow-400 p-4 rounded-t-lg">
                                <h2 className="text-lg font-bold text-white ml-32">Cetak Data Siswa</h2>
                                <button onClick={closePrintModal}>
                                    <FontAwesomeIcon icon={faTimes} className="text-white text-xl" />
                                </button>
                            </div>

                            {/* Form Filter */}
                            <div className="w-full py-4">
                                {/* Dropdown Kelas */}
                                <label className="block text-black text-sm font-bold mb-2">
                                    Kelas:
                                </label>
                                <select
                                    className="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-green-500 text-black"
                                    value={selectedKelasPrint}
                                    onChange={(e) => setSelectedKelasPrint(e.target.value)}
                                >
                                    <option value="" className="text-gray-400">Semua Kelas</option>
                                    {kelasOptions.map((kelas, index) => (
                                        <option key={index} value={kelas}>
                                            {kelas}
                                        </option>
                                    ))}
                                </select>

                                {/* Tombol Aksi */}
                                <div className="mt-6 space-y-2">
                                    <button
                                        onClick={handlePrint}
                                        className="w-full bg-green-700 text-white py-2 rounded"
                                    >
                                        Cetak
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                {/* Modal Popup Upload */}
                {/* Modal Upload File */}
                {isUploadModalOpen && (
                    <div
                        className="fixed inset-0 bg-gray-300 bg-opacity-50 flex items-center justify-center z-[9999]"
                        onClick={closeUploadModal} // Klik luar modal untuk menutup
                    >
                        <div
                            className="bg-white p-6 rounded-lg shadow-lg w-[500px] border border-gray-300 relative"
                            onClick={(e) => e.stopPropagation()} // Mencegah modal tertutup jika dalam modal diklik
                        >
                            {/* Header Modal */}
                            <div className="flex justify-between items-center bg-green-800 p-4 rounded-t-lg">
                                <h2 className="text-lg font-bold text-white">Unggah File Excel</h2>
                                <button onClick={closeUploadModal}>
                                    <FontAwesomeIcon icon={faTimes} className="text-white text-xl" />
                                </button>
                            </div>

                            {/* Konten Modal */}
                            <div className="w-full py-4 text-center">
                                {/* Drag & Drop Area */}
                                <label
                                    htmlFor="file-upload"
                                    className="border border-2 border-gray-300 rounded-lg px-4 py-2 flex items-center justify-between justify-content-center cursor-pointer hover:border-green-600"
                                >
                                    <p className="text-black">
                                        {selectedFile ? selectedFile.name : "Upload File Excel "}
                                    </p>
                                    <img src="http://127.0.0.1:8000/img/UploadSimple.png" alt="" className="w-6" />
                                    <input
                                        id="file-upload"
                                        type="file"
                                        accept=".xls,.xlsx"
                                        className="hidden"
                                        onChange={handleFileChange}
                                    />
                                </label>
                                {/* Pesan Kesalahan */}
                                <div className="text-end text-black mt-2 underline">Download Template File Excel</div>
                                {fileError && <p className="text-red-500 text-sm mt-2">{fileError}</p>}
                                {/* Tombol Aksi */}
                                <div className="mt-4 space-y-2">
                                    <button
                                        onClick={handleFileUpload}
                                        className={`w-full py-2 rounded text-white ${selectedFile ? "bg-green-700 hover:bg-green-800" : "bg-gray-400 cursor-not-allowed"}`}
                                        disabled={!selectedFile}
                                    >
                                        Unggah File
                                    </button>
                                    <button
                                        onClick={closeUploadModal}
                                        className="w-full border border-green-700 text-green-700 py-2 rounded"
                                    >
                                        Batal
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

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
                                        <td className="py-2 px-4 border text-black text-center"><p className="bg-green-800 text-white p-2 rounded-full text-xs">{siswa.kategori}</p></td>
                                        <td className="py-4 px-4 border-b border-r text-center flex items-center justify-center space-x-3">
                                            <button className="text-green-600 flex flex-col items-center">
                                                <FontAwesomeIcon icon={faEdit} className="text-lg" />
                                                <p className="text-xs text-black mt-1">Edit</p>
                                            </button>
                                            <button className="text-red-600 flex flex-col items-center" onClick={handleArchive}>
                                                <FontAwesomeIcon icon={faArchive} className="text-lg" />
                                                <p className="text-xs text-black mt-1">Arsip</p>
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
