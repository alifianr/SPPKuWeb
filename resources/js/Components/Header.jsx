import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faSearch
} from '@fortawesome/free-solid-svg-icons';
export default function Header() {
    const { props } = usePage();
    const auth = props.auth || { user: { name: "Guest" } };

    return (
        <header className="flex justify-between items-center mb-6 relative">
            <div className="w-1/3 relative mb-4">
                <input
                    className="w-full p-2 pl-6 border rounded-lg"
                    placeholder="Search..."
                    type="text"
                />
                <FontAwesomeIcon
                    icon={faSearch}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                />
            </div>
            <div className="flex items-center relative">
                <span className="mr-10 text-gray-600">{new Date().toLocaleDateString()}</span>

                {/* Avatar & Dropdown */}
                <div className="relative mr-10">
                    <button
                        className="flex items-center focus:outline-none"
                    >
                        <img
                            alt="Admin profile"
                            className="w-10 h-10 rounded-full border cursor-pointer"
                            src="http://127.0.0.1:8000/img/girl 2.png"
                        />
                        <span className="ml-2 font-medium text-gray-700">{auth.user.name}</span>
                        <i className="fas fa-chevron-down ml-2 text-gray-500"></i>
                    </button>
                </div>
            </div >
        </header >
    );
}