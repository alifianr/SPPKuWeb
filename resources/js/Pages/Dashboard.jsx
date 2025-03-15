import Navbar from '@/Components/NavbarDashboard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faUsers, faBell,
    faMoneyBill,
    faMoneyBill1Wave,
    faComment
} from '@fortawesome/free-solid-svg-icons';
import Header from '@/Components/Header';

export default function Dashboard({ auth }) {
    return (
        <div className="bg-gray-100 font-sans flex min-h-screen">
            <Navbar />
            {/* Main Content */}
            <main className="w-4/5 py-3 px-6">
                <Header />
                {/* Welcome Message */}
                <div className="flex mb-4">
                    <div className="w-2/3 p-6 bg-white rounded-lg shadow-lg">
                        <div className="grid grid-cols-2 justify-center items-center justify-content-center">
                            <div className="mx-auto pt-8">
                                <img
                                    alt="Dashboard illustration"
                                    className="w-72 rounded-lg"
                                    src="http://127.0.0.1:8000/img/admin_dashboard.png"
                                />
                            </div>
                            <div>
                                <h2 className="text-5xl font-bold text-green-800 mt-20 mb-6">Hello, {auth.user.name}!</h2>
                                <p className="text-black">Apa rencanamu hari ini? <br></br> Jangan lupa untuk periksa notifikasimu lagi, ya!</p>
                            </div>
                        </div>
                    </div>

                    {/* Notifications */}
                    <div className="w-1/3 ml-6">
                        <div className="flex">
                            <div>
                                <FontAwesomeIcon icon={faBell} className="text-gray-700 text-2xl mr-2" />
                            </div>
                            <div>
                                <h2 className="text-xl text-black font-bold mb-4">Notification</h2>
                            </div>
                        </div>
                        <div className="space-y-4 text-black">
                            {[
                                { notif: "Zahra baru saja melakukan pembayaran SPP Bulan April 2024.", icon: faMoneyBill, image: "http://127.0.0.1:8000/img/Wallet.png", },
                                { notif: "Zahra baru saja mengunggah pembayaran SPP 3 bulan secara tunai.", icon: faMoneyBill1Wave, image: "http://127.0.0.1:8000/img/dolar.png", },
                                { notif: "Zahra baru saja memberikan ulasan terhadap website SPPku.", icon: faComment, image: "http://127.0.0.1:8000/img/message.png", },
                                { notif: "Zahra baru saja memberikan ulasan terhadap website SPPku.", icon: faComment, image: "http://127.0.0.1:8000/img/message.png", },
                            ].map((notif, index) => (
                                <div key={index} className="p-4 bg-yellow-400 rounded-lg shadow-lg flex items-center">
                                    <div className="bg-white p-2 rounded-md">
                                        <img src={notif.image} alt="" />
                                    </div>
                                    <h3 className="ml-5">{notif.notif}</h3>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Informasi Bulan Ini */}
                <h2 className="text-2xl font-bold mb-4 text-black">Informasi Bulan ini</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[
                        { label: 'Siswa Terdaftar', value: '1.200', color: 'bg-green-700' },
                        { label: 'Siswa Belum Membayar SPP', value: '300', color: 'bg-green-700' },
                        { label: 'Siswa Sudah Membayar SPP', value: '900', color: 'bg-green-700' },
                    ].map((info, index) => (
                        <div key={index} className={`${info.color} p-6 text-white rounded-lg shadow-lg flex items-center`}>
                            <img src="http://127.0.0.1:8000/img/Users-yellow.png" alt="" className="w-16" />
                            <div className="ml-4">
                                <h3 className="text-3xl font-bold">{info.value}</h3>
                                <p>{info.label}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
}