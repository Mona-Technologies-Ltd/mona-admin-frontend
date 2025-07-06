"use client";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import VideoModal from "./VideoModal";
import { useState } from "react";
import { DialogTitle } from "@/components/ui/dialog";
import TrackProgressModal from "./TrackProgressModal"; // Adjust import as needed
import ReviewCard from "./ReviewCard";
import Image from "next/image";

// import type { Claim } from "@shared/schema";
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
interface ClaimDetailsModalProps {
  claim: Claim | null;
  isOpen: boolean;
  onClose: () => void;
  onWatchVideo?: () => void;
  onTrackProgress?: () => void;
}

export default function ClaimDetailsModal({
  claim,
  isOpen,
  onClose,
  // onWatchVideo,
  // onTrackProgress
}: ClaimDetailsModalProps) {
      const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [showTrackModal, setShowTrackModal] = useState(false);


  if (!claim) return null;
 const handleOpenVideoModal = () => setIsVideoModalOpen(true);
  const handleCloseVideoModal = () => setIsVideoModalOpen(false);
    const handleTrackProgress = () => {
    setShowTrackModal(true);
  };
console.log(claim.status);
  const handleCloseTrackModal = () => {
    setShowTrackModal(false);
  };
  const getModalTitle = () => {
    switch (claim.status) {
      case "uncategorized":
        return "Uncategorized Details";
      case "pending":
        return "Pending Claims Details";
      case "completed":
        return "Completed Claims Details";
      case "approved":
        return "Approved Claims Details";
      case "rejected":
        return "Rejected Claims";
      default:
        return "Claim Details";
    }
  };

  const renderUncategorizedModal = () => (
      //  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4">
       <div className="relative w-full max-w-2xl bg-white rounded-lg shadow-xl p-6 md:p-8">
    {/* Close Icon */}
    <button className="absolute top-4 right-4 text-black" onClick={onClose}>
      <X size={24} />
    </button>

    {/* Header */}
    <div className="flex justify-between items-start">
      <div>
        <p className="text-sm text-gray-600">Device id: IP12567</p>
        <h2 className="text-2xl font-semibold">Iphone 13 Pro Max</h2>
        <span className="inline-block mt-2 text-sm bg-blue-100 text-[#004AAD] px-3 py-1 rounded">
          Device id: IP12567
        </span>
      </div>

     <div className="relative w-14 h-14 flex items-center justify-center rounded-full p-[2px] bg-gradient-to-r from-blue-500 to-purple-600">
  <div className="flex items-center justify-center w-full h-full bg-white rounded-full p-2">
    <div className="relative w-6 h-6">
      <Image src="/apple-logo.svg" alt="Apple logo" fill className="object-contain" />
    </div>
  </div>
</div>

    </div>

        {/* Info Boxes */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <div className="bg-[#F3F7FF] p-3 text-center rounded">
            <p className="text-xs text-gray-500">Status</p>
            <p className="text-sm font-medium text-gray-700">Uncategorized</p>
          </div>
          <div className="bg-[#F3F7FF] p-3 text-center rounded">
            <p className="text-xs text-gray-500">Date</p>
            <p className="text-sm text-[#004AAD] font-medium">Dec 6, 2024</p>
          </div>
          <div className="bg-[#F3F7FF] p-3 rounded flex flex-col items-center text-center">
            <div className="flex items-center gap-1 text-[#004AAD] font-medium text-sm">
              <span>📇</span>
              <span>Customer Info</span>
            </div>
            <p className="text-black text-sm font-semibold mt-1">John Doe</p>
            <p className="text-sm">08143789883</p>
          </div>
        </div>

        {/* Issues Section */}
        <div className="mt-6 bg-[#EDF5FF] p-4 rounded">
          <p className="text-sm font-medium text-gray-700 mb-2">Issue(s)</p>
          <div className="flex flex-wrap gap-2">
            <span className="text-xs text-[#004AAD] bg-blue-100 px-3 py-1 rounded">Accidental Damage</span>
            <span className="text-xs text-[#004AAD] bg-blue-100 px-3 py-1 rounded">Hardware Damage</span>
          </div>
        </div>

        {/* General Description */}
        <div className="mt-6">
          <p className="text-base font-semibold text-gray-800">General Description</p>

          <div className="mt-4">
            <p className="text-sm font-medium text-gray-700 mb-1">When</p>
            <p className="bg-[#EDF5FF] text-sm p-3 rounded">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis.
            </p>
          </div>

          <div className="mt-4">
            <p className="text-sm font-medium text-gray-700 mb-1">Where</p>
            <p className="bg-[#EDF5FF] text-sm p-3 rounded">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis.
            </p>
          </div>

          <div className="mt-4">
            <p className="text-sm font-medium text-gray-700 mb-1">How</p>
            <p className="bg-[#EDF5FF] text-sm p-3 rounded">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis.
            </p>
          </div>
        </div>
      </div>
    // </div>
  );

  const renderPendingModal = () => (
    <div className="bg-white  p-0">
      {/* Blue Header */}
      <div className="bg-[#004AAD] text-white text-center w-full p-4">
        <h2 className="text-lg font-semibold">Repair Claim Details</h2>
      </div>

      {/* Content */}
      <div className="p-4 space-y-4">
        {/* Basic Information */}
        <div className="space-y-2 text-sm">
          <div><span className="font-medium">Claim ID:</span> {claim.claimId}</div>
          <div><span className="font-medium">Created On:</span> 2025-01-19</div>
          <div><span className="font-medium">Claim Type:</span> Accidental Damage</div>
          <div><span className="font-medium">Total Sum Insured:</span> ₦{claim.amount}</div>
          <div><span className="font-medium">Balance:</span> ₦{claim.amount}</div>
          <div><span className="font-medium">Status:</span> <span className="text-orange-500">Pending</span></div>
          <div><span className="font-medium">Insurer:</span> {claim.insurer}</div>
        </div>

        {/* Device Information */}
        <div>
          <h3 className="font-semibold text-gray-900 mb-2">Device Information</h3>
          <div className="bg-gray-50 rounded">
            <table className="w-full text-xs">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-2 text-left">Device ID</th>
                  <th className="p-2 text-left">Device Brand</th>
                  <th className="p-2 text-left">Model</th>
                  <th className="p-2 text-left">IMEI</th>
                  <th className="p-2 text-left">Policy Document</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t">
                  <td className="p-2 text-[#004AAD]">AD001</td>
                  <td className="p-2">{claim.brand}</td>
                  <td className="p-2">{claim.deviceModel}</td>
                  <td className="p-2">{claim.imei}</td>
                  <td className="p-2">
                    <button className="text-[#004AAD] underline text-xs">View More</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Parties */}
        <div>
          <h3 className="font-semibold text-gray-900 mb-2">Parties</h3>
          <div className="bg-gray-50 rounded">
            <table className="w-full text-xs">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-2 text-left">Name</th>
                  <th className="p-2 text-left">User Type</th>
                  <th className="p-2 text-left">Email</th>
                  <th className="p-2 text-left">Phone Number</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t">
                  <td className="p-2">Charles</td>
                  <td className="p-2">Customer</td>
                  <td className="p-2">x@gmail.com</td>
                  <td className="p-2">08034289034</td>
                </tr>
                <tr className="border-t">
                  <td className="p-2">Make way Repair</td>
                  <td className="p-2">Business partner</td>
                  <td className="p-2">x@gmail.com</td>
                  <td className="p-2">08034289034</td>
                </tr>
                <tr className="border-t">
                  <td className="p-2">Chuka</td>
                  <td className="p-2">Team Member</td>
                  <td className="p-2">x@gmail.com</td>
                  <td className="p-2">08034289034</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Claims Information */}
        <div>
          <h3 className="font-semibold text-gray-900 mb-2">Claims Information</h3>
          <div className="bg-gray-50 rounded">
            <table className="w-full text-xs">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-2 text-left">Description</th>
                  <th className="p-2 text-left">Amount</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t">
                  <td className="p-2">Screen Damage</td>
                  <td className="p-2">₦50,000</td>
                </tr>
                <tr className="border-t">
                  <td className="p-2">Battery Issue</td>
                  <td className="p-2">₦60,000</td>
                </tr>
                <tr className="border-t">
                  <td className="p-2">Service Fee</td>
                  <td className="p-2">₦10,000</td>
                </tr>
              </tbody>
            </table>
            <div className="p-2 bg-gray-200 text-right space-y-1">
              <div><span className="font-medium">Total:</span> ₦120,000</div>
              <div><span className="font-medium">Device Balance:</span> ₦120,000</div>
              <div><span className="font-medium">Amount Payable by Insurer:</span> ₦120,000</div>
              <div><span className="font-medium">Amount Payable by Morris:</span> ₦120,000</div>
            </div>
          </div>
        </div>

        {/* Review Damage */}
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">Review Damage:</span>
          <button className="text-red-600 border border-red-600 px-2 py-1 rounded-none text-xs"             onClick={handleOpenVideoModal}
>
            Watch Video ▶
          </button>
        </div>

        {/* General Description */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-semibold text-gray-900">General Description</h3>
            <button className="text-[#004AAD] border border-[#004AAD] px-3 py-1 rounded-none text-xs">
              Edit Information
            </button>
          </div>
          
          <div className="space-y-3 text-sm">
            <div>
              <h4 className="font-medium text-gray-700">When</h4>
              <p className="text-gray-600 bg-blue-50 p-2 rounded text-xs">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit
                interdum, ac aliquet odio mattis.
              </p>
            </div>
            
            <div>
              <h4 className="font-medium text-gray-700">Where</h4>
              <p className="text-gray-600 bg-blue-50 p-2 rounded text-xs">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit
                interdum, ac aliquet odio mattis.
              </p>
            </div>
            
            <div>
              <h4 className="font-medium text-gray-700">How</h4>
              <p className="text-gray-600 bg-blue-50 p-2 rounded text-xs">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit
                interdum, ac aliquet odio mattis.
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 pt-4">
          <Button className="bg-[#004AAD] hover:bg-blue-700 text-white flex-1 text-sm rounded-none">
            Approve
          </Button>
           <Button
              type="button" // 👈 prevent default submit behavior
              variant="outline"
              onClick={(e) => {
                // alert(3333);
                e.stopPropagation();
                handleTrackProgress();
                // alert(99999);
              }}
              className="flex-1 text-sm rounded-none"
            >
              Track Progress
              {/* </Button */}
            </Button>

          <Button variant="outline" className="text-red-600 border-red-600 flex-1 text-sm rounded-none">
            Reject
          </Button>
        </div>
      </div>
    </div>
  );
  const renderRejectedModal = () => (
    <div className="bg-white  p-0">
      {/* Blue Header */}
      <div className="bg-[#004AAD] text-white text-center w-full p-4">
        <h2 className="text-lg font-semibold">Repair Claim Details</h2>
      </div>

      {/* Content */}
      <div className="p-4 space-y-4">
        {/* Basic Information */}
        <div className="space-y-2 text-sm">
          <div><span className="font-medium">Claim ID:</span> {claim.claimId}</div>
          <div><span className="font-medium">Created On:</span> 2025-01-19</div>
          <div><span className="font-medium">Claim Type:</span> Accidental Damage</div>
          <div><span className="font-medium">Total Sum Insured:</span> ₦{claim.amount}</div>
          <div><span className="font-medium">Balance:</span> ₦{claim.amount}</div>
          <div><span className="font-medium">Status:</span> <span className="text-orange-500">Rejected</span></div>
          <div><span className="font-medium">Insurer:</span> {claim.insurer}</div>
        </div>

        {/* Device Information */}
        <div>
          <h3 className="font-semibold text-gray-900 mb-2">Device Information</h3>
          <div className="bg-gray-50 rounded">
            <table className="w-full text-xs">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-2 text-left">Device ID</th>
                  <th className="p-2 text-left">Device Brand</th>
                  <th className="p-2 text-left">Model</th>
                  <th className="p-2 text-left">IMEI</th>
                  <th className="p-2 text-left">Policy Document</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t">
                  <td className="p-2 text-[#004AAD]">AD001</td>
                  <td className="p-2">{claim.brand}</td>
                  <td className="p-2">{claim.deviceModel}</td>
                  <td className="p-2">{claim.imei}</td>
                  <td className="p-2">
                    <button className="text-[#004AAD] underline text-xs">View More</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Parties */}
        <div>
          <h3 className="font-semibold text-gray-900 mb-2">Parties</h3>
          <div className="bg-gray-50 rounded">
            <table className="w-full text-xs">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-2 text-left">Name</th>
                  <th className="p-2 text-left">User Type</th>
                  <th className="p-2 text-left">Email</th>
                  <th className="p-2 text-left">Phone Number</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t">
                  <td className="p-2">Charles</td>
                  <td className="p-2">Customer</td>
                  <td className="p-2">x@gmail.com</td>
                  <td className="p-2">08034289034</td>
                </tr>
                <tr className="border-t">
                  <td className="p-2">Make way Repair</td>
                  <td className="p-2">Business partner</td>
                  <td className="p-2">x@gmail.com</td>
                  <td className="p-2">08034289034</td>
                </tr>
                <tr className="border-t">
                  <td className="p-2">Chuka</td>
                  <td className="p-2">Team Member</td>
                  <td className="p-2">x@gmail.com</td>
                  <td className="p-2">08034289034</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Claims Information */}
        <div>
          <h3 className="font-semibold text-gray-900 mb-2">Claims Information</h3>
          <div className="bg-gray-50 rounded">
            <table className="w-full text-xs">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-2 text-left">Description</th>
                  <th className="p-2 text-left">Amount</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t">
                  <td className="p-2">Screen Damage</td>
                  <td className="p-2">₦50,000</td>
                </tr>
                <tr className="border-t">
                  <td className="p-2">Battery Issue</td>
                  <td className="p-2">₦60,000</td>
                </tr>
                <tr className="border-t">
                  <td className="p-2">Service Fee</td>
                  <td className="p-2">₦10,000</td>
                </tr>
              </tbody>
            </table>
            <div className="p-2 bg-gray-200 text-right space-y-1">
              <div><span className="font-medium">Total:</span> ₦120,000</div>
              <div><span className="font-medium">Device Balance:</span> ₦120,000</div>
              <div><span className="font-medium">Amount Payable by Insurer:</span> ₦120,000</div>
              <div><span className="font-medium">Amount Payable by Morris:</span> ₦120,000</div>
            </div>
          </div>
         
        </div>

        {/* Review Damage */}
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">Review Damage:</span>
          <button className="text-red-600 border border-red-600 px-2 py-1 rounded-none text-xs"             onClick={handleOpenVideoModal}
>
            Watch Video ▶
          </button>
        </div>

        {/* General Description */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-semibold text-gray-900">General Description</h3>
            <button className="text-[#004AAD] border border-[#004AAD] px-3 py-1 rounded-none text-xs">
              Edit Information
            </button>
          </div>
          
          <div className="space-y-3 text-sm">
            <div>
              <h4 className="font-medium text-gray-700">When</h4>
              <p className="text-gray-600 bg-blue-50 p-2 rounded text-xs">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit
                interdum, ac aliquet odio mattis.
              </p>
            </div>
            
            <div>
              <h4 className="font-medium text-gray-700">Where</h4>
              <p className="text-gray-600 bg-blue-50 p-2 rounded text-xs">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit
                interdum, ac aliquet odio mattis.
              </p>
            </div>
            
            <div >
              <h4 className="font-medium text-gray-700">Reason for rejection</h4>
              <p className="text-[#E52626] bg-[#FFA9A959] p-2 rounded text-xs">
                The modal here shows the modal is rejected.
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 pt-4 w-[100%]">
         
           
  <div className="w-full flex justify-end">
            <Button  type="button" // 👈 prevent default submit behavior
              variant="outline"
              onClick={(e) => {
                // alert(3333);
                e.stopPropagation();
                handleTrackProgress();
                // alert(99999);
              }} className="border border-[#004AAD] text-[#004AAD] text-sm px-4 py-2 rounded-none ">Track Progress</Button>
          </div>
          
        </div>
      </div>
        
    </div>
  );
  const renderApprovedModal = () => (
    <div className="bg-white  p-0">
      {/* Blue Header */}
      <div className="bg-[#004AAD] text-white text-center w-full p-4">
        <h2 className="text-lg font-semibold">Repair Claim Details</h2>
      </div>

      {/* Content */}
      <div className="p-4 space-y-4">
        {/* Basic Information */}
        <div className="space-y-2 text-sm">
          <div><span className="font-medium">Claim ID:</span> {claim.claimId}</div>
          <div><span className="font-medium">Created On:</span> 2025-01-19</div>
          <div><span className="font-medium">Claim Type:</span> Accidental Damage</div>
          <div><span className="font-medium">Total Sum Insured:</span> ₦{claim.amount}</div>
          <div><span className="font-medium">Balance:</span> ₦{claim.amount}</div>
          <div><span className="font-medium">Status:</span> <span className="text-orange-500">Approved</span></div>
          <div><span className="font-medium">Insurer:</span> {claim.insurer}</div>
        </div>

        {/* Device Information */}
        <div>
          <h3 className="font-semibold text-gray-900 mb-2">Device Information</h3>
          <div className="bg-gray-50 rounded">
            <table className="w-full text-xs">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-2 text-left">Device ID</th>
                  <th className="p-2 text-left">Device Brand</th>
                  <th className="p-2 text-left">Model</th>
                  <th className="p-2 text-left">IMEI</th>
                  <th className="p-2 text-left">Policy Document</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t">
                  <td className="p-2 text-[#004AAD]">AD001</td>
                  <td className="p-2">{claim.brand}</td>
                  <td className="p-2">{claim.deviceModel}</td>
                  <td className="p-2">{claim.imei}</td>
                  <td className="p-2">
                    <button className="text-[#004AAD] underline text-xs">View More</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Parties */}
        <div>
          <h3 className="font-semibold text-gray-900 mb-2">Parties</h3>
          <div className="bg-gray-50 rounded">
            <table className="w-full text-xs">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-2 text-left">Name</th>
                  <th className="p-2 text-left">User Type</th>
                  <th className="p-2 text-left">Email</th>
                  <th className="p-2 text-left">Phone Number</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t">
                  <td className="p-2">Charles</td>
                  <td className="p-2">Customer</td>
                  <td className="p-2">x@gmail.com</td>
                  <td className="p-2">08034289034</td>
                </tr>
                <tr className="border-t">
                  <td className="p-2">Make way Repair</td>
                  <td className="p-2">Business partner</td>
                  <td className="p-2">x@gmail.com</td>
                  <td className="p-2">08034289034</td>
                </tr>
                <tr className="border-t">
                  <td className="p-2">Chuka</td>
                  <td className="p-2">Team Member</td>
                  <td className="p-2">x@gmail.com</td>
                  <td className="p-2">08034289034</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Claims Information */}
        <div>
          <h3 className="font-semibold text-gray-900 mb-2">Claims Information</h3>
          <div className="bg-gray-50 rounded">
            <table className="w-full text-xs">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-2 text-left">Description</th>
                  <th className="p-2 text-left">Amount</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t">
                  <td className="p-2">Screen Damage</td>
                  <td className="p-2">₦50,000</td>
                </tr>
                <tr className="border-t">
                  <td className="p-2">Battery Issue</td>
                  <td className="p-2">₦60,000</td>
                </tr>
                <tr className="border-t">
                  <td className="p-2">Service Fee</td>
                  <td className="p-2">₦10,000</td>
                </tr>
              </tbody>
            </table>
            <div className="p-2 bg-gray-200 text-right space-y-1">
              <div><span className="font-medium">Total:</span> ₦120,000</div>
              <div><span className="font-medium">Device Balance:</span> ₦120,000</div>
              <div><span className="font-medium">Amount Payable by Insurer:</span> ₦120,000</div>
              <div><span className="font-medium text-[]">Amount Payable by Mona:</span> ₦120,000</div>
            </div>
          </div>
         
        </div>

        {/* Review Damage */}
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">Review Damage:</span>
          <button className="text-red-600 border border-red-600 px-2 py-1 rounded-none text-xs"             onClick={handleOpenVideoModal}
>
            Watch Video ▶
          </button>
        </div>

        {/* General Description */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-semibold text-gray-900">General Description</h3>
            <button className="text-[#004AAD] border border-[#004AAD] px-3 py-1 rounded-none text-xs">
              Edit Information
            </button>
          </div>
          
          <div className="space-y-3 text-sm">
            <div>
              <h4 className="font-medium text-gray-700">When</h4>
              <p className="text-gray-600 bg-blue-50 p-2 rounded text-xs">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit
                interdum, ac aliquet odio mattis.
              </p>
            </div>
            
            <div>
              <h4 className="font-medium text-gray-700">Where</h4>
              <p className="text-gray-600 bg-blue-50 p-2 rounded text-xs">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit
                interdum, ac aliquet odio mattis.
              </p>
            </div>
            
            <div>
              <h4 className="font-medium text-gray-700">How</h4>
              <p className="text-gray-600 bg-blue-50 p-2 rounded text-xs">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit
                interdum, ac aliquet odio mattis.
              </p>
            </div>
          </div>
        </div>
 {/* <ReviewCard /> */}
        {/* Action Buttons */}
        <div className="w-ful flex gap-2 pt-4">
         
          
  <div className="w-full flex  justify-end">
            <Button  type="button" // 👈 prevent default submit behavior
              variant="outline"
              onClick={(e) => {
                // alert(3333);
                e.stopPropagation();
                handleTrackProgress();
                // alert(99999);
              }} className="border border-[#004AAD] text-[#004AAD] text-sm px-4 py-2 rounded-none ">Track Progress</Button>
          </div>
       
        </div>
      </div>
        
    </div>
  );
  const renderCompletedModal = () => (
   <div className="bg-white  p-0">
      {/* Blue Header */}
      <div className="bg-[#004AAD] text-white text-center w-full p-4">
        <h2 className="text-lg font-semibold">Repair Claim Details</h2>
      </div>

      {/* Content */}
      <div className="p-4 space-y-4">
        {/* Basic Information */}
        <div className="space-y-2 text-sm">
          <div><span className="font-medium">Claim ID:</span> {claim.claimId}</div>
          <div><span className="font-medium">Created On:</span> 2025-01-19</div>
          <div><span className="font-medium">Claim Type:</span> Accidental Damage</div>
          <div><span className="font-medium">Total Sum Insured:</span> ₦{claim.amount}</div>
          <div><span className="font-medium">Balance:</span> ₦{claim.amount}</div>
          <div><span className="font-medium">Status:</span> <span className="text-orange-500">Completed</span></div>
          <div><span className="font-medium">Insurer:</span> {claim.insurer}</div>
        </div>

        {/* Device Information */}
        <div>
          <h3 className="font-semibold text-gray-900 mb-2">Device Information</h3>
          <div className="bg-gray-50 rounded">
            <table className="w-full text-xs">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-2 text-left">Device ID</th>
                  <th className="p-2 text-left">Device Brand</th>
                  <th className="p-2 text-left">Model</th>
                  <th className="p-2 text-left">IMEI</th>
                  <th className="p-2 text-left">Policy Document</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t">
                  <td className="p-2 text-[#004AAD]">AD001</td>
                  <td className="p-2">{claim.brand}</td>
                  <td className="p-2">{claim.deviceModel}</td>
                  <td className="p-2">{claim.imei}</td>
                  <td className="p-2">
                    <button className="text-[#004AAD] underline text-xs">View More</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Parties */}
        <div>
          <h3 className="font-semibold text-gray-900 mb-2">Parties</h3>
          <div className="bg-gray-50 rounded">
            <table className="w-full text-xs">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-2 text-left">Name</th>
                  <th className="p-2 text-left">User Type</th>
                  <th className="p-2 text-left">Email</th>
                  <th className="p-2 text-left">Phone Number</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t">
                  <td className="p-2">Charles</td>
                  <td className="p-2">Customer</td>
                  <td className="p-2">x@gmail.com</td>
                  <td className="p-2">08034289034</td>
                </tr>
                <tr className="border-t">
                  <td className="p-2">Make way Repair</td>
                  <td className="p-2">Business partner</td>
                  <td className="p-2">x@gmail.com</td>
                  <td className="p-2">08034289034</td>
                </tr>
                <tr className="border-t">
                  <td className="p-2">Chuka</td>
                  <td className="p-2">Team Member</td>
                  <td className="p-2">x@gmail.com</td>
                  <td className="p-2">08034289034</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Claims Information */}
        <div>
          <h3 className="font-semibold text-gray-900 mb-2">Claims Information</h3>
          <div className="bg-gray-50 rounded">
            <table className="w-full text-xs">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-2 text-left">Description</th>
                  <th className="p-2 text-left">Amount</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t">
                  <td className="p-2">Screen Damage</td>
                  <td className="p-2">₦50,000</td>
                </tr>
                <tr className="border-t">
                  <td className="p-2">Battery Issue</td>
                  <td className="p-2">₦60,000</td>
                </tr>
                <tr className="border-t">
                  <td className="p-2">Service Fee</td>
                  <td className="p-2">₦10,000</td>
                </tr>
              </tbody>
            </table>
            <div className="p-2 bg-gray-200 text-right space-y-1">
              <div><span className="font-medium">Total:</span> ₦120,000</div>
              <div><span className="font-medium">Device Balance:</span> ₦120,000</div>
              <div><span className="font-medium">Amount Payable by Insurer:</span> ₦120,000</div>
              <div><span className="font-medium">Amount Payable by Morris:</span> ₦120,000</div>
            </div>
          </div>
         
        </div>

        {/* Review Damage */}
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">Review Damage:</span>
          <button className="text-red-600 border border-red-600 px-2 py-1 rounded-none text-xs"             onClick={handleOpenVideoModal}
>
            Watch Video ▶
          </button>
        </div>

        {/* General Description */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-semibold text-gray-900">General Description</h3>
            <button className="text-[#004AAD] border border-[#004AAD] px-3 py-1 rounded-none text-xs">
              Edit Information
            </button>
          </div>
          
          <div className="space-y-3 text-sm">
            <div>
              <h4 className="font-medium text-gray-700">When</h4>
              <p className="text-gray-600 bg-blue-50 p-2 rounded text-xs">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit
                interdum, ac aliquet odio mattis.
              </p>
            </div>
            
            <div>
              <h4 className="font-medium text-gray-700">Where</h4>
              <p className="text-gray-600 bg-blue-50 p-2 rounded text-xs">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit
                interdum, ac aliquet odio mattis.
              </p>
            </div>
            
            <div>
              <h4 className="font-medium text-gray-700">How</h4>
              <p className="text-gray-600 bg-blue-50 p-2 rounded text-xs">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit
                interdum, ac aliquet odio mattis.
              </p>
            </div>
          </div>
        </div>
 <ReviewCard />
        {/* Action Buttons */}
        <div className="flex gap-2 pt-4 w-[100%]">
         
          
  <div className="w-full flex justify-end">
            <Button  type="button" // 👈 prevent default submit behavior
              variant="outline"
              onClick={(e) => {
                // alert(3333);
                e.stopPropagation();
                handleTrackProgress();
                // alert(99999);
              }} className="border border-[#004AAD] text-[#004AAD] text-sm px-4 py-2 rounded-none ">Track Progress</Button>
          </div>
          
        </div>
      </div>
        
    </div>
  );

  const renderModal = () => {
    switch (claim.status) {
      case "uncategorized":
        return renderUncategorizedModal();
      case "pending":
        return renderPendingModal();
      case "completed":
        return renderCompletedModal();
      case "approved":
        return renderApprovedModal(); // renderRejectedModal
      case "rejected":
        return renderRejectedModal(); // renderRejectedModal
      default:
        return renderPendingModal();
    }
  };

const getDialogSize = () => {
  if (claim?.category === "pending") {
    return "w-full max-w-none"; // take full width
  }
  return "w-full max-w-none"; // same for now; customize per category
};


  return (
  <>
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className={`${getDialogSize()} max-h-[90vh] overflow-y-auto p-0`}  showCloseButton={false}>
        <DialogTitle className="sr-only">{getModalTitle()}</DialogTitle>
        {renderModal()}
      </DialogContent>
    </Dialog>

    <VideoModal
      isOpen={isVideoModalOpen}
      onClose={handleCloseVideoModal}
      videoTitle={`${claim.claimId} - Device Assessment Video`}
    />

    {/* ✅ Always Render TrackProgressModal */}
    <TrackProgressModal
      isOpen={showTrackModal}
      onClose={handleCloseTrackModal}
      claim={claim}
    />
  </>
);

}

export function checkDateMatch(claimDate: string, filter: string): boolean {
  if (!filter) return true;
  
  const today = new Date();
  const claimDateObj = new Date(claimDate);
  
  switch (filter) {
    case "today":
      return claimDateObj.toDateString() === today.toDateString();
    case "week":
      const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
      return claimDateObj >= weekAgo;
    case "month":
      const monthAgo = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);
      return claimDateObj >= monthAgo;
    default:
      return true;
  }
}