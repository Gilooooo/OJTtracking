import { X } from "lucide-react";

interface AlertModalProps {
  isOpen: boolean;
  title?: string;
  message: string;
  onCancel: () => void;
  onProceed: () => void;
  cancelText?: string;
  proceedText?: string;
}

export default function Alert_Modal({
  isOpen,
  title = "Alert",
  message,
  onCancel,
  onProceed,
  cancelText = "Cancel",
  proceedText = "Proceed"
}: AlertModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/75 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">{title}</h2>
          <button
            onClick={onCancel}
            className="text-gray-500 hover:text-gray-700"
          >
            <X size={20} />
          </button>
        </div>
        <section className="space-y-2">
          <div>
            <p className="text-center">{message}</p>
          </div>
          <div className="flex gap-2 pt-4">
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 py-2 px-4 border rounded-lg hover:bg-gray-50"
            >
              {cancelText}
            </button>
            <button
              onClick={onProceed}
              className="flex-1 py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              {proceedText}
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}