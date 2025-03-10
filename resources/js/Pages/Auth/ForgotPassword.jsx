import React, { useState, useEffect, useRef } from "react";
import { Inertia } from "@inertiajs/inertia";
import { usePage } from "@inertiajs/react";
import Swal from "sweetalert2";

export default function ForgotPassword() {
    const { errors, flash } = usePage().props;

    // State untuk menyimpan email, password baru, dan konfirmasi password
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");

    // State untuk mengontrol modal
    const [showModal, setShowModal] = useState(false);

    // Ref untuk modal agar bisa digeser
    const modalRef = useRef(null);

    useEffect(() => {
        if (flash?.emailValidated) {
            setShowModal(true);
            Swal.fire({
                title: 'Email Terdaftar',
                text: flash.passwordResetSuccess,
                icon: 'success',
                confirmButtonText: 'OK'
            })
        }
    }, [flash?.emailValidated]);

    useEffect(() => {
        console.log("Flash message dari Laravel:", flash);
        if (flash?.passwordResetSuccess) {
            Swal.fire({
                title: 'Selamat! Kata Sandi Anda Berhasil diubah!',
                width: "800px",
                imageUrl: "http://127.0.0.1:8000/img/CheckCircle.png",
                imageWidth: 150,
                imageHeight: 150,
                imageAlt: "Check Icon",
                confirmButtonText: 'Masuk',
                customClass: {
                    confirmButton: "custom-confirm-button" // Tambahkan kelas kustom
                },
                allowOutsideClick: false, // Agar user tidak bisa keluar dengan klik luar
            }).then(() => {
                window.location.href = "/user/login"; // Redirect setelah SweetAlert ditutup
            });
        }
    }, [flash?.passwordResetSuccess]);

    // STEP 1: Validasi Email
    const handleValidateEmail = (e) => {
        e.preventDefault();
        Inertia.post("/forgot/password/validate-email", { email }, {
            preserveState: false,
            onSuccess: (page) => {
                if (page.props.flash?.emailValidated) {
                    setShowModal(true);
                }
            },
            onError: (errors) => {
                Swal.fire({
                    title: 'Error!',
                    text: errors.email || 'Terjadi kesalahan. Pastikan email sudah terdaftar.',
                    icon: 'error',
                    confirmButtonText: 'Coba Lagi'
                });
            }
        });
    };

    // STEP 2: Ubah Password
    const handleResetPassword = (e) => {
        e.preventDefault();
        Inertia.post("/forgot/password/reset", {
            email,
            password,
            password_confirmation: passwordConfirmation,
        }, {
            preserveState: false,
            onError: (errors) => {
                Swal.fire({
                    title: 'Error!',
                    text: errors.password || 'Terjadi kesalahan. Pastikan semua data diisi dengan benar!',
                    icon: 'error',
                    confirmButtonText: 'Coba Lagi'
                });
            }
        });
    };


    // FUNGSI UNTUK MEMBUAT MODAL BISA DIGESER
    useEffect(() => {
        const modal = modalRef.current;
        if (!modal) return;

        let isDragging = false;
        let startX, startY, initialX, initialY;

        const handleMouseDown = (e) => {
            isDragging = true;
            startX = e.clientX;
            startY = e.clientY;
            initialX = modal.offsetLeft;
            initialY = modal.offsetTop;
        };

        const handleMouseMove = (e) => {
            if (!isDragging) return;
            const deltaX = e.clientX - startX;
            const deltaY = e.clientY - startY;
            modal.style.left = `${initialX + deltaX}px`;
            modal.style.top = `${initialY + deltaY}px`;
        };

        const handleMouseUp = () => {
            isDragging = false;
        };

        modal.addEventListener("mousedown", handleMouseDown);
        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("mouseup", handleMouseUp);

        return () => {
            modal.removeEventListener("mousedown", handleMouseDown);
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mouseup", handleMouseUp);
        };
    }, [showModal]);

    return (
        <div className="bg-white flex items-center justify-center min-h-screen">
            <div className="max-w-6xl mx-auto p-6 flex flex-col md:flex-row items-center">
                {/* Bagian Ilustrasi */}
                <div className="w-full flex justify-center mobile:w-10/12 md:w-1/2 lg:w-11/12">
                    <img
                        alt="Illustration of a confused person"
                        className="w-full md:w-96 lg:w-full"
                        src="http://127.0.0.1:8000/img/ForgotPassword.png"
                    />
                </div>

                {/* Bagian Form */}
                <div className="w-full md:w-1/2 mt-6 text-center font-poppins mobile:text-start mobile:mt-2 md:mt-0 md:ml-6 md:text-left lg:w-4/5 lg:justify-center">
                    <h1 className="text-4xl font-bold text-yellow-500 mobile:text-4xl lg:text-6xl lg:leading-[1.3] lg:font-extrabold">
                        Lupa <br /> <span>Kata Sandi?</span>
                    </h1>
                    <p className="mt-4 text-gray-600 text-[18px] mobile:text-[14px]">
                        Masukkan kode pengguna yang telah terdaftar <br /> untuk mengatur ulang kata sandi anda.
                    </p>
                    {/* Error Handling */}
                    {errors.email && (
                        <p className="text-red-500 text-sm mt-2">{errors.email}</p>
                    )}
                    {/* Form Input */}
                    <form onSubmit={handleValidateEmail}>
                        <div className="mt-6">
                            <input
                                type="email"
                                className="w-[60%] p-3 mb-4 text-black border border-green-700 rounded-lg focus:ring-2 focus:ring-green-600 placeholder-text-gray-500 mobile:w-[100%] lg:w-[78%]"
                                placeholder="Masukkan kode pengguna"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>

                        {/* Tombol Aksi */}
                        <div className="w-[70%] mt-4 flex flex-col justify-center mobile:w-[100%] md:justify-start lg:w-[70%]">
                            <button
                                type="submit"
                                className="max-w-[86%] mb-2 bg-green-700 text-white px-6 py-3 rounded-lg mt-2 mobile:min-w-[100%] md:w-auto md:mt-0 md:mr-2 lg:w-full hover:bg-green-800"
                            >
                                Selanjutnya
                            </button>
                            <a
                                className="max-w-[86%] md:w-auto mb-2 bg-white text-center text-green-900 border border-green-800 px-6 py-3 rounded-lg mt-2 mobile:min-w-[100%] md:mt-0 md:mr-2 lg:w-full hover:font-bold hover:text-green-800" href="/user/login"
                            >
                                Kembali
                            </a>
                        </div>
                    </form>
                </div>
            </div>

            {/* Step 2: Modal Pop-up untuk Reset Password */}
            {showModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div ref={modalRef} className="bg-white border-2 border-green-700 rounded-lg shadow-lg w-full max-w-2xl relative mobile:w-11/12" style={{ position: "absolute", cursor: "move" }}>
                        {/* Tombol Close Modal */}
                        <div className="bg-yellow-400 p-2 flex flex-row-reverse justify-between justify-content-start items-center border-2 border-green-700 rounded-lg">
                            <button
                                onClick={() => setShowModal(false)}
                                className="text-gray-600 hover:text-white text-3xl font-bold mb-1 pr-2 hidden lg:block"
                            >
                                &times;
                            </button>

                            <h2 className="text-xl font-bold text-center text-green-900 mobile:text-lg mobile:text-white mobile:pl-2 lg:text-xl lg:pl-14">
                                Mohon ubah kata sandi untuk mengamankan akun Anda!
                            </h2>
                        </div>
                        {errors.password && (
                            <p className="text-red-500 text-center mb-2">{errors.password}</p>
                        )}

                        <form onSubmit={handleResetPassword} className="p-4">
                            {/* Email Hidden */}
                            <input type="hidden" name="email" value={email} readOnly />

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
                                <p className="text-xs mt-2 text-gray-700">Pastikan kata sandi terdiri dari minimal 8 karakter dan mengandung huruf besar, huruf kecil, dan angka.</p>
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
                                <p className="text-xs mt-2 text-gray-800">Pastikan kata sandi terdiri dari minimal 8 karakter dan mengandung huruf besar, huruf kecil, dan angka.</p>
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
        </div>
    );
}