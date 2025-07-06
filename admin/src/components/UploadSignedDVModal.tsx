// // components/UploadSignedDVModal.tsx
// import { Dialog } from "@headlessui/react";
// import { X } from "lucide-react";
// import { useRef } from "react";

// interface Props {
//   isOpen: boolean;
//   onClose: () => void;
// }

// export default function UploadSignedDVModal({ isOpen, onClose }: Props) {
//   const fileInputRef = useRef<HTMLInputElement>(null);

//   return (
//     <Dialog open={isOpen} onClose={onClose} className="fixed inset-0 z-50 overflow-y-auto">
//       <div className="flex items-center justify-center min-h-screen px-4">
//         <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
//         <div className="relative bg-white w-full max-w-md p-6 mx-auto rounded-lg z-50 shadow-lg">
//           <button onClick={onClose} className="absolute top-4 right-4 text-black">
//             <X className="h-5 w-5" />
//           </button>

//           <Dialog.Title className="text-xl font-semibold text-center mb-1">Upload Signed DV</Dialog.Title>
//           <Dialog.Description className="text-sm text-gray-500 text-center mb-6">
//             Kindly upload your signed DV
//           </Dialog.Description>

//           <div
//             className="border-2 border-dashed border-[#8EC2F2] bg-[#F5F9FF] p-6 text-center cursor-pointer rounded-md mb-6"
//             onClick={() => fileInputRef.current?.click()}
//           >
//             <input type="file" hidden ref={fileInputRef} accept=".pdf,.doc,.docx" />
//             <div className="flex justify-center mb-2">
//               <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
//                 <path
//                   d="M12 16V4M12 4L8 8M12 4l4 4M4 20h16"
//                   stroke="#4A5568"
//                   strokeWidth="2"
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                 />
//               </svg>
//             </div>
//             <p className="text-blue-700 text-sm font-medium">
//               Upload signed DV
//             </p>
//             <p className="text-sm text-gray-500">or drag and drop</p>
//             <p className="text-xs text-gray-400 mt-1">PDF, DOC, or DOCX up to 30MB</p>
//           </div>

//           <button className="bg-[#004AAD] text-white w-full py-2 rounded-md text-sm font-medium hover:bg-blue-700">
//             Submit
//           </button>
//         </div>
//       </div>
//     </Dialog>
//   );
// }
import { Dialog } from "@headlessui/react";
import { X } from "lucide-react";
import { useRef } from "react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function UploadSignedDVModal({ isOpen, onClose }: Props) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  return (
    <Dialog open={isOpen} onClose={onClose} className="fixed inset-0 z-50 overflow-y-auto rounded-none">
      <div className="flex items-center justify-center min-h-screen px-4 relative">
        {/* Replacing Dialog.Overlay */}
        <div className="fixed inset-0 bg-opacity-30" style={{ background:'rgba(0,0,0,.5)' }} />

        <div className="relative bg-white w-full max-w-md p-6 mx-auto rounded-none z-50 shadow-lg">
          <button onClick={onClose} className="absolute top-4 right-4 text-black">
            <X className="h-5 w-5" />
          </button>

          <Dialog.Title className="text-xl font-semibold text-center mb-1">Upload Signed DV</Dialog.Title>
          <Dialog.Description className="text-sm text-gray-500 text-center mb-6">
            Kindly upload your signed DV
          </Dialog.Description>

          <div
            className="border-2 border-dashed border-[#8EC2F2] bg-[#F5F9FF] p-6 text-center cursor-pointer rounded-none mb-6"
            onClick={() => fileInputRef.current?.click()}
          >
            <input type="file" hidden ref={fileInputRef} accept=".pdf,.doc,.docx" />
            <div className="flex justify-center mb-2">
              <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path
                  d="M12 16V4M12 4L8 8M12 4l4 4M4 20h16"
                  stroke="#4A5568"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <p className="text-blue-700 text-sm font-medium">
              Upload signed DV
            </p>
            <p className="text-sm text-gray-500">or drag and drop</p>
            <p className="text-xs text-gray-400 mt-1">PDF, DOC, or DOCX up to 30MB</p>
          </div>

          <button className="bg-[#004AAD] text-white w-full py-2 rounded-none text-sm font-medium hover:bg-blue-700">
            Submit
          </button>
        </div>
      </div>
    </Dialog>
  );
}
