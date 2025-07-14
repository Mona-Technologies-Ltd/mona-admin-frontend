"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"

interface RejectClaimsModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function RejectClaimsModal({ isOpen, onClose }: RejectClaimsModalProps) {
  const [message, setMessage] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Rejection message:", message)
    // TODO: Add API call here
    setMessage("success")
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-[90vw] max-w-[400px] p-6 rounded-none">
        <DialogTitle className="text-center font-semibold text-lg">Reject Claims</DialogTitle>

        <form onSubmit={handleSubmit}>
          <div className="mt-6">
            <label htmlFor="rejection-message" className="block text-sm font-medium mb-1">
              Rejection message
            </label>
            <textarea
              id="rejection-message"
              placeholder="Enter rejection message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full border border-gray-300 p-3 text-sm outline-none focus:ring-2 focus:ring-blue-500 rounded-none resize-none"
              rows={4}
              required
            />
          </div>

          <button
            type="submit"
            className="mt-6 w-full bg-[#004AAD] hover:bg-[#00307a] text-white py-2 rounded-none text-sm shadow-md"
          >
            Submit
          </button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
