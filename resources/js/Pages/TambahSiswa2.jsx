import React, { useState } from "react";
import { useForm, Link } from "@inertiajs/react";
import Swal from "sweetalert2";
import { CloudArrowUpIcon } from "@heroicons/react/24/solid";

export default function TambahSiswa2() {
    // Inertia Form Handling
    const { data, setData, post, processing, errors } = useForm({
        nisn: "",
        kelas: "",
        tahun_ajaran: "",
        kategori_siswa: "",
        email: "",
        no_handphone: "",
        jenis_kelamin: "",
        photo: null,
    });

    const [preview, setPreview] = useState(null);

    // Handle file input
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (!file.type.startsWith("image/")) {
                Swal.fire("Error", "Hanya file gambar yang diperbolehkan!", "error");
                return;
            }
            setData("photo", file);
            setPreview(URL.createObjectURL(file));
        }
    };

    // Drag & Drop Upload
    const handleDrop = (e) => {
        e.preventDefault();
        const file = e.dataTransfer.files[0];
        if (file && file.type.startsWith("image/")) {
            setData("photo", file);
            setPreview(URL.createObjectURL(file));
        }
    };

    // Submit Form
    const handleSubmit = (e) => {
        e.preventDefault();
        Swal.fire({
            title: "Data Siswa Berhasil Ditambahkan",
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
            window.location.href = "/siswa";
        });
    };

    return (
        <div className="w-full mx-auto bg-primary">
            <div className="w-full text-center mb-6 p-6 rounded-b-full bg-headersiswa">
                <h1 className="text-2xl font-semibold text-white">Tambah Data Siswa</h1>
            </div>
            <div className="w-3/5 mx-auto py-6">
                <div className="w-full flex justify-center space-x-6">
                    <div className="w-80 bg-gray-400 text-white font-bold py-2 text-xl px-4 rounded-lg text-center">
                        Data Pribadi
                    </div>
                    <div className="w-80 bg-green-900 text-white py-2 text-xl px-4 rounded-lg font-bold text-center">
                        Data Sekolah
                    </div>
                </div>
                <form>
                    <div className="mb-4 mt-10">
                        <label className="block text-black text-md font-bold mb-2">NISN</label>
                        <input
                            className="w-full px-3 py-2 border rounded text-black"
                            type="text"
                            placeholder="Masukkan NISN siswa"
                            value={data.nisn}
                            onChange={(e) => setData("nisn", e.target.value)}
                        />
                        {errors.nisn && <p className="text-red-500 text-xs">{errors.nisn}</p>}
                    </div>

                    <div className="mb-2">
                        <label className="block text-black text-md font-bold mb-2">Kelas</label>
                        <input
                            className="w-full px-3 py-2 border rounded text-black"
                            type="text"
                            placeholder="Masukkan kelas siswa"
                            value={data.kelas}
                            onChange={(e) => setData("kelas", e.target.value)}
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-black text-md font-bold mb-2">Tahun Ajaran</label>
                        <input
                            className="w-full px-3 py-2 border rounded text-black"
                            type="text"
                            placeholder="Masukkan tahun ajaran siswa masuk"
                            value={data.tahun_ajaran}
                            onChange={(e) => setData("tahun_ajaran", e.target.value)}
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-black text-md font-bold mb-2">Kategori Siswa</label>
                        <input
                            className="w-full px-3 py-2 border text-black rounded bg-white border border-black"
                            placeholder="Reguler"
                            type="input"
                            value={data.kategori_siswa}
                            onChange={(e) => setData("kategori_siswa", e.target.value)} readOnly
                        />
                    </div>
                    <div className="flex-row">
                        <Link href="" onClick={handleSubmit}>
                            <div className="mb-4 bg-green-900 text-lg font-bold rounded-xl text-center">
                                <button
                                    type="submit"
                                    className="text-white py-2 px-4"
                                    disabled={processing}
                                >
                                    {processing ? "Menyimpan..." : "Simpan Data"}
                                </button>
                            </div>
                        </Link>
                        <Link href="/siswa">
                            <div className="bg-white border border-green-800 rounded-xl py-2 px-4 text-black font-bold text-lg text-center">
                                Kembali
                            </div>
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}
