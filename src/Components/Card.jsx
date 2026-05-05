import React from "react";

import { useState } from "react";

function Card() {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative bg-white max-w-xs w-full p-6 border border-gray-200 rounded-lg shadow-sm">
      {/* 3 Dot Button */}
      <button
        onClick={() => setOpen(!open)}
        className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 hover:bg-gray-100 rounded-md p-1.5"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          viewBox="0 0 24 24"
        >
          <circle cx="6" cy="12" r="1"></circle>
          <circle cx="12" cy="12" r="1"></circle>
          <circle cx="18" cy="12" r="1"></circle>
        </svg>
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute right-2 top-10 bg-white border border-gray-200 rounded-md shadow-lg w-36 z-10">
          <ul className="text-sm text-gray-700">
            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
              See Details
            </li>

            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Edit</li>

            <li className="px-4 py-2 hover:bg-red-50 text-red-600 cursor-pointer">
              Delete
            </li>
          </ul>
        </div>
      )}

      {/* Profile Content */}
      <div className="flex flex-col items-center">
        <img
          className="w-24 h-24 mb-6 rounded-full object-cover"
          src="https://images.mubicdn.net/images/cast_member/1186944/cache-999998-1727433927/image-w856.jpg?size=300x"
          alt="profile"
        />

        <h5 className="text-xl font-semibold text-gray-900">Bonnie Green</h5>

        <span className="text-sm text-gray-500">Visual Designer</span>
      </div>
      {/* <!-- Buttons --> */}
      <div class="flex justify-center items-center gap-4 mt-4">
        <button class="flex items-center bg-blue-600 text-white hover:bg-blue-700 rounded-md px-4 py-2 text-sm">
          <svg
            class="w-4 h-4 mr-1.5"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M16 12h4m-2 2v-4M4 18v-1a3 3 0 013-3h4a3 3 0 013 3v1"
            />
          </svg>
          Follow
        </button>

        <button class="bg-gray-100 text-gray-700 hover:bg-gray-200 rounded-md px-4 py-2 text-sm">
          Message
        </button>
      </div>
    </div>
  );
}

export default Card;
