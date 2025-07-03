import { CheckCircle, Clock, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { DialogTitle } from "@/components/ui/dialog";
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
  claim: Claim | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function TrackProgressModal({
  claim,
  isOpen,
  onClose
}: TrackProgressModalProps) {
  if (!claim) return null;

  const getProgressSteps = () => {
    const baseSteps = [
      {
        id: 1,
        title: "Claim Submitted",
        description: "Your claim has been successfully submitted",
        date: "Dec 1, 2024",
        status: "completed" as const
      },
      {
        id: 2,
        title: "Initial Review",
        description: "Claim is under initial review by our team",
        date: "Dec 2, 2024",
        status: "completed" as const
      },
      {
        id: 3,
        title: "Documentation Verified",
        description: "All required documents have been verified",
        date: "Dec 3, 2024",
        status: claim.category === "uncategorized" ? "pending" : "completed" as const
      },
      {
        id: 4,
        title: "Assessment Complete",
        description: "Device assessment and damage evaluation completed",
        date: "Dec 4, 2024",
        status: claim.category === "uncategorized" || claim.category === "pending" ? "pending" : "completed" as const
      },
      {
        id: 5,
        title: "Final Approval",
        description: "Claim approved for payment processing",
        date: "Dec 5, 2024",
        status: claim.category === "completed" || claim.category === "approved" ? "completed" : 
               claim.category === "rejected" ? "rejected" : "pending" as const
      },
      {
        id: 6,
        title: "Payment Processed",
        description: "Payment has been transferred to your account",
        date: "Dec 6, 2024",
        status: claim.category === "completed" ? "completed" : "pending" as const
      }
    ];

    if (claim.category === "rejected") {
      return baseSteps.slice(0, 5).map((step, index) => ({
        ...step,
        status: index < 3 ? "completed" : index === 4 ? "rejected" : "pending" as const
      }));
    }

    return baseSteps;
  };

  const steps = getProgressSteps();

  const getStepIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case "rejected":
        return <AlertCircle className="w-5 h-5 text-red-600" />;
      default:
        return <Clock className="w-5 h-5 text-gray-400" />;
    }
  };

  const getStepColor = (status: string) => {
    switch (status) {
      case "completed":
        return "border-green-600 bg-green-50";
      case "rejected":
        return "border-red-600 bg-red-50";
      default:
        return "border-gray-300 bg-gray-50";
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-1xl max-h-[90vh] overflow-y-auto p-0 ">
        <VisuallyHidden>
    <DialogTitle>Track Device Progress</DialogTitle>
  </VisuallyHidden>
        <div className="bg-white">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b">
            <h2 className="text-lg font-semibold text-gray-900">Track Progress</h2>
            {/* <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="w-5 h-5" />
            </Button> */}
          </div>

          {/* Content */}
          <div className="p-6">
            {/* Claim Info */}
           

            {/* Progress Timeline */}
            <div className="space-y-6">
              {/* <h4 className="font-medium text-gray-900 mb-4">Claim Status</h4> */}
              
              <div className="relative">
                {/* Timeline line */}
                <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gray-200"></div>
                
                {steps.map((step, index) => (
                  <div key={step.id} className="relative flex items-start gap-4 pb-8 last:pb-0">
                    {/* Step icon */}
                    <div className={`flex items-center justify-center w-12 h-12 rounded-full border-2 ${getStepColor(step.status)} relative z-10`}>
                      {getStepIcon(step.status)}
                    </div>
                    
                    {/* Step content */}
                    <div className="flex-1 pt-2">
                      <div className="flex items-center justify-between">
                        <h5 className="font-medium text-gray-900">{step.title}</h5>
                        <span className="text-sm text-gray-500">{step.date}</span>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">{step.description}</p>
                      
                      {step.status === "completed" && (
                        <div className="flex items-center gap-1 mt-2">
                          <CheckCircle className="w-4 h-4 text-green-600" />
                          <span className="text-sm text-green-600">Completed</span>
                        </div>
                      )}
                      
                      {step.status === "rejected" && (
                        <div className="flex items-center gap-1 mt-2">
                          <AlertCircle className="w-4 h-4 text-red-600" />
                          <span className="text-sm text-red-600">Action Required</span>
                        </div>
                      )}
                      
                      {step.status === "pending" && (
                        <div className="flex items-center gap-1 mt-2">
                          <Clock className="w-4 h-4 text-orange-500" />
                          <span className="text-sm text-orange-500">In Progress</span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Status Summary */}
            <div className="mt-8 p-4 bg-blue-50 rounded-lg">
              <h5 className="font-medium text-blue-900 mb-2">Current Status</h5>
              <p className="text-sm text-blue-800">
                {claim.category === "completed" && "Your claim has been completed and payment processed."}
                {claim.category === "approved" && "Your claim has been approved and is being processed for payment."}
                {claim.category === "pending" && "Your claim is currently under review. We'll update you once the assessment is complete."}
                {claim.category === "uncategorized" && "Your claim requires additional documentation. Please provide the requested documents."}
                {claim.category === "rejected" && "Your claim has been rejected. Please review the reason and resubmit with additional documentation."}
              </p>
            </div>

            {/* Estimated Completion */}
            {claim.category !== "completed" && claim.category !== "rejected" && (
              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <h5 className="font-medium text-gray-900 mb-2">Estimated Completion</h5>
                <p className="text-sm text-gray-600">
                  Based on current processing times, your claim is expected to be completed within{" "}
                  <span className="font-medium">3-5 business days</span>.
                </p>
              </div>
            )}

            {/* Actions */}
            <div className="flex justify-end gap-3 mt-8">
              <Button variant="outline" onClick={onClose}>
                Close
              </Button>
              {claim.category === "rejected" && (
                <Button className="bg-blue-600 hover:bg-blue-700">
                  Resubmit Claim
                </Button>
              )}
              {claim.category !== "completed" && claim.category !== "rejected" && (
                <Button variant="outline" className="text-blue-600 border-blue-600">
                  Contact Support
                </Button>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
