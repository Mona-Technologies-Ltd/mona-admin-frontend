// import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { DialogTitle } from "@/components/ui/dialog";

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoTitle?: string;
  videoSrc?: string;
}

export default function VideoModal({
  isOpen,
  onClose,
  videoTitle = "Frame: 65484/38001"
}: VideoModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto p-0">
        <div className="bg-white">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b">
            {/* <h2 className="text-lg font-semibold text-gray-900">{videoTitle}</h2> */}
            <DialogTitle className="text-lg font-semibold text-gray-900">{videoTitle}</DialogTitle>

            {/* <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="w-5 h-5" />
            </Button> */}
          </div>

          {/* Video Frame Content */}
          <div className="p-6">
            <div className="space-y-4">
              {/* Video Frame 1 */}
              <div className="bg-gray-900 rounded-lg overflow-hidden">
                <div className="aspect-video bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center">
                  <div className="text-center text-white">
                    <div className="w-16 h-16 bg-gray-600 rounded-lg flex items-center justify-center mx-auto mb-2">
                      <span className="text-2xl">▶</span>
                    </div>
                    <p className="text-sm text-gray-300">Video Frame 1</p>
                  </div>
                </div>
              </div>

              {/* Video Frame 2 */}
              <div className="bg-gray-900 rounded-lg overflow-hidden">
                <div className="aspect-video bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center">
                  <div className="text-center text-white">
                    <div className="w-16 h-16 bg-gray-600 rounded-lg flex items-center justify-center mx-auto mb-2">
                      <span className="text-2xl">▶</span>
                    </div>
                    <p className="text-sm text-gray-300">Video Frame 2</p>
                  </div>
                </div>
              </div>

              {/* Video Frame 3 */}
              <div className="bg-gray-900 rounded-lg overflow-hidden">
                <div className="aspect-video bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center">
                  <div className="text-center text-white">
                    <div className="w-16 h-16 bg-gray-600 rounded-lg flex items-center justify-center mx-auto mb-2">
                      <span className="text-2xl">▶</span>
                    </div>
                    <p className="text-sm text-gray-300">Video Frame 3</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-3 mt-6">
              <Button variant="outline" onClick={onClose}>
                Close
              </Button>
              <Button className="bg-blue-600 hover:bg-blue-700">
                Play All
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}