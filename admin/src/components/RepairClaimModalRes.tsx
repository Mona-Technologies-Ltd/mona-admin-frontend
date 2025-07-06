'use client';

import { useState, useRef, useEffect } from 'react';
import { Paperclip } from 'lucide-react';
// import Image from 'next/image';
import toast from 'react-hot-toast';

interface RepairClaimModalResProps {
  onClose: () => void;
}

export default function RepairClaimModalRes({ onClose }: RepairClaimModalResProps) {
  const [fileName, setFileName] = useState('No file chosen');
  const modalRef = useRef(null);

  // Handle click outside modal
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !(modalRef.current as HTMLElement).contains(event.target as Node)) {
        onClose();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFileName(e.target.files[0].name);
    } else {
      setFileName('No file chosen');
    }
  };



  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(0,0,0,.6)' }}>
        <div
          onClick={(e) => e.stopPropagation()}
          ref={modalRef}
          className="w-full max-w-lg bg-white rounded shadow-lg overflow-hidden"
        >
          {/* Header */}
          <div className="bg-[#0046AD] text-white text-center py-4">
            <h2 className="text-lg font-semibold">Repair Claim Details</h2>
          </div>

          {/* Content */}
          <div className="p-6">
            <div className="mb-4">
              <p className="font-semibold">
                Claim ID: <span className="font-normal">12345678</span>
              </p>
              <p className="font-semibold">
                Created On: <span className="font-normal">2025-01-15</span>
              </p>
            </div>

            <div className="bg-gray-100 p-4 mb-6 space-y-4 text-sm rounded">
              <div>
                <p className="font-bold">Admin John Doe | 2025-01-15 | 10:30 AM</p>
                <p>Please ensure the documents are correctly uploaded</p>
              </div>
              <div>
                <p className="font-bold">Admin Jane Smith | 2025-01-15 | 11:00 AM</p>
                <p>Awaiting confirmation from the customer</p>
              </div>
            </div>

            <textarea
              className="w-full border border-gray-300 rounded p-3 text-sm mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={4}
              placeholder="Type your response here..."
            />

            <div className="flex items-center mb-6 space-x-4">
              <label className="inline-flex items-center px-4 py-2 border border-gray-300 rounded cursor-pointer hover:bg-gray-50">
                <Paperclip size={16} className="mr-2" />
                <span className="text-sm">Attach File</span>
                <input type="file" className="hidden" onChange={handleFileChange} />
              </label>
              <span className="text-sm text-gray-600 truncate">{fileName}</span>
            </div>

            <button
             onClick={() => {
    toast.success("Response submitted successfully!");
    onClose();
  }}
              className="w-full bg-[#0046AD] text-white py-3 rounded text-sm font-semibold hover:bg-blue-800 transition"
            >
              Submit Response
            </button>
          </div>
        </div>
      </div>

     
    </>
  );
}
