import React, { useState } from "react";
import { Inertia } from "@inertiajs/inertia";
import { Link } from "@inertiajs/react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import HeaderUser from "@/Components/HeaderUser";
import Swal from "sweetalert2";

export default function UserReview() {
    const [rating, setRating] = useState(0);

    const handleSave = () => {
        Swal.fire({
            title: "Ulasan Anda telah terkirim. Terima kasih telah berbagi pendapat Anda!",
            width: "800px",
            imageUrl: "http://127.0.0.1:8000/img/CheckCircle.png",
            imageWidth: 150,
            imageHeight: 150,
            showConfirmButton: false,
            timer: 3000, // Alert akan hilang otomatis setelah 3 detik
        });
    };

    return (
        <div className="bg-gray-100 min-h-screen font-poppins mobile:px-6 lg:px-10">
            <HeaderUser />
            <div className="p-6 w-full">
                <h1 className="text-center font-bold mt-10 mb-4 text-black font-poppins mobile:text-xl lg:text-3xl ">Terima kasih telah menggunakan SPPku!</h1>
                <p className="text-center mb-10 text-black mobile:text-md lg:text-xl">Berikan ulasan Anda untuk membantu kami meningkatkan layanan.</p>

                {/* Rating Stars */}
                <div className="flex justify-center mb-10">
                    {[1, 2, 3, 4, 5].map((star) => (
                        <FontAwesomeIcon
                            key={star}
                            icon={faStar}
                            className={`text-4xl mx-1 cursor-pointer ${star <= rating ? "text-yellow-500" : "text-gray-400"}`}
                            onClick={() => setRating(star)}
                        />
                    ))}
                </div>

                {/* Textarea Pesan */}
                <div className="mx-auto mb-4 lg:max-w-[70%]">
                    <label htmlFor="message" className="block font-bold text-black mb-5 lg:text-lg">
                        Pesan
                    </label>
                    <textarea
                        id="message"
                        rows="4"
                        className="w-full p-2 border rounded-md mb-10 text-black placeholder-gray-400"
                        placeholder="Masukkan pesan Anda (maksimal 300 kata)"
                    />
                    <Link onClick={handleSave}>
                        <div className="bg-green-700 rounded-lg flex justify-center">
                            <p
                                className="text-white py-2 px-6 rounded-md"
                            >
                                Kirim
                            </p>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    );
}
