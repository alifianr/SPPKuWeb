import { useEffect } from 'react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, useForm } from '@inertiajs/react';

export default function Login({ status }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
    });

    useEffect(() => {
        return () => {
            reset('password');
        };
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        post("/admin/login"); // Menggunakan fungsi `post` dari `useForm`
    };

    return (
        <div className="flex items-center justify-center bg-white w-full">
            <div className="w-full grid items-center grid-cols-1 lg:grid-cols-3 gap-12 shadow-lg rounded-lg p-6 lg:px-24">
                {/* Left Section (Logo & Illustration) */}
                <div className="flex flex-col justify-center items-center lg:col-span-2 lg:items-start text-center lg:text-left">
                    <img
                        alt="Logo"
                        className="mb-6 w-32 lg:w-40 xl:w-20"
                        src="http://127.0.0.1:8000/img/LOGO%20FIX%204.png"
                    />
                    <h1 className="text-3xl text-center font-extrabold lg:text-5xl text-green-800 mb-6 mx-auto">
                        Hai, Admin
                    </h1>
                    <img
                        alt="Admin dashboard illustration"
                        className="w-full sm:max-w-sm lg:min-w-[88%] lg:mx-auto lg:min-h-[300px] xl:max-w-lg rounded-lg"
                        src="http://127.0.0.1:8000/img/Hero_login.png"
                    />
                </div>

                {/* Right Section (Login Form) */}
                <div className="bg-yellow-500 flex flex-col justify-center py-6 md:p-8 rounded-lg shadow-lg w-full max-w-md mx-auto min-h-[90%]">
                    <h2 className="text-xl lg:text-5xl font-bold text-white mb-10 text-center">Login</h2>

                    {status && <div className="mb-4 font-medium text-sm text-green-600">{status}</div>}

                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <InputLabel htmlFor="email" value="Email" className="text-white text-sm font-bold mb-2" />
                            <TextInput
                                id="email"
                                type="email"
                                name="email"
                                value={data.email}
                                className="w-full p-2 text-black rounded border border-gray-300 focus:outline-none focus:ring focus:ring-green-600"
                                autoComplete="username"
                                isFocused={true}
                                onChange={(e) => setData('email', e.target.value)}
                            />
                            <InputError message={errors.email} className="text-red-600 text-sm mt-1" />
                        </div>

                        <div className="mb-6">
                            <InputLabel htmlFor="password" value="Kata Sandi" className="text-white text-sm font-bold mb-2" />
                            <TextInput
                                id="password"
                                type="password"
                                name="password"
                                value={data.password}
                                className="w-full p-2 rounded border border-gray-300 focus:outline-none focus:ring focus:ring-green-600 text-black"
                                autoComplete="current-password"
                                onChange={(e) => setData('password', e.target.value)}
                            />
                            <InputError message={errors.password} className="text-red-600 text-sm mt-1" />
                        </div>
                        <div className="mb-6">
                            <h4 className="text-black">Pastikan kata sandi terdiri dari minimal 8 karakter dan mengandung huruf besar, huruf kecil, dan angka.</h4>
                        </div>

                        <div className="flex items-center justify-center">
                            <PrimaryButton
                                className="w-full bg-green-800 hover:bg-green-700 text-white font-extrabold py-2 px-4 rounded transition duration-200 focus:outline-none focus:ring focus:ring-green-600 lg:mt-10 lg:py-6"
                                disabled={processing}
                            >
                                <h1 className="text-center mx-auto">Login</h1>
                            </PrimaryButton>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
