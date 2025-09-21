import { CheckCircle, X } from "lucide-react";

interface FileAttachment {
  name: string;
  type: string;
  data: string;
}

interface FormData {
  date: string;
  hours_worked: string;
  entry_type: string;
  title: string;
  description: string;
  attachments: FileAttachment[];
}

interface LogbookModalProps {
  isOpen: boolean;
  isEditing: boolean;
  formData: FormData;
  tasks: string[];
  currentTask: string;
  onClose: () => void;
  onSubmit: (e: React.FormEvent) => void;
  onFormDataChange: (data: FormData) => void;
  onTasksChange: (tasks: string[]) => void;
  onCurrentTaskChange: (task: string) => void;
}

export default function LogbookModal({
  isOpen,
  isEditing,
  formData,
  tasks,
  currentTask,
  onClose,
  onSubmit,
  onFormDataChange,
  onTasksChange,
  onCurrentTaskChange,
}: LogbookModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/75 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">{isEditing ? "Edit Log" : "Add New Log"}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={20} />
          </button>
        </div>
        <form onSubmit={onSubmit} className="space-y-2">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Date</label>
              <input
                type="date"
                value={formData.date}
                onChange={(e) => onFormDataChange({ ...formData, date: e.target.value })}
                className={`w-full p-2 border rounded-lg ${isEditing ? 'bg-gray-100 cursor-not-allowed' : ''}`}
                readOnly={isEditing}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Hours Work</label>
              <input
                type="number"
                placeholder="8"
                value={formData.hours_worked}
                onChange={(e) => onFormDataChange({ ...formData, hours_worked: e.target.value })}
                readOnly={isEditing}
                className={`w-full p-2 border rounded-lg ${isEditing ? 'bg-gray-100 cursor-not-allowed' : ''}`}
                required
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Entry Type</label>
            <select
              value={formData.entry_type}
              onChange={(e) => onFormDataChange({ ...formData, entry_type: e.target.value })}
              className="w-full p-2 border rounded-lg"
            >
              <option value="daily">Daily Log</option>
              <option value="weekly">Weekly Log</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Title</label>
            <input
              type="text"
              placeholder="Enter log title"
              value={formData.title}
              onChange={(e) => onFormDataChange({ ...formData, title: e.target.value })}
              className="w-full p-2 border rounded-lg"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Detailed Description</label>
            <textarea
              rows={2}
              placeholder="Describe your activities..."
              value={formData.description}
              onChange={(e) => onFormDataChange({ ...formData, description: e.target.value })}
              className="w-full p-2 border rounded-lg resize-none"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Task Completed</label>
            <div className="space-y-2">
              <input
                type="text"
                value={currentTask}
                onChange={(e) => onCurrentTaskChange(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    if (currentTask.trim()) {
                      onTasksChange([...tasks, currentTask.trim()]);
                      onCurrentTaskChange("");
                    }
                  }
                }}
                placeholder="Add task and press Enter"
                className="w-full p-2 border rounded-lg"
              />
              {tasks.length > 0 && (
                <div className="space-y-1 bg-[#f8fafc] rounded-2xl p-3 text-[#8896a9]">
                  {tasks.map((task, index) => (
                    <div key={index} className="flex items-center gap-2 text-sm">
                      <span className="text-[#60c787]">
                        <CheckCircle size={10} />
                      </span>
                      <span className="flex-1">{task}</span>
                      <button
                        type="button"
                        onClick={() => onTasksChange(tasks.filter((_, i) => i !== index))}
                        className="text-red-500 hover:text-red-700"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Attachment</label>
            <input
              type="file"
              multiple
              accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
              onChange={async (e) => {
                if (e.target.files) {
                  const files = Array.from(e.target.files);
                  const fileAttachments = await Promise.all(
                    files.map(async (file) => {
                      const reader = new FileReader();
                      return new Promise<FileAttachment>((resolve) => {
                        reader.onload = () =>
                          resolve({
                            name: file.name,
                            type: file.type,
                            data: reader.result as string,
                          });
                        reader.readAsDataURL(file);
                      });
                    })
                  );
                  onFormDataChange({
                    ...formData,
                    attachments: fileAttachments,
                  });
                }
              }}
              className="w-full p-2 border rounded-lg text-sm"
            />
            {formData.attachments.length > 0 && (
              <div className="mt-2 text-sm text-gray-600">
                Selected files: {formData.attachments.map((f) => f.name).join(", ")}
              </div>
            )}
          </div>
          <div className="flex gap-2 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2 px-4 border rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              {isEditing ? "Update Log" : "Save Log"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}