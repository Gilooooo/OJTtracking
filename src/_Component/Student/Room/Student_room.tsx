import { Plus, X } from "lucide-react";
import { useState } from "react";

export default function Student_Room() {
  const [modalAppear, setModalAppear] = useState<boolean>(false);

  const handleModalAppear = () => {
    setModalAppear(!modalAppear);
  };

  return (
    <main>
      <div className="relative">
        <button
          className="flex items-center py-2 px-3 rounded-2xl shadow-lg gap-2 text-md"
          onClick={handleModalAppear}
        >
          <Plus size={12} /> Join Room
        </button>
        {modalAppear && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">Edit Profile</h2>
                <button
                  onClick={() => setModalAppear(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X size={20} />
                </button>
              </div>
              <form className="space-y-2">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Room Code
                  </label>
                  <input
                    type="tel"
                    placeholder="Ask for code to your supervisor"
                    className="w-full py-1 px-3 border rounded-lg focus:outline-none"
                  />
                </div>
                {/* <div className="max-w-md -mx-6">
                  {dropdown ? (
                    <button
                      className="flex items-center gap-2 w-full justify-center bg-gray-100 py-1 text-sm"
                      onClick={(e) => {
                        setDropdown(!dropdown);
                        e.preventDefault();
                      }}
                    >
                      Academic Information <ChevronDown />
                    </button>
                  ) : (
                    <button
                      className="flex items-center gap-2 w-full justify-center bg-gray-100 py-1 text-sm"
                      onClick={(e) => {
                        setDropdown(!dropdown);
                        e.preventDefault();
                      }}
                    >
                      Academic Information <ChevronUp />
                    </button>
                  )}
                </div> */}
                {/* <div
                  className={`overflow-hidden transition-all duration-300 ${
                    dropdown ? "max-h-lvh opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Course
                    </label>
                    <input
                      type="text"
                      defaultValue={studentInfo?.course.trim()}
                      className="w-full py-1 px-3 border rounded-lg focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Year Level
                    </label>
                    <input
                      type="text"
                      defaultValue={studentInfo?.year_level.trim()}
                      className="w-full py-1 px-3 border rounded-lg focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Gwa
                    </label>
                    <input
                      type="text"
                      defaultValue={0}
                      className="w-full py-1 px-3 border rounded-lg focus:outline-none"
                    />
                  </div>
                </div> */}
                <div className="flex gap-2 pt-4">
                  <button
                    type="button"
                    onClick={() => setModalAppear(false)}
                    className="flex-1 py-2 px-4 border rounded-lg hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
