
// components/RepairClaimModal.tsx
"use client";
import { RxVideo } from "react-icons/rx"; 
import React,{useEffect, useRef, useState} from "react";
// import { X } from "lucide-react";
import { Button } from "./ui/button";
import RepairClaimModalRes from "./RepairClaimModalRes";
import VideoModal from "./VideoModal";
import ReviewCard from "./ReviewCard";
import TrackProgressModal from "./TrackProgressModal";
import toast from 'react-hot-toast';
import { X } from "lucide-react";

export type ClaimStatus = 
  | "Pending"
  | "Approved"
  | "Paid"
  | "Paid by Mona"
  | "Queried";

export interface ClaimData {
  id: string;
  brand?: string;
  model?: string; // optional because only the first item uses `deviceModel`
  // deviceModel?: string; // optional because all other items use `model`
  issueType?: string;
  amount?: string;
  partner?: string;
  status?: ClaimStatus;
  created?: string; // ISO date string like "2025-01-15"
}

interface RepairClaimModalProps {
    claim: ClaimData | null;
  isOpen: boolean;
  onClose: () => void;
}
export interface Claim {
  id?: number;
  claimId: string;
  deviceModel: string;
  brand: string;
  imei?: string;
  amount?: string;
  status: string;
  insurer?: string;
  date: string; // You could use Date if needed
  category?: string; // 'all' | 'pending' | 'uncategorized' | 'approved' | 'completed' | 'rejected'
  createdAt?: string; // Or Date if parsed
}


const RepairClaimModal: React.FC<RepairClaimModalProps> = ({ claim, isOpen, onClose }) => {
      const [showResponseModal, setShowResponseModal] = useState(false);
      const [showVideoModal, setShowVideoModal] = useState(false);
const [showTrackModal, setShowTrackModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
      // const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);


  // const modalRef = useRef(null);
const modalRef = useRef<HTMLDivElement>(null);



useEffect(() => {
  const handleClickOutside = (event: MouseEvent) => {
    // If any child modal is open, don't allow parent to close
    if (showResponseModal || showVideoModal || showTrackModal || showConfirmModal) {
      return;
    }

    // If click is outside the parent modal, close it
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
}, [
  onClose,
  showResponseModal,
  showVideoModal,
  showTrackModal,
  showConfirmModal,
]);


 const handleOpenVideoModal = () => setShowVideoModal(true);


  const handleResolve = () => {
  toast.success("Claim resolved successfully!");
  setShowConfirmModal(false);
  setTimeout(() => {
    onClose();
  }, 100);
};
if (!isOpen) return null;
  return (
    <>
    <div className="fixed inset-0 z-50 flex items-center justify-center " style={{ background:'rgba(0,0,0,.6)' }}>
      <div  ref={modalRef} className="bg-white w-[95%] md:w-[45%] rounded-none overflow-y-auto max-h-[90vh] p-0 text-[#000] text-sm">
        {/* Header */}
        <div className="bg-[#004AAD] text-white px-6 py-4 flex justify-between items-center">
          <h2 className="text-base font-semibold">Repair Claim Details</h2>
          {/* <button onClick={onClose}>
            <X className="w-5 h-5 text-white" />
          </button> */}
        </div>

        <div className="px-6 py-4">
          {/* Claim Summary Section */}
          <div className="grid md:grid-cols-1 gap-6 mb-4">
            <div className="space-y-1">
              <p><strong>Claim ID:</strong> 12345678</p>
              <p><strong>Created On:</strong> 2025-01-15</p>
              <p><strong>Claim Type:</strong> Accidental Damage</p>
              <p><strong>Total Sum Insured:</strong> #100,000</p>
              <p><strong>Balance:</strong> #90,000</p>
              <p><strong>Status:</strong> Premium</p>
              <p><strong>Insurer:</strong> Axa Mansard</p>
            </div>
            <div className="space-y-2 text-sm text-[#212121] bg-[#F5F6FA] overflow-y-scroll h-24">
              <p><strong>Admin John Doe</strong> | 2025-01-15 10:30 AM<br />Please ensure the documents are correctly uploaded</p>
              <p><strong>Admin Jane Smith</strong> | 2025-01-15 11:00 AM<br />Awaiting confirmation from the customer</p>
            </div>
          </div>

          <div className="flex gap-4 mb-6">
            {/* <button className="px-4 py-2 border border-[#004AAD] text-blue-600 text-sm">Add Response</button> */}
             <button
              className="px-4 py-2 border border-[#004AAD] bg-[#004AAD] text-[#fff] text-sm"
              onClick={() => setShowResponseModal(true)}
            >
              Add Response
            </button>
            <button className="px-4 py-2 border border-[#004AAD] text-[#004AAD] text-sm"               onClick={() => setShowConfirmModal(true)}
>Resolve</button>
          </div>

          {/* Device Info */}
          <div className="mb-6 overflow-x-auto">
            <h3 className="font-semibold mb-2">Device Information</h3>
            {/* <table className="w-full border text-xs">
             */}
               <table className="min-w-[600px] w-full border text-[10px] md:text-xs">
              <thead className="bg-[#F4F4F4]">
                <tr>
                  {['Device ID', 'Device Brand', 'Model', 'IMEI', 'Policy Document'].map(h => (
                    <th key={h} className="px-4 py-2  border-r text-left text-[9px]">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr className="shadow-sm">
                  <td className="px-4 py-2  border-r text-[#004AAD]">#0001</td>
                  <td className="px-4 py-2  border-r">Samsung</td>
                  <td className="px-4 py-2  border-r">Galaxy S22</td>
                  <td className="px-4 py-2  border-r">356789123456789</td>
                  <td className="px-4 py-2  border-r text-[#004AAD] cursor-pointer">View More</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Parties */}
          <div className="mb-6 overflow-x-auto">
            <h3 className="font-semibold mb-2">Parties</h3>
            {/* <table className="w-full border-none shadow-sm text-sm"> */}
              <table className="min-w-[600px] w-full border text-[10px] md:text-xs">

              <thead className="bg-[#F4F4F4]">
                <tr>
                  {['Name', 'User Type', 'Email', 'Phone Number'].map(h => (
                    <th key={h} className="px-4 py-2 text-left">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {['Davies', 'Mr Obi', 'Chuks'].map((name, idx) => (
                  <tr key={idx} className="shadow-sm">
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
          <div className="mb-6 overflow-x-auto">
            <h3 className="font-semibold mb-2">Claims Information</h3>
            {/* <table className="w-full border text-sm"> */}
              <table className="min-w-[600px] w-full border text-[10px] md:text-xs">

              <thead className="bg-[#F4F4F4]">
                {/* <tr>
                  {['Description', 'Amount', 'Amount (Excess)'].map(h => (
                    <th key={h} className="px-4 py-2 text-left">{h}</th>
                  ))}
                </tr> */}
                 <tr>
                  {['Description', 'Amount'].map(h => (
                    <th key={h} className="px-4 py-2 text-left border-r">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr className="shadow-sm">
                  <td className="px-4 py-2 border-r">Screen Damage</td>
                  <td className="px-4 py-2 border-r">#60</td>
                  {/* <td className="px-4 py-2 border-r">#60</td> */}
                </tr>
                <tr className="shadow-sm">
                  <td className="px-4 py-2 border-r">Battery Issue</td>
                  <td className="px-4 py-2 border-r">#30</td>
                  {/* <td className="px-4 py-2 border-r">#33</td> */}
                </tr>
                <tr className="shadow-sm font-semibold">
                  <td className="px-4 py-2 border-r">Total</td>
                  <td className="px-4 py-2 border-r">#100</td>
                  {/* <td className="px-4 py-2 border-r">#112</td> */}
                </tr>
              </tbody>
            </table>

            <div className="mt-4 space-y-1 flex flex-col items-end">
              {/* <p>Excess: <strong>#112</strong></p> */}
              <p>Device Balance: <strong>#100,000</strong></p>
              <p>Amount Payable by Insurer: <strong>#100,000</strong></p>
              <p className="text-[#004AAD]">Amount Payable by Mona: <strong>#0.00</strong></p>
            </div>
          </div>

          {/* Review Damage */}
            <div className="flex items-center gap-2 mb-6">
          <span className="text-sm font-medium">Review Damage:</span>
          <button className="text-red-600 border border-red-600 px-2 py-1 rounded-none text-xs flex gap-1.5 items-center "             onClick={handleOpenVideoModal}
>
            Watch Video  <RxVideo />
          </button>
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
          <div className="mb-6 mt-16">
              <ReviewCard />

          </div>

          <div className="flex justify-end">
<Button
  onClick={() => setShowTrackModal(true)}
  className="border border-[#004AAD] text-[#004AAD] w-[30%] bg-white hover:bg-white text-sm px-4 py-2 my-10 rounded-none"
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
  onClose={() => {
    setShowTrackModal(false); // ONLY closes the nested modal
  }}
  claim={claim}
/>

 {/* Confirmation Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(0,0,0,.5)' }}   onClick={(e) => e.stopPropagation()} // prevent bubbling
>
          <div className="bg-white rounded-none shadow-xl p-6 max-w-md w-full text-center">
            <div className="flex items-center justify-center mb-6">
              <div className="w-14 h-14 rounded-full bg-yellow-400 flex items-center justify-center">
                <span className="text-white text-2xl font-bold">?</span>
              </div>
            </div>
            <h3 className="text-lg font-semibold mb-2">Are you sure you want to resolve this queried claim?</h3>
            <p className="text-gray-600 text-sm mb-6">By doing so, all liability will fall on Mona Protect</p>
            <div className="flex justify-center gap-4">
              <button
                onClick={handleResolve}
                className="px-6 py-2 bg-[#0046AD] text-white rounded-none text-sm font-semibold hover:bg-blue-800"
              >
                Yes, resolve
              </button>
              <button
                onClick={() => setShowConfirmModal(false)}
                className="px-6 py-2 border border-red-500 text-red-500 rounded-none text-sm font-semibold hover:bg-red-50"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
</>
  );
};

export default RepairClaimModal;
