import { X } from "lucide-react";
import { useEffect, useState } from "react";

interface ErrorItem {
  id: string;
  message: string;
}

interface ErrorModalProps {
  errors: ErrorItem[];
  onRemoveError: (id: string) => void;
}

export default function Error_Modal({ errors, onRemoveError }: ErrorModalProps) {
  useEffect(() => {
    errors.forEach((error) => {
      const timer = setTimeout(() => {
        onRemoveError(error.id);
      }, 3000);
      return () => clearTimeout(timer);
    });
  }, [errors, onRemoveError]);

  return (
    <div className="fixed bottom-4 right-4 z-50 space-y-2">
      {errors.map((error) => (
        <div
          key={error.id}
          className="bg-red-500 text-white p-4 rounded-lg shadow-lg flex items-center gap-3 min-w-80 animate-slide-in"
        >
          <span className="flex-1 text-sm">{error.message}</span>
          <button
            onClick={() => onRemoveError(error.id)}
            className="text-white hover:text-gray-200"
          >
            <X size={16} />
          </button>
        </div>
      ))}
    </div>
  );
}

// Hook for managing errors
export function useErrorModal() {
  const [errors, setErrors] = useState<ErrorItem[]>([]);

  const addError = (message: string) => {
    const id = Date.now().toString();
    setErrors((prev) => [...prev, { id, message }]);
  };

  const removeError = (id: string) => {
    setErrors((prev) => prev.filter((error) => error.id !== id));
  };

  return { errors, addError, removeError };
}