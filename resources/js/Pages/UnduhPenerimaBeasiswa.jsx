import React, { useEffect, useState } from "react";
import '../../css/app.css';

export default function UnduhPenerimaBeasiswa() {
    const [selectedCheckboxes, setSelectedCheckboxes] = useState([]);
    const [searchNama, setSearchNama] = useState("");
    const [searchNisn, setSearchNisn] = useState("");

    // Data dummy siswa
    const siswaData = [
        { id: 0, nama: "Zahra Aurira Hanifah", nisn: "123456789", invoice: "1234567ZXV8910", bulan: "SPP Januari", nominal: "Rp. 500.000", beasiswa: "Rp. 150.000", pembayaran: "Rp. 500.000", kode: "123456", kelas: "X", kategori: "Beasiswa", status: "JFLS" },
        { id: 1, nama: "Alifia Nurhasanah", nisn: "213456789", invoice: "1234567MNO89P", bulan: "SPP Februari", nominal: "Rp. 500.000", beasiswa: "Rp 150.000", pembayaran: "Rp 400.000", kode: "213456", kelas: "X", kategori: "Beasiswa", status: "JFLS" },
        { id: 2, nama: "Alifia Nurhasanah", nisn: "312456789", invoice: "1234567OPQ89R", bulan: "SPP Februari", nominal: "Rp. 500.000", beasiswa: "Rp 150.000", pembayaran: "Rp 400.000", kode: "312456", kelas: "X", kategori: "Beasiswa", status: "JFLS" },
        { id: 3, nama: "Jara Aurira Hanifah", nisn: "412356789", invoice: "1234567STU89V", bulan: "SPP Februari", nominal: "Rp. 500.000", beasiswa: "Rp 150.000", pembayaran: "Rp 500.000", kode: "412356", kelas: "X", kategori: "Beasiswa", status: "JFLS" },
        { id: 4, nama: "Zahra Aurora Hanifah", nisn: "512346789", invoice: "1234567WXY89Z", bulan: "SPP Februari", nominal: "Rp. 500.000", beasiswa: "Rp 150.000", pembayaran: "Rp 500.000", kode: "512346", kelas: "X", kategori: "Beasiswa", status: "JFLS" },
    ];

    const isAllChecked = selectedCheckboxes.length === siswaData.length;

    const handleSelectAll = () => {
        if (selectedCheckboxes.length === siswaData.length) {
            setSelectedCheckboxes([]); // Jika semua sudah dipilih, batalkan semua
        } else {
            setSelectedCheckboxes(siswaData.map((siswa) => siswa.id)); // Pilih semua checkbox
        }
    };

    // Filter data siswa berdasarkan input
    const filteredSiswa = siswaData.filter((siswa) =>
        siswa.nama.toLowerCase().includes(searchNama.toLowerCase()) &&
        siswa.nisn.includes(searchNisn)
    );

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

    return (
        <div className="bg-primary font-sans min-h-screen px-4 py-2 text-black">
            <div className="w-full mx-auto mt-6 rounded-lg mobile:px-2 lg:px-16">
                {/* Header Sekolah */}
                <div className="flex md:flex-row items-center mb-6">
                    <img
                        alt="School Logo"
                        className="w-24 h-24 mr-4"
                        src="http://127.0.0.1:8000/img/Logo-Resmi-SMA-Negeri-8-Denpasar 2.png"
                    />
                    <div className="text-black mobile:text-left lg:text-left">
                        <h1 className="font-bold font-poppins lg:text-xl">SMA NEGERI 8 DENPASAR</h1>
                        <p className="mobile:text-xs lg:text-lg">Jl. Antasura Jl. Dan Perumahan No.25, Peguyangan Kaja, Kec. Denpasar Utara, Kota Denpasar, Bali 80238</p>
                        <p className="mobile:text-xs lg:text-lg">Telepon: (0361) 9008200</p>
                        <p className="mobile:text-xs lg:text-lg">Laman: www.SPPNusa.ac.id</p>
                    </div>
                </div>
                <hr className="border-t-2 border-black mb-6" />

                {/* Judul Bukti Pembayaran */}
                <div className="text-center mb-6 text-black">
                    <h2 className="font-bold mb-2 mobile:text-lg lg:text-3xl">
                        Daftar Data Siswa Penerima Beasiswa
                    </h2>
                </div>
                {/* Data Table */}
                < div className="w-full overflow-hidden rounded-lg" >
                    <table className="min-w-full bg-white rounded-lg overflow-hidden">
                        <thead className="rounded-full">
                            <tr className="bg-green-50 border border-gray">
                                <th className="py-2 px-4 border border-gray text-black text-center font-bold">No</th>
                                <th className="py-2 px-4 border border-gray text-black font-bold">Nama
                                </th>
                                <th className="py-2 px-4 border border-gray text-black font-bold">NISN
                                </th>
                                <th className="py-2 px-4 border border-gray text-black font-bold">Kode Akun</th>
                                <th className="py-2 px-4 border border-gray text-black font-bold">Kelas</th>
                                <th className="py-2 px-4 border border-gray text-black font-bold">Nominal Potongan Beasiswa</th>
                                <th className="py-2 px-4 border border-gray text-black font-bold">Kategori</th>
                                <th className="py-2 px-6 border border-gray text-black text-center items-center justify-center font-bold">Mitra</th>
                            </tr>

                        </thead>
                        <tbody>
                            {filteredSiswa.length > 0 ? (
                                filteredSiswa.map((siswa) => (
                                    <tr key={siswa.id} className="hover:bg-gray-100">
                                        <td className="py-2 px-4 border text-black text-center">{siswa.id + 1}</td>
                                        <td className="py-2 px-4 border text-black text-center">{siswa.nama}</td>
                                        <td className="py-2 px-4 border text-black text-center">{siswa.nisn}</td>
                                        <td className="py-2 px-4 border text-black text-center">{siswa.kode}</td>
                                        <td className="py-2 px-4 border text-black text-center">{siswa.kelas}</td>
                                        <td className="py-2 px-4 border text-black text-center">{siswa.beasiswa}</td>
                                        <td className="py-2 px-4 border text-black text-center">
                                            {siswa.kategori}</td>
                                        <td className="py-2 px-4 border text-black text-center">
                                            {siswa.status}</td>
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
                <div className="text-end py-10">Bali, 28 April 2024</div>
                {/* Tombol Kembali */}
                <a href="/spp/kelola-penerima-beasiswa">
                    <div className="text-center mx-auto w-full border border-green-800 rounded-lg py-3 mt-4 mb-3 text-lg font-bold hover:bg-green-600 hover:text-white">
                        Kembali
                    </div>
                </a>
            </div>
        </div >
    );
}
