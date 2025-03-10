import React from 'react';

const Paginator = () => {
    return (
        <div className="flex gap-1 justify-end items-center mt-4 text-xs">
            <button className="px-3.5 py-1 bg-white hover:bg-green-700 hover:text-white border border-solid border-black border-opacity-20 min-w-[15px] text-black">
                Previous
            </button>
            <button className="px-3.5 py-1 bg-white hover:bg-green-700 hover:text-white border border-solid border-black border-opacity-20 min-w-[15px] text-black">
                1
            </button>
            <button className="px-3.5 py-1 bg-white hover:bg-green-700 hover:text-white border border-solid border-black border-opacity-20 min-w-[15px] text-black">
                2
            </button>
            <button className="px-3.5 py-1 bg-white hover:bg-green-700 hover:text-white border border-solid border-black border-opacity-20 min-w-[15px] text-black">
                Next
            </button>
        </div>
    );
};

export default Paginator;