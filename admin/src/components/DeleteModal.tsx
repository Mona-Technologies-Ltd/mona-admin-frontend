'use client';
// import Image from 'next/image';
import { AiOutlineQuestionCircle } from "react-icons/ai"; 

export default function DeleteModal({ onConfirm, onCancel }: { onConfirm: () => void, onCancel: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="bg-white rounded-none max-w-sm w-full shadow-xl p-6 text-center">
        {/* Icon */}
        <div className="flex justify-center mb-4">
          <div className="bg-yellow-400 w-16 h-16 flex items-center justify-center rounded-full">
            {/* <Image src="/question-icon.svg" alt="?" width={24} height={24} /> */}
            <AiOutlineQuestionCircle size={30} color="white" />
          </div>
        </div>

        {/* Title */}
        <h2 className="text-lg font-medium text-gray-900 mb-6">
          Are you sure you want to delete this video?
        </h2>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button
            onClick={onConfirm}
            className="bg-[#004AAD] hover:bg-blue-800 !text-white py-2 px-6 rounded-none w-full sm:w-auto"
          >
            Yes, delete
          </button>
          <button
            onClick={onCancel}
            className="border border-red-500 text-red-500 hover:bg-red-50 py-2 px-6 rounded-none w-full sm:w-auto"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
