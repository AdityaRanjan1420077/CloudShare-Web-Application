import React, { useState } from "react";
import { Copy, CheckCircle2 } from "lucide-react";
import toast from "react-hot-toast";
import Modal from "./Modal";

const LinkShareModal = ({
  isOpen,
  onClose,
  link,
}) => {

    const copyLink = async () => {
        try {
            await navigator.clipboard.writeText(link);
    
            setCopied(true);
            toast.success("Link copied to clipboard.");
    
            setTimeout(() => {
                setCopied(false);
            }, 2000);
    
        } catch (err) {
            toast.error("Unable to copy link.");
        }
    };
  const [copied, setCopied] = useState(false);

  return (
    <Modal
    isOpen={isOpen}
    onClose={onClose}
    title="Share File"
    confirmText={copied ? "Copied" : "Copy"}
    cancelText="Close"
    onConfirm={copyLink}
    confirmationButtonClass={
        copied
            ? "bg-green-600 hover:bg-green-700"
            : "bg-purple-600 hover:bg-purple-700"
    }
    size="md"
>
      <div className="space-y-5">

        
        <p className="text-gray-500">Share this link with others to give them access to this file.</p>

        <div className="flex items-center gap-2">

        <input
            type="text"
            readOnly
            value={link}
            className="flex-1 rounded-lg border border-gray-300 px-3 py-2 bg-gray-50 text-sm"
        />
 <button
    onClick={copyLink}
    className="bg-green-600 hover:bg-purple-700 text-white rounded-lg p-2 transition-all duration-300"
>
    {copied ? (
        <CheckCircle2
            size={18}
            className="animate-pulse bg-green-400"
        />
    ) : (
        <Copy
            size={18}
            className="transition-transform hover:scale-110"
        />
    )}
</button>

    </div>

    {/* Message below the input */}
    <div className="flex items-center gap-2 text-green-600">

        <CheckCircle2 size={20} />

        <span className="text-sm font-medium">
            Anyone with this link can access this file.
        </span>

    </div>

</div>
    </Modal>
  );
};

export default LinkShareModal;