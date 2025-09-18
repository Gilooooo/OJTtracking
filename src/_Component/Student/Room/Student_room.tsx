import { Plus, X } from "lucide-react";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useStudentStore } from "@/store/useStudentStore";
import SuccessModal from "@/_Component/Modal/Success_Modal";

export default function Student_Room() {
  const { data: session } = useSession();
  const { userInfo, fetchUserData } = useStudentStore();
  const [modalAppear, setModalAppear] = useState<boolean>(false);
  const [roomCode, setRoomCode] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showSuccess, setShowSuccess] = useState<boolean>(false);

  const handleModalAppear = () => {
    setModalAppear(!modalAppear);
    setErrorMessage("");
    setRoomCode("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    
    // Length validation
    if (roomCode.length !== 5) {
      setErrorMessage("Length");
      return;
    }
    
    setIsLoading(true);
    try {
      const response = await fetch('/api/request/Room/Enroll_room', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          roomCode,
          studentData: {
            id: session?.user?.id,
            name: session?.user?.name,
            email: session?.user?.email,
            phone: session?.user?.phone,
            student_id: userInfo.student_id,
            course: userInfo.course,
            school: userInfo.school,
            year_level: userInfo.year_level,
            hours_required: userInfo.hours_required
          }
        })
      });
      if (response.ok) {
        setModalAppear(false);
        setShowSuccess(true);
      } else {
        setErrorMessage("Room");
      }
    } catch (error) {
      console.error("Error enrolling in room:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (session?.user?.id) {
      fetchUserData(session.user.id);
    }
  }, [session?.user?.id, fetchUserData]);

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
          <div className="fixed inset-0 bg-black/75 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">Joining Room</h2>
                <button
                  onClick={() => setModalAppear(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X size={20} />
                </button>
              </div>
              <form className="space-y-2" onSubmit={handleSubmit}>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Room Code
                  </label>
                  <input
                    type="text"
                    value={roomCode}
                    onChange={(e) => {
                      setRoomCode(e.target.value);
                      setErrorMessage("");
                    }}
                    placeholder="Ask for code to your supervisor"
                    className="w-full py-2 px-3 border rounded-lg focus:outline-none"
                    maxLength={5}
                  />
                  {errorMessage === "Length" && <span className="text-red-500 text-xs mt-1 block">Room Code must be exactly 5 characters</span>}
                  {errorMessage === "Room" && <span className="text-red-500 text-xs mt-1 block">Room Code does not exist</span>}
                </div>
                <div className="flex gap-2 pt-3">
                  <button
                    type="button"
                    onClick={() => setModalAppear(false)}
                    className="flex-1 py-1 px-3 border rounded-lg hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="flex-1 py-1 px-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50"
                  >
                    {isLoading ? "Joining..." : "Join Room"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
      
      {showSuccess && (
        <SuccessModal
          title="Successfully Joined!"
          message="You have successfully joined the room."
          onClose={() => setShowSuccess(false)}
        />
      )}
    </main>
  );
}
