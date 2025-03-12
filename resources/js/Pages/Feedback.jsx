import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faStar, faTrash, faComments, faCalendarAlt, faComment, faCommentAlt } from '@fortawesome/free-solid-svg-icons';
import NavbarDashboard from '@/Components/NavbarDashboard';
import Header from '@/Components/Header';
import Paginator from '@/Components/Paginator';
import Swal from 'sweetalert2';

export default function Feedback() {
    const [search, setSearch] = useState("");

    // Data dummy feedback (bisa diganti dengan data dari backend)
    const feedbackData = [
        { id: 1, name: "Zahra Aurira Hanifah", rating: 5, message: "Saya sangat menyukai website ini, karena mudah digunakan" },
        { id: 2, name: "Alifa Nurhasanah", rating: 5, message: "Saya sangat senang dengan website ini, memudahkan pembayaran" },
        { id: 3, name: "Alifa Nurhasanah", rating: 5, message: "Menurut saya website ini menarik dan inovatif" },
        { id: 4, name: "Zahra Aurira Hanifah", rating: 3.5, message: "Baru mencoba, jadi kasih bintang 3 dulu" },
        { id: 5, name: "Zahra Aurira Hanifah", rating: 5, message: "Tampilannya menarik dan user-friendly" }
    ];

    // Fungsi untuk menampilkan bintang sesuai rating
    const renderStars = (rating) => {
        const stars = [];
        for (let i = 0; i < Math.floor(rating); i++) {
            stars.push(<FontAwesomeIcon key={i} icon={faStar} className="text-yellow-500" />);
        }
        if (rating % 1 !== 0) {
            stars.push(<FontAwesomeIcon key="half" icon="fa-star-half-alt" className="text-yellow-500" />);
        }
        return stars;
    };

    const handleHapus = () => {
        Swal.fire({
            title: `Feedback User Berhasil Dihapus!`,
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
        });
    }

    return (
        <div className="bg-gray-100 font-sans flex min-h-screen">
            <NavbarDashboard />
            <main className="flex-1 p-6">
                <Header />
                {/* Page Title */}
                <h1 className="text-3xl text-black font-bold mb-4">Record Feedback User</h1>

                {/* Statistik */}
                <div className="flex items-center space-x-4 mb-6">
                    <div className="flex items-center space-x-1 text-yellow-500">
                        <FontAwesomeIcon icon={faStar} />
                        <span className="font-semibold text-black">4,8/5</span>
                    </div>
                    <div className="flex items-center space-x-1 text-yellow-400">
                        <FontAwesomeIcon icon={faCommentAlt} />
                        <span className="font-semibold text-black">300 Ulasan</span>
                    </div>
                </div>

                <hr className="mb-6" />

                {/* Search Input */}
                <div className="relative mb-6">
                    <input
                        className="pl-10 pr-4 py-2 rounded-full shadow-md text-black focus:outline-none w-1/4 placeholder-gray-400"
                        placeholder="Search..."
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <FontAwesomeIcon icon={faSearch} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                </div>

                {/* Data Table */}
                <div className="bg-white shadow-md rounded-lg overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-center text-xs font-bold text-black uppercase tracking-wider">No</th>
                                <th className="px-6 py-3 text-center text-xs font-bold text-black uppercase tracking-wider">Nama</th>
                                <th className="px-6 py-3 text-center text-xs font-bold text-black uppercase tracking-wider">Penilaian</th>
                                <th className="px-6 py-3 text-center text-xs font-bold text-black uppercase tracking-wider">Pesan</th>
                                <th className="px-6 py-3 text-center text-xs font-bold text-black uppercase tracking-wider">Action</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {feedbackData
                                .filter((feedback) => feedback.name.toLowerCase().includes(search.toLowerCase()))
                                .map((feedback, index) => (
                                    <tr key={feedback.id} className="hover:bg-gray-100">
                                        <td className="px-6 py-4 whitespace-nowrap text-center text-black">{index + 1}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-center text-black">{feedback.name}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-center">
                                            <div className="flex justify-center items-center">{renderStars(feedback.rating)}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-center text-black">{feedback.message}</td>
                                        <td className="px-6 py-4 text-center">
                                            <button className="text-red-500 hover:text-red-700" onClick={handleHapus}>
                                                <img src="http://127.0.0.1:8000/img/delete.png" alt="" className="mx-auto" />
                                                Hapus
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                </div>
                <Paginator />
            </main>
        </div>
    );
}
