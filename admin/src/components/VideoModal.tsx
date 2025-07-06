import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Download } from "lucide-react"; // or any icon library you're using

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function VideoModal({ isOpen, onClose }: VideoModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto p-6 bg-white">
          <DialogTitle className="sr-only">Video Modal</DialogTitle> {/* ✅ required for accessibility */}

        <div className="space-y-8">
          {/* Onboarding Video */}
          <div>
            <div className="flex items-center justify-between mb-3 rounded-none">
              <h3 className="text-md font-semibold text-black">Onboarding Video</h3>
              <Button
                variant="outline"
                className="border-[#004AAD] text-[#004AAD] hover:bg-blue-50 rounded-none"
              >
                Download Video
                <Download className="ml-2 w-4 h-4" />
              </Button>
            </div>
            <div className="bg-[#2e2e2e] rounded-none aspect-video flex items-center justify-center">
              <div className="w-10 h-10 border border-red-500 rounded-md flex items-center justify-center">
                <span className="text-red-500 text-sm">▶</span>
              </div>
            </div>
          </div>

          {/* Damage Video */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-md font-semibold text-black">Damage Video</h3>
              <Button
                variant="outline"
                className="border-[#004AAD] text-[#004AAD] hover:bg-blue-50 rounded-none"
              >
                Download Video
                <Download className="ml-2 w-4 h-4" />
              </Button>
            </div>
            <div className="bg-[#2e2e2e] rounded-none aspect-video flex items-center justify-center">
              <div className="w-10 h-10 border border-red-500 rounded-md flex items-center justify-center">
                <span className="text-red-500 text-sm">▶</span>
              </div>
            </div>
          </div>

          {/* Completed Video */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-md font-semibold text-black">Completed Video</h3>
              <Button
                variant="outline"
                className="border-[#004AAD] text-[#004AAD] hover:bg-blue-50 rounded-none"
              >
                Download Video
                <Download className="ml-2 w-4 h-4" />
              </Button>
            </div>
            <div className="bg-[#2e2e2e] rounded-none aspect-video flex items-center justify-center">
              <div className="w-10 h-10 border border-red-500 rounded-md flex items-center justify-center">
                <span className="text-red-500 text-sm">▶</span>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
