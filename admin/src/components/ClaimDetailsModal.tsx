"use client";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import VideoModal from "./VideoModal";
import { useState } from "react";
import { DialogTitle } from "@/components/ui/dialog";
import TrackProgressModal from "./TrackProgressModal"; // Adjust import as needed
import ReviewCard from "./ReviewCard";

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
    <div className="bg-white">
      {/* Header */}
      <div className="flex items-center justify-between p-0 border-b">
        <h2 className="text-lg font-semibold text-gray-900">Uncategorized Details</h2>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="w-5 h-5" />
        </Button>
      </div>

      {/* Content */}
      <div className="p-0">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
            <span className="text-lg">📱</span>
          </div>
          <div>
            <h3 className="font-medium text-gray-900">{claim.deviceModel}</h3>
            <p className="text-sm text-gray-500">Claim ID: {claim.claimId}</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-500">Device Model</label>
              <p className="text-sm text-gray-900 mt-1">{claim.deviceModel}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">Brand</label>
              <p className="text-sm text-gray-900 mt-1">{claim.brand}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-500">IMEI</label>
              <p className="text-sm text-gray-900 mt-1">{claim.imei}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">Amount</label>
              <p className="text-sm text-gray-900 mt-1">₦{claim.amount.toLocaleString()}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-500">Status</label>
              <p className="text-sm text-gray-900 mt-1 capitalize">{claim.status}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">Insurer</label>
              <p className="text-sm text-gray-900 mt-1">{claim.insurer}</p>
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-500">Date</label>
            <p className="text-sm text-gray-900 mt-1">{claim.date}</p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3 mt-8">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
           <Button
  type="button" // 👈 prevent default submit behavior
  variant="outline"
  onClick={(e) => {
    alert(3333);
    e.stopPropagation();
    handleTrackProgress();
    alert(99999);
  }}
  className="flex-1 text-sm rounded-none"
>
  Track Progress
  {/* </Button */}
</Button>

        </div>
       
      </div>
    </div>
  );

  const renderPendingModal = () => (
    <div className="bg-white  p-0">
      {/* Blue Header */}
      <div className="bg-blue-600 text-white text-center w-full p-4">
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
          <div><span className="font-medium">Status:</span> <span className="text-orange-500">Premium</span></div>
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
                  <td className="p-2 text-blue-600">AD001</td>
                  <td className="p-2">{claim.brand}</td>
                  <td className="p-2">{claim.deviceModel}</td>
                  <td className="p-2">{claim.imei}</td>
                  <td className="p-2">
                    <button className="text-blue-600 underline text-xs">View More</button>
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
            <button className="text-blue-600 border border-blue-600 px-3 py-1 rounded-none text-xs">
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
          <Button className="bg-blue-600 hover:bg-blue-700 text-white flex-1 text-sm rounded-none">
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

  const renderApprovedModal = () => (
    <div className="bg-white  p-0">
      {/* Blue Header */}
      <div className="bg-blue-600 text-white text-center w-full p-4">
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
          <div><span className="font-medium">Status:</span> <span className="text-orange-500">Premium</span></div>
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
                  <td className="p-2 text-blue-600">AD001</td>
                  <td className="p-2">{claim.brand}</td>
                  <td className="p-2">{claim.deviceModel}</td>
                  <td className="p-2">{claim.imei}</td>
                  <td className="p-2">
                    <button className="text-blue-600 underline text-xs">View More</button>
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
            <button className="text-blue-600 border border-blue-600 px-3 py-1 rounded-none text-xs">
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
         
           {/* <Button
              type="button" // 👈 prevent default submit behavior
              variant="outline"
              onClick={(e) => {
                // alert(3333);
                e.stopPropagation();
                handleTrackProgress();
                // alert(99999);
              }}
              className="w-[30%] bg-blue-600 hover:bg-blue-700 text-white flex-1 text-sm rounded-none"
            >
              Track Progress
        
            </Button> */}
  <div className="flex justify-end">
            <Button  type="button" // 👈 prevent default submit behavior
              variant="outline"
              onClick={(e) => {
                // alert(3333);
                e.stopPropagation();
                handleTrackProgress();
                // alert(99999);
              }} className="border border-blue-600 text-blue-600 text-sm px-4 py-2 rounded-none ">Track Progress</Button>
          </div>
          {/* <Button variant="outline" className="text-red-600 border-red-600 flex-1 text-sm rounded-none">
            Reject
          </Button> */}
        </div>
      </div>
        
    </div>
  );
  const renderCompletedModal = () => (
    <div className="bg-white">
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b">
        <h2 className="text-lg font-semibold text-gray-900">Completed Claims Details - {claim.claimId}</h2>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="w-5 h-5" />
        </Button>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Device Info Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
            <span className="text-lg">✅</span>
          </div>
          <div>
            <h3 className="font-medium text-gray-900">{claim.deviceModel}</h3>
            <p className="text-sm text-green-600">Claim Completed Successfully</p>
          </div>
        </div>

        {/* Details Section */}
        <div className="space-y-6">
          <div>
            <h4 className="font-medium text-gray-900 mb-3">Claim Summary</h4>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-500">Claim ID:</span>
                <span className="ml-2 text-gray-900">{claim.claimId}</span>
              </div>
              <div>
                <span className="text-gray-500">Final Amount:</span>
                <span className="ml-2 text-green-600 font-medium">₦{claim.amount.toLocaleString()}</span>
              </div>
              <div>
                <span className="text-gray-500">Completion Date:</span>
                <span className="ml-2 text-gray-900">{claim.date}</span>
              </div>
              <div>
                <span className="text-gray-500">Processing Time:</span>
                <span className="ml-2 text-gray-900">7 days</span>
              </div>
              <div>
                <span className="text-gray-500">Payment Status:</span>
                <span className="ml-2 text-green-600">Paid</span>
              </div>
              <div>
                <span className="text-gray-500">Reference:</span>
                <span className="ml-2 text-gray-900">REF-{claim.claimId}</span>
              </div>
            </div>
          </div>

          {/* Resolution Details */}
          <div>
            <h4 className="font-medium text-gray-900 mb-3">Resolution Details</h4>
            <div className="bg-green-50 p-4 rounded-lg">
              <p className="text-sm text-gray-700">
                Claim has been processed and approved. Payment of ₦{claim.amount.toLocaleString()} has been 
                transferred to the customers account. All documentation has been verified and the case is now closed.
              </p>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3 mt-8">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
          <Button onClick={() => {}} variant="outline" className="text-blue-600 border-blue-600">
            Download Receipt
          </Button>
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
        return renderApprovedModal(); // Similar layout to pending
      case "rejected":
        return (
          <div className="bg-red-900">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="text-lg font-semibold text-gray-900">Rejected Claims</h2>
              {/* <Button variant="ghost" size="icon" onClick={onClose}>
                <X className="w-5 h-5" />
              </Button> */}
            </div>

            {/* Content */}
            <div className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                  <span className="text-lg">❌</span>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">{claim.deviceModel}</h3>
                  <p className="text-sm text-red-600">Claim Rejected</p>
                </div>
              </div>

              <div className="bg-red-50 p-4 rounded-lg mb-6">
                <h4 className="font-medium text-red-800 mb-2">Rejection Reason</h4>
                <p className="text-sm text-red-700">
                  Insufficient documentation provided. Please submit additional proof of purchase 
                  and damage assessment photos to proceed with the claim.
                </p>
              </div>

              <div className="flex justify-end gap-3">
                <Button variant="outline" onClick={onClose}>
                  Close
                </Button>
                <Button className="bg-blue-600 hover:bg-blue-700">
                  Resubmit Claim
                </Button>
              </div>
            </div>
          
          </div>
        );
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