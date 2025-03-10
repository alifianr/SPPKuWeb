import NavbarDashboard from '@/Components/NavbarDashboard';
import { useState } from 'react';
import Header from '@/Components/Header';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faDownload,
    faEdit,
    faFilter,
    faPrint,
    faTimes,
    faTrash,
} from '@fortawesome/free-solid-svg-icons';
import Paginator from '@/Components/Paginator';

export default function RiwayatBayar() {
    const [modalOpen, setModalOpen] = useState(false);
    const [modalFilter, setModalFilter] = useState(false);
    const [selectedKategori, setSelectedKategori] = useState("");
    const [selectedKelas, setSelectedKelas] = useState(""); // Simpan kelas yang dipilih

    const siswaData = [
        { id: 1, nama: "Zahra Aurira Hanifah", nisn: "123456789", kelas: "X", invoice: "1234567ZXV8910", pembayaran: "SPP Januari", nominal: "Rp. 500.000", metode: "BCA", tanggal: "24/01/2024" },
        { id: 2, nama: "Zahra Aurira Hanifah", nisn: "512346789", kelas: "X", invoice: "1234567WXY89Z", pembayaran: "SPP Mei", nominal: "Rp. 500.000", metode: "Alfamart", tanggal: "28/05/2024" },
    ];

    const handleDownload = () => {
        setModalOpen(false); // Tutup modal terlebih dahulu
        window.location.href = "/riwayat-bayar/unduh";
    };

    const handleUnduh = () => {
        window.location.href = "/riwayat-bayar/unduh-satu";
    }
    const kelasOptions = ["X", "XI", "XII"];

    const filteredSiswa = selectedKelas ? siswaData.filter(siswa => siswa.kelas === selectedKelas) : siswaData;

    return (
        <div className="bg-gray-100 font-sans flex min-h-screen">
            <NavbarDashboard />
            {/* Main Content */}
            <main className="flex-1 py-3 px-6">
                <Header />
                {/* Page Title */}
                <h1 className="text-3xl text-black font-bold mb-4">Riwayat Pembayaran</h1>
                {/* Actions */}
                <div className="max-w-52 bg-white rounded-lg border border-green-700  mb-4">
                    <button className="text-green-700 px-2 font-bold flex items-center py-1 space-x-1" onClick={() => setModalOpen(true)}>
                        <FontAwesomeIcon icon={faPrint} className="text-center text-green-700 ml-2" />
                        Cetak Riwayat Pembayaran Siswa
                    </button>
                </div>
                <div className="w-full flex gap-4 mb-4 space-x-2 border-t border-black pt-4">
                    {!selectedKelas ? (
                        <button
                            className="relative min-w-44 bg-white text-green-700 px-4 py-2 rounded flex items-center shadow-md font-bold"
                            onClick={() => setModalFilter(true)}
                        >
                            Filter
                            <FontAwesomeIcon icon={faFilter} className="absolute right-4" />
                        </button>
                    ) : (
                        <div className="flex items-center bg-white border border-gray-400 px-4 py-2 rounded-lg space-x-2">
                            <span className="text-black font-bold">Kelas {selectedKelas}</span>
                            <button onClick={() => setSelectedKelas("")}>
                                <FontAwesomeIcon icon={faTimes} className="text-white bg-green-800 rounded-full p-1" />
                            </button>
                        </div>
                    )}
                </div>
                {/* Modal Popup */}
                {modalFilter && (
                    <div className="fixed inset-0 bg-gray-300 bg-opacity-50 flex items-center justify-center z-[9999]" onClick={() => setModalFilter(false)}>
                        <div className="bg-white p-6 rounded-lg shadow-lg w-[500px] border border-gray-300 relative" onClick={(e) => e.stopPropagation()}>
                            {/* Header Modal */}
                            <div className="bg-yellow-400 p-4 rounded-t-lg flex justify-center relative">
                                <h2 className="text-lg font-bold text-white">Filter Data</h2>
                                <button onClick={() => setModalFilter(false)} className="absolute right-4 text-white text-xl">
                                    <FontAwesomeIcon icon={faTimes} />
                                </button>
                            </div>

                            {/* Form Pilihan Filter */}
                            <form className="py-4">
                                <label className="block text-black text-sm font-bold mt-4 mb-2">Kelas</label>
                                <select
                                    className="w-full px-3 py-2 border border-green-500 rounded focus:ring-2 text-black focus:ring-green-500"
                                    value={selectedKelas}
                                    onChange={(e) => setSelectedKelas(e.target.value)}
                                >
                                    <option value="">Pilih Kelas</option>
                                    {kelasOptions.map((kelas, index) => (
                                        <option key={index} value={kelas}>{kelas}</option>
                                    ))}
                                </select>

                                {/* Tombol Aksi */}
                                <div className="mt-6 space-y-2">
                                    <button type="button" className="w-full bg-green-700 text-white py-2 rounded" onClick={() => setModalFilter(false)}>
                                        Terapkan
                                    </button>
                                    <button type="button" className="w-full border border-green-700 font-bold text-green-700 py-2 rounded" onClick={() => setModalFilter(false)}>
                                        Batal
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
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

                {/* Data Table */}
                < div className="w-full overflow-hidden rounded-lg" >
                    <table className="min-w-full bg-white rounded-lg overflow-hidden">
                        <thead className="rounded-full">
                            <tr className="bg-green-50 border border-gray">
                                <th className="py-2 px-4 border border-gray text-black text-center font-bold">No</th>
                                <th className="py-2 px-4 border border-gray text-black font-bold">Nama</th>
                                <th className="py-2 px-4 border border-gray text-black font-bold">NISN</th>
                                <th className="py-2 px-4 border border-gray text-black font-bold">Kelas</th>
                                <th className="py-2 px-4 border border-gray text-black font-bold">No.Invoice</th>
                                <th className="py-2 px-4 border border-gray text-black font-bold">Pembayaran</th>
                                <th className="py-2 px-4 border border-gray text-black font-bold">Nominal Pembayaran</th>
                                <th className="py-2 px-4 border border-gray text-black font-bold">Metode Pembayaran</th>
                                <th className="py-2 px-4 border border-gray text-black font-bold">Tanggal Pembayaran</th>
                                <th className="py-2 px-4 border border-gray text-black font-bold">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredSiswa.length > 0 ? (
                                filteredSiswa.map((siswa, index) => (
                                    <tr key={siswa.id} className="hover:bg-gray-100">
                                        <td className="py-2 px-6 border text-black text-center">{index + 1}</td>
                                        <td className="min-w-52 py-2 px-4 border text-center text-black">{siswa.nama}</td>
                                        <td className="py-2 px-4 border text-center text-black">{siswa.nisn}</td>
                                        <td className="py-2 px-4 border text-center text-black">{siswa.kelas}</td>
                                        <td className="py-2 px-4 border text-center text-black">{siswa.invoice}</td>
                                        <td className="py-2 px-4 border text-center text-black">{siswa.pembayaran}</td>
                                        <td className="min-w-32 py-2 px-4 border text-center text-black">{siswa.nominal}</td>
                                        <td className="py-2 px-4 border text-center text-black">{siswa.metode}</td>
                                        <td className="py-2 px-4 border text-center text-black">{siswa.tanggal}</td>
                                        <td className="py-4 border-r space-x-2 flex justify-center">
                                            <button className="text-black text-sm text-center" onClick={handleUnduh}>
                                                <FontAwesomeIcon icon={faDownload} className="mr-1 mt-1 text-yellow-400 text-lg" />
                                                Download
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr><td colSpan="10" className="text-center py-4">Data tidak ditemukan</td></tr>
                            )}
                        </tbody>
                    </table>
                </div >
                <Paginator />
            </main >
        </div >
    );
}
