import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Check } from "lucide-react";

// interface TrackProgressModalProps {
//   isOpen: boolean;
//   onClose: () => void;
// }
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
interface TrackProgressModalProps {
  isOpen: boolean;
  onClose: () => void;
  claim: unknown; // fully loose
}

const steps = [
  "[John Doe – User] Claim a created",
  "Claim is assigned BY [Mona Tech – Business Center]",
  "[John Doe – Team Member] Validated the Claim",
  "[John Doe – Team Member] Approved/rejected the Claim",
  "Repair is Progress",
  "[John Doe – Team Member] Marked the Repair as completed",
  "[John Doe – Service Partner Admin] Approved/Queried Claim",
  "[John Doe – Service Partner Admin] Approved/Queried Claim",
  "[John Doe – Service Partner Admin] Uploaded unsigned DV",
  "[John Doe – Admin] Uploaded Signed DV",
  "[John Doe – Service Partner] Paid for Claim",
  "[John Doe – Admin] Paid Repairs"
];

export default function TrackProgressModal({
  isOpen,
  onClose,
  claim
  
}: TrackProgressModalProps) {
  console.log(claim)
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-xl h-[90vh] p-0 overflow-y-auto">
         <DialogTitle className="sr-only">Track Status</DialogTitle> {/* ✅ required for accessibility */}


        <div className="bg-white px-6 pt-6 pb-8">
          {/* Modal Header */}
          <h2 className="text-center text-lg font-semibold text-blue-700">Track Status</h2>
          <hr className="my-4 border-t border-gray-200" />

          {/* Timeline */}
          <div className="relative">
            {/* Full vertical line behind all dots */}
            <div className="absolute left-5 top-0 bottom-0 w-px bg-gray-300 z-0" />

            {/* Steps */}
            <div className="space-y-8">
              {steps.map((step, index) => (
                <div key={index} className="flex items-start gap-4 relative">
                  {/* Timeline dot */}
                  <div className="w-10 flex justify-center relative z-10">
                    {index === 0 ? (
                      <div className="w-5 h-5 bg-blue-600 rounded-full text-white flex items-center justify-center mt-0.5">
                        <Check className="w-3 h-3" />
                      </div>
                    ) : (
                      <div className="w-4 h-4 bg-gray-400 rounded-full mt-1.5"></div>
                    )}
                  </div>

                  {/* Step Content */}
                  <div className="flex-1">
                    <p className="text-sm font-medium text-black leading-snug">{step}</p>
                    <p className="text-xs text-gray-500 mt-1">February 28, 2025, 9:00AM</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
