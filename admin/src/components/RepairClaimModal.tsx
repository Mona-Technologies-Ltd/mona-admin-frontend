// components/RepairClaimModal.tsx
"use client";

import React,{useEffect, useRef, useState} from "react";
import { X } from "lucide-react";
import { Button } from "./ui/button";
import RepairClaimModalRes from "./RepairClaimModalRes";
import VideoModal from "./VideoModal";
import ReviewCard from "./ReviewCard";
import TrackProgressModal from "./TrackProgressModal";

interface RepairClaimModalProps {
  isOpen: boolean;
  onClose: () => void;
}
export interface Claim {
  id: number;
  claimId: string;
  deviceModel: string;
  brand: string;
  imei: string;
  amount: string;
  status: string;
  insurer: string;
  date: string; // Consider `Date` type if you parse it later
  category: string; // 'all' | 'pending' | 'uncategorized' | 'approved' | 'completed' | 'rejected'
  createdAt: string; // Or Date if parsed
}
const claim: Claim = {
  id: 1,
  claimId: "CLM-2025-0001",
  deviceModel: "Galaxy S22",
  brand: "Samsung",
  imei: "356789123456789",
  amount: "₦100,000",
  status: "Premium",
  insurer: "AXA Mansard",
  date: "2025-01-15",
  category: "approved",
  createdAt: "2025-01-15T10:30:00Z",
};

const RepairClaimModal: React.FC<RepairClaimModalProps> = ({ isOpen, onClose }) => {
      const [showResponseModal, setShowResponseModal] = useState(false);
      const [showVideoModal, setShowVideoModal] = useState(false);
const [showTrackModal, setShowTrackModal] = useState(false);

  // const modalRef = useRef(null);
  const modalRef = useRef<HTMLDivElement>(null);

//     // Click outside modal to close
//   useEffect(() => {
//     // const handleClickOutside = (event: MouseEvent) => {
//     //   if (modalRef.current && !(modalRef.current as any).contains(event.target)) {
//     //     onClose();
//     //   }
//     // };
// const handleClickOutside = (event: MouseEvent) => {
//   if (
//     modalRef.current &&
//     event.target instanceof Node &&
//     !modalRef.current.contains(event.target)
//   ) {
//     onClose();
//   }
// };

//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, [onClose]);
useEffect(() => {
  const handleClickOutside = (event: MouseEvent) => {
    if (
      showResponseModal || showVideoModal // ✅ Do not close if child modals are open
    ) {
      return;
    }

    if (
      modalRef.current &&
      event.target instanceof Node &&
      !modalRef.current.contains(event.target)
    ) {
      onClose();
    }
  };

  document.addEventListener("mousedown", handleClickOutside);
  return () => document.removeEventListener("mousedown", handleClickOutside);
}, [onClose, showResponseModal, showVideoModal]);

  if (!isOpen) return null;

  return (
    <>
    <div className="fixed inset-0 z-50 flex items-center justify-center " style={{ background:'rgba(0,0,0,.6)' }}>
      <div  ref={modalRef} className="bg-white w-[40%] rounded-none overflow-y-auto max-h-[90vh] p-0 text-[#000] text-sm">
        {/* Header */}
        <div className="bg-[#004AAD] text-white px-6 py-4 flex justify-between items-center">
          <h2 className="text-base font-semibold">Repair Claim Details</h2>
          <button onClick={onClose}>
            <X className="w-5 h-5 text-white" />
          </button>
        </div>

        <div className="px-6 py-4">
          {/* Claim Summary Section */}
          <div className="grid md:grid-cols-2 gap-6 mb-4">
            <div className="space-y-1">
              <p><strong>Claim ID:</strong> 12345678</p>
              <p><strong>Created On:</strong> 2025-01-15</p>
              <p><strong>Claim Type:</strong> Accidental Damage</p>
              <p><strong>Total Sum Insured:</strong> #100,000</p>
              <p><strong>Balance:</strong> #90,000</p>
              <p><strong>Status:</strong> Premium</p>
              <p><strong>Insurer:</strong> Axa Mansard</p>
            </div>
            <div className="space-y-2 text-sm text-[#333]">
              <p><strong>Admin John Doe</strong> | 2025-01-15 10:30 AM<br />Please ensure the documents are correctly uploaded</p>
              <p><strong>Admin Jane Smith</strong> | 2025-01-15 11:00 AM<br />Awaiting confirmation from the customer</p>
            </div>
          </div>

          <div className="flex gap-4 mb-6">
            {/* <button className="px-4 py-2 border border-blue-600 text-blue-600 text-sm">Add Response</button> */}
             <button
              className="px-4 py-2 border border-blue-600 text-blue-600 text-sm"
              onClick={() => setShowResponseModal(true)}
            >
              Add Response
            </button>
            <button className="px-4 py-2 bg-blue-600 text-white text-sm">Resolve</button>
          </div>

          {/* Device Info */}
          <div className="mb-6">
            <h3 className="font-semibold mb-2">Device Information</h3>
            <table className="w-full border text-sm">
              <thead className="bg-[#F4F4F4]">
                <tr>
                  {['Device ID', 'Device Brand', 'Model', 'IMEI', 'Policy Document'].map(h => (
                    <th key={h} className="px-4 py-2 text-left">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr className="border-t">
                  <td className="px-4 py-2 text-blue-600">#0001</td>
                  <td className="px-4 py-2">Samsung</td>
                  <td className="px-4 py-2">Galaxy S22</td>
                  <td className="px-4 py-2">356789123456789</td>
                  <td className="px-4 py-2 text-blue-600 cursor-pointer">View More</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Parties */}
          <div className="mb-6">
            <h3 className="font-semibold mb-2">Parties</h3>
            <table className="w-full border text-sm">
              <thead className="bg-[#F4F4F4]">
                <tr>
                  {['Name', 'User Type', 'Email', 'Phone Number'].map(h => (
                    <th key={h} className="px-4 py-2 text-left">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {['Davies', 'Mr Obi', 'Chuks'].map((name, idx) => (
                  <tr key={idx} className="border-t">
                    <td className="px-4 py-2">{name}</td>
                    <td className="px-4 py-2">{idx === 0 ? 'Customer' : idx === 1 ? 'Sales & Repair' : 'Team Member'}</td>
                    <td className="px-4 py-2">X@gmail.com</td>
                    <td className="px-4 py-2">08034288934</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Claims Info */}
          <div className="mb-6">
            <h3 className="font-semibold mb-2">Claims Information</h3>
            <table className="w-full border text-sm">
              <thead className="bg-[#F4F4F4]">
                <tr>
                  {['Description', 'Amount', 'Amount (Excess)'].map(h => (
                    <th key={h} className="px-4 py-2 text-left">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr className="border-t">
                  <td className="px-4 py-2">Screen Damage</td>
                  <td className="px-4 py-2">#60</td>
                  <td className="px-4 py-2">#60</td>
                </tr>
                <tr className="border-t">
                  <td className="px-4 py-2">Battery Issue</td>
                  <td className="px-4 py-2">#30</td>
                  <td className="px-4 py-2">#33</td>
                </tr>
                <tr className="border-t font-semibold">
                  <td className="px-4 py-2">Total</td>
                  <td className="px-4 py-2">#100</td>
                  <td className="px-4 py-2">#112</td>
                </tr>
              </tbody>
            </table>

            <div className="mt-4 space-y-1">
              <p>Excess: <strong>#112</strong></p>
              <p>Device Balance: <strong>#100,000</strong></p>
              <p>Amount Payable by Insurer: <strong>#100,000</strong></p>
              <p>Amount Payable by Mona: <strong>#0.00</strong></p>
            </div>
          </div>

          {/* Review Damage */}
          <div className="mb-6">
            <h3 className="font-semibold mb-2">Review Damage:</h3>
            {/* <Button className="border border-red-600 text-red-600 text-xs rounded-none px-4 py-1">Watch Video</Button> */}
            <Button
  onClick={() => setShowVideoModal(true)}
  className="border border-[#E52626] text-[#E52626] bg-white text-xs rounded-none px-4 py-1"
>
  Watch Video
</Button>

          </div>

          {/* General Description */}
          <div className="mb-6">
            <h3 className="font-semibold mb-2">General Description</h3>
            {['When', 'Where', 'How'].map(label => (
              <div key={label} className="mb-2">
                <p className="font-medium mb-1">{label}</p>
                <div className="bg-[#DBEBFF59] text-[#004AAD] p-3">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis.
                </div>
              </div>
            ))}
          </div>

          {/* Admin Feedback */}
          <div className="mb-6">
              <ReviewCard />

          </div>

          <div className="flex justify-end">
<Button
  onClick={() => setShowTrackModal(true)}
  className="border border-[#004AAD] text-[#004AAD] bg-white text-sm px-4 py-2 rounded-none"
>
  Track Progress
</Button>
          </div>
        </div>
      </div>
      

    </div>
     {/* Nested Response Modal */}
     {showResponseModal && (
  <RepairClaimModalRes onClose={() => setShowResponseModal(false)} />
  
)}
<VideoModal isOpen={showVideoModal} onClose={() => setShowVideoModal(false)} />
  {/* Track Progress Modal */}
<TrackProgressModal
  isOpen={showTrackModal}
  onClose={() => setShowTrackModal(false)}
  claim={claim}
/>

</>
  );
};

export default RepairClaimModal;
