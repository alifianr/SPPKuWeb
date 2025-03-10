import React, { useState, useRef, useEffect } from "react";
import { Link, usePage } from "@inertiajs/react";
import { faCalendarAlt, faEdit, faIdCard, faKey, faList, faUser, faUserTag, faVenus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Inertia } from "@inertiajs/inertia";
import Swal from "sweetalert2";

export default function ProfileUser() {
    const { user } = usePage().props;
    const [showModal, setShowModal] = useState(false);
    const [password, setPassword] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");
    const modalRef = useRef(null);

    // Fungsi untuk menangani reset password
    const handleResetPassword = (e) => {
        e.preventDefault();

        if (password.length < 8) {
            Swal.fire({
                title: "Gagal!",
                text: "Kata sandi minimal 8 karakter.",
                icon: "error",
                confirmButtonText: "OK",
            });
            return;
        }

        if (password !== passwordConfirmation) {
            Swal.fire({
                title: "Gagal!",
                text: "Kata sandi tidak cocok!",
                icon: "error",
                confirmButtonText: "OK",
            });
            return;
        }

        Swal.fire({
            text: "Kata Sandi Anda Berhasil diubah.",
            width: "800px",
            imageUrl: "http://127.0.0.1:8000/img/CheckCircle.png",
            imageWidth: 150,
            imageHeight: 150,
            showConfirmButton: false,
            timer: 3000, // Alert akan hilang otomatis setelah 3 detik
        });

        setShowModal(false);
        setPassword("");
        setPasswordConfirmation("");
    };

    // Fungsi untuk menutup modal saat klik di luar modal
    useEffect(() => {
        function handleClickOutside(event) {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                setShowModal(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    // State untuk data yang bisa diedit
    const [formData, setFormData] = useState({
        email: "",
        phone: "",
        password: "",
    });

    // Fungsi untuk menangani perubahan input
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    // Fungsi untuk menyimpan perubahan
    const handleSave = () => {
        Swal.fire({
            text: "Profile Anda Telah Berhasil Diperbarui!",
            width: "800px",
            imageUrl: "http://127.0.0.1:8000/img/CheckCircle.png",
            imageWidth: 150,
            imageHeight: 150,
            showConfirmButton: false,
            timer: 3000, // Alert akan hilang otomatis setelah 3 detik
        });
    };

    return (
        <div className="bg-pink-50 min-h-screen items-center justify-center lg:px-4">
            {/* Header */}
            <div className="bg-green-900 text-white text-center py-4 rounded-b-3xl">
                <h1 className="text-xl font-semibold">Profile</h1>
            </div>
            <div className="mt-10 mx-auto pb-20 mobile:w-full mobile:px-4 lg:w-[50%]">
                {/* Foto & Informasi Utama */}
                <div className="text-center bg-white p-6 shadow-lg rounded-lg">
                    <img alt="Profile" className="w-24 h-24 rounded-full mx-auto" src={user.profile_pic} />
                    <h2 className="font-bold text-black mt-6 mobile:text-xl lg:text-3xl">{user.student_name}</h2>
                    <div className="flex justify-center items-center mt-4">
                        <span className="w-32 bg-red-500 text-white px-3 py-1 rounded-full mobile:text-[10px] lg:text-sm">{user.student_class}</span>
                        <span className="w-32 bg-green-500 text-white px-3 py-1 rounded-full ml-2 mobile:text-[10px] lg:text-sm">2021</span>
                    </div>
                    <p className="text-black mt-8 font-bold mobile:text-md lg:text-xl">Wali Kelas</p>
                    <p className="text-gray-400">{user.wali_kelas}</p>
                </div>
                {/* Detail Informasi */}
                <div className="mt-6 space-y-2">
                    {[
                        { icon: faUser, label: "Nama Lengkap", value: user.student_name },
                        { icon: faUserTag, label: "Nama Panggilan", value: user.student_nickname },
                        { icon: faCalendarAlt, label: "TTL", value: `${user.birth_place}, ${user.birth_date}` },
                        { icon: faVenus, label: "Jenis Kelamin", value: user.gender },
                        { icon: faIdCard, label: "NISN", value: user.student_nisn },
                        { icon: faKey, label: "Kode Akun", value: user.account_code },
                        { icon: faList, label: "Kategori", value: user.student_category },
                    ].map((item, index) => (
                        <div key={index} className="flex items-center space-x-4">
                            <FontAwesomeIcon icon={item.icon} className="text-yellow-500 text-lg w-6" />
                            <p className="text-gray-800 min-w-[130px] font-semibold mobile:text-[14px] lg:text-lg">{item.label}</p>
                            <p className="text-gray-900 mobile:text-[14px] lg:text-lg">: {item.value}</p>
                        </div>
                    ))}
                </div>
                {/* Form Edit */}
                <div className="mt-6">
                    {/* Email & No HP dengan Placeholder */}
                    {[
                        { label: "Email", name: "email", type: "email", placeholder: user.email },
                        { label: "No. Handphone", name: "phone", type: "text", placeholder: user.phone },
                    ].map((field, index) => (
                        <div key={index} className="mb-4">
                            <label className="block text-black font-bold">{field.label}</label>
                            <div className="relative">
                                <input
                                    className="w-full px-4 py-2 border rounded-lg text-black focus:ring-2 focus:ring-green-500"
                                    type={field.type}
                                    name={field.name}
                                    placeholder={field.placeholder || ""}
                                    value={formData[field.name]}
                                    onChange={handleChange}
                                />
                                <FontAwesomeIcon icon={faEdit} className="absolute right-3 top-3 text-green-500" />
                            </div>
                        </div>
                    ))}
                    <div className="mb-4">
                        <label className="block text-black font-bold">Kata Sandi</label>
                        <div className="relative bg-white border rounded-lg focus:ring-2 focus:ring-green-500">
                            <button
                                className="w-full px-4 py-2 text-left"
                                onClick={() => setShowModal(true)}
                            >
                                Ubah Kata Sandi
                            </button>
                            <FontAwesomeIcon icon={faEdit} className="absolute right-3 top-3 text-green-500" />
                        </div>
                    </div>
                </div>
                {/* MODAL UBAH KATA SANDI */}
                {showModal && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                        <div ref={modalRef} className="bg-white rounded-lg shadow-lg w-full max-w-2xl relative">
                            {/* Header Modal */}
                            <div className="bg-yellow-400 p-2 flex flex-row-reverse justify-between items-center border-2 border-green-700 rounded-lg">
                                <button
                                    onClick={() => setShowModal(false)}
                                    className="text-gray-600 hover:text-white text-3xl font-bold pr-2"
                                >
                                    &times;
                                </button>
                                <h2 className="text-xl font-bold text-center ml-12 text-green-900">
                                    Mohon ubah kata sandi untuk mengamankan akun Anda!
                                </h2>
                            </div>

                            {/* Form Reset Password */}
                            <form onSubmit={handleResetPassword} className="p-4">
                                <div className="mb-4">
                                    <label className="block mb-1 font-semibold text-black">Kata Sandi Baru</label>
                                    <input
                                        type="password"
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 text-black placeholder-gray-500"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                        placeholder="Masukkan Kata Sandi Baru Anda"
                                    />
                                    <p className="text-xs mt-2 text-gray-700">
                                        Pastikan kata sandi minimal 8 karakter, mengandung huruf besar, kecil, dan angka.
                                    </p>
                                </div>

                                <div className="mb-8">
                                    <label className="block mb-1 font-semibold text-black">Konfirmasi Kata Sandi Baru</label>
                                    <input
                                        type="password"
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 text-black placeholder-gray-500"
                                        value={passwordConfirmation}
                                        onChange={(e) => setPasswordConfirmation(e.target.value)}
                                        required
                                        placeholder="Konfirmasi Kata Sandi Baru Anda"
                                    />
                                    <p className="text-xs mt-2 text-gray-800">
                                        Pastikan kata sandi minimal 8 karakter, mengandung huruf besar, kecil, dan angka.
                                    </p>
                                </div>

                                <button
                                    type="submit"
                                    className="w-full bg-green-900 text-white font-extrabold text-lg px-6 py-3 rounded-lg hover:bg-green-800"
                                >
                                    Ubah Kata Sandi
                                </button>
                            </form>
                        </div>
                    </div>
                )}
                {/* Tombol Simpan & Kembali */}
                <div className="flex-row mt-6 font-bold">
                    <Link onClick={handleSave}>
                        <div className="bg-green-900 text-white text-center px-4 py-2 rounded-lg">
                            Simpan Perubahan
                        </div>
                    </Link>
                    <Link href="/user/dashboard">
                        <div className="border-2 border-green-800 text-black mt-4 text-center px-4 py-2 rounded-lg">Kembali
                        </div>
                    </Link>

                </div>
            </div>
        </div >
    );
}
