import { CheckCircle, X } from "lucide-react";

interface SuccessModalProps {
  title: string;
  message: string;
  onClose: () => void;
}

export default function SuccessModal({ title, message, onClose }: SuccessModalProps) {
  return (
    <div className="fixed inset-0 bg-black/75 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2">
            <CheckCircle className="text-green-500" size={24} />
            <h2 className="text-xl font-semibold text-green-600">{title}</h2>
          </div>
          <button 
            className="text-gray-500 hover:text-gray-700"
            onClick={onClose}
          >
            <X size={20} />
          </button>
        </div>
        
        <div className="text-center py-4">
          <CheckCircle className="mx-auto text-green-500 mb-4" size={48} />
          <p className="text-gray-600 mb-6">{message}</p>
        </div>
        
        <div className="flex justify-center">
          <button 
            className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
            onClick={onClose}
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
}