import { useState, useEffect } from "react";
import { Inertia } from "@inertiajs/inertia";
import { usePage } from "@inertiajs/react";

export default function UserLogin() {
    const { errors } = usePage().props;
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        Inertia.post("/user/login", { email, password });
    };

    return (
        <div className="bg-white min-h-screen">
            <div className="w-full mobile:px-0 lg:pt-4">
                <img
                    alt="Logo"
                    className="w-full mobile:w-16 mobile:py-2 mobile:px-2 mobile:mb-0 lg:w-28 lg:mb-0 lg:px-4"
                    src="http://127.0.0.1:8000/img/LOGO%20FIX%204.png"
                />
            </div>
            <div className="w-full container mx-auto px-4 mobile:px-0 mobile:pt-4 lg:px-0 lg:pt-0">
                <div className="w-full flex flex-col-reverse lg:flex-row items-center lg:justify-around lg:px-2 lg:mb-10">
                    {/* Bagian Kiri - Info dan Ilustrasi */}
                    <div className="w-full flex flex-col justify-center mobile:py-0 mobile:px-0 rounded-lg bg-white mobile:mt-8 mobile:mb-6 lg:pl-24 lg:py-0 lg:px-8">
                        <h1 className="text-3xl font-extrabold tracking-tight text-green-700 font-poppins lg:mb-2 lg:text-6xl lg:font-extrabold">
                            Selamat Datang <br />di<span className="text-red-600"> SPPku</span>
                        </h1>
                        <p className="text-black mt-2 mb-4 lg:mb-6 lg:text-xl">
                            Layanan Mudah Untuk Pembayaran Uang Sekolah Anda
                        </p>
                        {errors.email && (
                            <p className="text-red-500 mb-4">{errors.email}</p>
                        )}

                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label className="block text-black font-bold mb-2">Kode Pengguna</label>
                                <input
                                    type="email"
                                    className="w-full px-4 mobile:py-2 lg:py-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 lg:w-[80%] text-black placeholder-gray-500"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    placeholder="Masukkan Kode Pengguna"
                                />
                            </div>

                            <div className="mb-4">
                                <label className="block text-black font-bold mb-2">Kata Sandi</label>
                                <input
                                    type="password"
                                    className="w-full px-4 py-2 lg:py-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 lg:w-[80%] text-black placeholder-gray-500"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    placeholder="Masukkan Kata Sandi Anda"
                                />
                            </div>

                            <div className="flex justify-end items-center mb-6 lg:w-[80%] lg:mb-10">
                                <a className="text-sm text-green-800 p-2 hover:bg-green-600 hover:text-white hover:rounded-lg" href="/forgot/password">
                                    Lupa Kata Sandi?
                                </a>
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-green-700 text-white py-2 lg:py-4 rounded-3xl hover:bg-green-800 lg:w-[80%]"
                            >
                                Login
                            </button>
                        </form>
                    </div>

                    {/* Bagian Kanan - Form Login */}
                    <div className="w-full text-center justify-center mx-auto mobile:mb-2 mobile:w-80 lg:w-full lg:mb-4">
                        <div className="p-4 mobile:p-0 mobile:pb-2 lg:mr-4">
                            <img
                                alt="Illustration"
                                className="w-full mx-auto rounded-lg mobile:w-44 lg:w-[95%]"
                                src="http://127.0.0.1:8000/img/LoginUser.png"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

//INI YANG PALING VALIDDDDD
