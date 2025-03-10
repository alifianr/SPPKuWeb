import React, { useState } from "react";
import { useForm, Link } from "@inertiajs/react";
import Swal from "sweetalert2";
import { CloudArrowUpIcon } from "@heroicons/react/24/solid";

export default function TambahSiswa() {
    // Inertia Form Handling
    const { data, setData, post, processing, errors } = useForm({
        nama_lengkap: "",
        nama_panggilan: "",
        tempat_lahir: "",
        tanggal_lahir: "",
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

        // Validasi sederhana sebelum submit
        if (!data.nama_lengkap || !data.email || !data.no_handphone) {
            Swal.fire({
                title: "Error!",
                text: "Semua field wajib diisi!",
                icon: "error",
                confirmButtonText: "OK",
            });
            return;
        }
        Swal.fire({
            title: "Sukses!",
            text: "Data siswa berhasil ditambahkan.",
            icon: "success",
            confirmButtonText: "OK",
        });
    };

    return (
        <div className="w-full mx-auto bg-primary">
            <div className="w-full text-center mb-6 p-6 rounded-b-full bg-headersiswa">
                <h1 className="text-2xl font-semibold text-white">Tambah Data Siswa</h1>
            </div>
            <div className="w-3/5 mx-auto py-6">
                <div className="w-full flex justify-center space-x-6">
                    <div className="w-80 bg-yellow-400 text-green-800 font-bold py-2 text-xl px-4 rounded-lg text-center">
                        Data Pribadi
                    </div>
                    <div className="w-80 bg-gray-400 text-white py-2 text-xl px-4 rounded-lg font-bold text-center">
                        Data Sekolah
                    </div>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4 mt-10">
                        <label className="block text-black text-md font-bold mb-2">Nama Lengkap</label>
                        <input
                            className="w-full px-3 py-2 border rounded text-black"
                            type="text"
                            placeholder="Masukkan nama lengkap"
                            value={data.nama_lengkap}
                            onChange={(e) => setData("nama_lengkap", e.target.value)}
                        />
                        {errors.nama_lengkap && <p className="text-red-500 text-xs">{errors.nama_lengkap}</p>}
                    </div>

                    <div className="mb-4">
                        <label className="block text-black text-md font-bold mb-2">Nama Panggilan</label>
                        <input
                            className="w-full px-3 py-2 border rounded text-black"
                            type="text"
                            placeholder="Masukkan nama panggilan siswa"
                            value={data.nama_panggilan}
                            onChange={(e) => setData("nama_panggilan", e.target.value)}
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-black text-md font-bold mb-2">Tempat Lahir</label>
                        <input
                            className="w-full px-3 py-2 border rounded text-black"
                            type="text"
                            placeholder="Masukkan tempat lahir siswa"
                            value={data.tempat_lahir}
                            onChange={(e) => setData("tempat_lahir", e.target.value)}
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-black text-md font-bold mb-2">Tanggal Lahir</label>
                        <input
                            className="w-full px-3 py-2 border text-black rounded bg-white border border-black"
                            placeholder="Masukkan tanggal lahir siswa"
                            type="input"
                            value={data.tanggal_lahir}
                            onChange={(e) => setData("tanggal_lahir", e.target.value)}
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-black text-md font-bold mb-2">Email</label>
                        <input
                            className="w-full px-3 py-2 border rounded text-black"
                            type="email"
                            placeholder="Masukkan email siswa"
                            value={data.email}
                            onChange={(e) => setData("email", e.target.value)}
                        />
                        {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}
                    </div>

                    <div className="mb-4">
                        <label className="block text-md text-black font-bold mb-2">No. Handphone</label>
                        <input
                            className="w-full px-3 py-2 border rounded text-black "
                            type="text"
                            placeholder="Masukkan no. handphone siswa"
                            value={data.no_handphone}
                            onChange={(e) => setData("no_handphone", e.target.value)}
                        />
                        {errors.no_handphone && <p className="text-red-500 text-xs">{errors.no_handphone}</p>}
                    </div>

                    {/* Upload Photo */}
                    <div className="mb-4">
                        <label className="block text-black text-md font-bold mb-2">Upload Photo</label>
                        <div
                            className="border bg-white border-black rounded-lg p-6 flex justify-center items-center relative cursor-pointer"
                            onDrop={handleDrop}
                            onDragOver={(e) => e.preventDefault()}
                        >
                            <input
                                type="file"
                                accept="image/*"
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                onChange={handleFileChange}
                            />
                            {preview ? (
                                <img src={preview} alt="Preview" className="w-24 h-24 object-cover rounded-lg" />
                            ) : (
                                <div className="text-center">
                                    <img src="http://127.0.0.1:8000/img/Upload.png" alt="" className="w-20 mx-auto" />
                                    <p className="text-gray-400 mt-2">Upload Photo</p>
                                </div>
                            )}
                        </div>
                        {errors.photo && <p className="text-red-500 text-xs">{errors.photo}</p>}
                    </div>

                    <div className="mb-4">
                        <label className="block text-black text-md font-bold mb-2">Jenis Kelamin</label>
                        <div className="flex items-center space-x-6">
                            <div className="w-36 bg-white p-2 border rounded-xl">
                                <input
                                    type="radio"
                                    id="perempuan"
                                    name="jenis_kelamin"
                                    value="perempuan"
                                    className="mr-2"
                                    onChange={(e) => setData("jenis_kelamin", e.target.value)}
                                />
                                <label htmlFor="perempuan" className="text-black ml-2">Perempuan</label>
                            </div>
                            <div className="w-36 bg-white p-2 border rounded-xl">
                                <input
                                    type="radio"
                                    id="laki-laki"
                                    name="jenis_kelamin"
                                    value="laki-laki"
                                    className="mr-2"
                                    onChange={(e) => setData("jenis_kelamin", e.target.value)}
                                />
                                <label htmlFor="laki-laki" className="text-black ml-2">Laki - Laki</label>
                            </div>
                        </div>
                    </div>

                    <div className="flex-row">
                        <Link href="/siswa-tambah-sekolah">
                            <div className="mb-4 bg-green-900 text-lg font-bold rounded-xl text-center">
                                <button
                                    type="submit"
                                    className="text-white py-2 px-4"
                                    disabled={processing}
                                >
                                    {processing ? "Menyimpan..." : "Selanjutnya"}
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
