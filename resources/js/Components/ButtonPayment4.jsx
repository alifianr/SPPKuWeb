import { React, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload, faFileAlt, faHourglassHalf } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";

export default function ButtonPayment3() {
    const [activeTab, setActiveTab] = useState(window.location.pathname);

    const downloadAlert = () => {
        Swal.fire({
            title: "Bukti Semua Pembayaran SPP Berhasil diunduh!",
            width: "800px",
            imageUrl: "http://127.0.0.1:8000/img/CheckCircle.png",
            imageWidth: 150,
            imageHeight: 150,
            confirmButtonText: "OK",
            customClass: {
                confirmButton: "custom-confirm-button"
            },
        }).then(() => {
            window.location.href = "/user/download-payment-finish";
        });
    };

    return (
        <div className="w-full mb-6">
            {/* Container Responsive */}
            <div className="flex flex-col mobile:flex-row sm:items-center sm:justify-between space-y-4 mobile:space-y-0">
                {/* Navigasi Pembayaran */}
                <div className="flex flex-col sm:flex-row items-center space-y-2 mobile:space-y-2 sm:space-x-4 w-full sm:w-auto">
                    <a
                        href="/user/pembayaran-lunas"
                        className={`text-center py-2 font-bold w-full sm:w-auto mobile:rounded-lg mobile:text-[11px] mobile:px-2 lg:text-lg lg:px-6 lg:rounded-full ${activeTab === "/user/pembayaran-lunas"
                            ? "bg-green-700 text-white"
                            : "border border-green-700 text-green-700 hover:outline hover:outline-2 hover:outline-green-900"
                            }`}
                        onClick={() => setActiveTab("/user/pembayaran-lunas")}
                    >
                        <FontAwesomeIcon icon={faFileAlt} className="mr-2" /> Semua Pembayaran SPP
                    </a>
                    <a
                        href="/user/pembayaran-lunas/menunggu"
                        className={`text-center py-2 font-bold w-full sm:w-auto mobile:rounded-lg mobile:text-[11px] mobile:px-2 lg:text-lg lg:px-6 lg:rounded-full ${activeTab === "/user/pembayaran-lunas/menunggu"
                            ? "bg-green-700 text-white"
                            : "border border-green-700 text-green-700 hover:outline hover:outline-2 hover:outline-green-900"
                            }`}
                        onClick={() => setActiveTab("/user/pembayaran-lunas/menunggu")}
                    >
                        <FontAwesomeIcon icon={faHourglassHalf} className="mr-2" /> Menunggu Pembayaran
                    </a>
                </div>

                {/* Tombol Download */}
                <div className="w-full sm:w-auto flex justify-center mobile:justify-end">
                    <div>
                        <button onClick={downloadAlert} className="bg-green-700 text-white px-6 py-2 rounded-lg flex items-center w-full mobile:w-auto mobile:text-[11px] lg:text-lg">
                            <FontAwesomeIcon icon={faDownload} className="mr-2" /> Download
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
