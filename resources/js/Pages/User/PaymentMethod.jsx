import React, { useState } from "react";
import { Link } from "@inertiajs/react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';

export default function PaymentMethod() {
    const [selectedMethod, setSelectedMethod] = useState(null);
    const [showMinimarketDropdown, setShowMinimarketDropdown] = useState(false);

    const paymentIcons = {
        "Tunai": "http://127.0.0.1:8000/img/cash.png", // Gambar Tunai
        "Transfer Virtual Account": "http://127.0.0.1:8000/img/transfer.png", // Gambar Virtual Account
        "QRIS": "http://127.0.0.1:8000/img/qris.png", // Gambar QRIS
        "Minimarket": "http://127.0.0.1:8000/img/minimarket.png", // Gambar Minimarket
        "Alfamart / Alfamidi": "http://127.0.0.1:8000/img/alfamart.png", // Gambar Alfamart
        "Indomaret": "http://127.0.0.1:8000/img/indomaret.png" // Gambar Indomaret
    };

    return (
        <div className="bg-gray-100 min-h-screen flex">
            <div className="w-full rounded-lg">
                <div className="bg-yellow-500 text-white px-4 rounded-b-3xl mobile:py-6">
                    <h1 className="font-semibold text-left mobile:ml-2 mobile:text-xl lg:ml-10 lg:text-2xl">Metode Pembayaran</h1>
                </div>
                <div className="mobile:px-6 lg:px-14">
                    <p className="mb-4 mt-4 text-lg text-black font-bold text-start mobile:py-4 lg:py-6">
                        Mohon pilih metode pembayaran Anda untuk melanjutkan proses
                    </p>

                    <div className="space-y-4">
                        {["Tunai", "Transfer Virtual Account", "QRIS"].map((method) => (
                            <div
                                key={method}
                                className={`bg-white flex items-center justify-between p-4 border rounded-lg cursor-pointer ${selectedMethod === method ? "border-green-500 bg-green-100" : ""
                                    }`}
                                onClick={() => setSelectedMethod(method)}
                            >
                                <div className="flex justify-center items-center">
                                    <img src={paymentIcons[method]} alt={method} className="w-10 h-10 object-contain" />
                                    <span className="text-black ml-4">{method}</span>
                                </div>
                                <div>
                                    <input
                                        type="radio"
                                        name="payment"
                                        className="form-radio text-green-500 self-center"
                                        checked={selectedMethod === method}
                                        readOnly
                                    />
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Opsi Minimarket (Dropdown) */}
                    <div className="bg-white border rounded-lg mt-4">
                        <div
                            className="flex items-center justify-between p-4 cursor-pointer"
                            onClick={() => setShowMinimarketDropdown(!showMinimarketDropdown)}
                        >
                            <div className="flex items-center">
                                <img src={paymentIcons["Minimarket"]} alt="Minimarket" className="w-10 h-10" />
                                <span className="text-black text-start ml-4">Minimarket</span>
                            </div>
                            <FontAwesomeIcon icon={showMinimarketDropdown ? faChevronUp : faChevronDown} className="text-black" />
                        </div>

                        {/* Dropdown Alfamart dan Indomaret */}
                        {showMinimarketDropdown && (
                            <div className="p-4 space-y-4 border-t">
                                {["Alfamart / Alfamidi", "Indomaret"].map((mini) => (
                                    <div
                                        key={mini}
                                        className={`flex items-center justify-between py-2 rounded-lg cursor-pointer ${selectedMethod === mini ? "border-green-500 bg-green-100" : ""
                                            }`}
                                        onClick={() => setSelectedMethod(mini)}
                                    >
                                        <div className="flex items-center">
                                            <img src={paymentIcons[mini]} alt={mini} className="w-10 h-10 object-contain" />
                                            <span className="text-gray-700 ml-4">{mini}</span>
                                        </div>
                                        <input
                                            type="radio"
                                            name="payment"
                                            className="form-radio text-green-500"
                                            checked={selectedMethod === mini}
                                            readOnly
                                        />
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                    {/* Tombol Aksi */}
                    <div className="flex-row w-full mt-6">
                        <Link href="/user/konfirmasi-pembayaran">
                            <div className="mb-2 bg-green-800 py-2 px-4 font-bold rounded-md">
                                <p className="text-white text-center">
                                    Konfirmasi
                                </p>
                            </div>
                        </Link>
                        <Link href="/user/proses-pembayaran">
                            <div className="bg-white border border-green-700 text-black py-2 px-4 rounded-md">
                                <p className="text-center font-bold">
                                    Kembali
                                </p>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
