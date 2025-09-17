import Loading_Page from "@/_Component/Loading/Loading";
import Creating_Loading from "@/_Component/Loading/Creating_Loading";
import SuccessModal from "@/_Component/Modal/Success_Modal";
import { useSupervisorStore } from "@/store/useSupervisor";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

interface FormData {
  company: string;
  roomCode: string;
  roomName: string;
  roomDescription: string;
  companyLocation: string;
  supervisorEmail: string;
  supervisorUsername: string;
  supervisorName: string;
}

export default function Supervisor_Room() {
  const { data: session } = useSession();
  const { isLoading, rooms, userInfo, fetchUserData, fetchRooms } = useSupervisorStore();
  const [showSuccess, setShowSuccess] = useState<boolean>(false);
  const randomChoices =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const [randomCode, setRandomCode] = useState<string>("");
  const [showModal, setShowModal] = useState<boolean>(false);
  const [isCreating, setIsCreating] = useState<boolean>(false);
  const [inputRequired, setInputRequired] = useState<boolean>(false);
  const [formData, setFormData] = useState<FormData>({
    company: "",
    roomCode: "",
    roomName: "",
    roomDescription: "",
    companyLocation: "",
    supervisorEmail: "",
    supervisorUsername: "",
    supervisorName: "",
  });
  const generateRandomString = () => {
    const newCode = Array.from({ length: 5 }, () =>
      randomChoices.charAt(Math.floor(Math.random() * randomChoices.length))
    ).join("");
    setRandomCode(newCode);
    setShowModal(true);
  };

  const handleCreateRoom = async () => {
    if (!formData.roomName.trim() || !formData.roomDescription.trim() || !formData.companyLocation.trim()) {
      setInputRequired(true);
      return;
    }
    setInputRequired(false);
    setIsCreating(true);
    
    try {
      const submitData = {
        company: userInfo.company?.trim() || "",
        roomCode: randomCode,
        roomName: formData.roomName.trim(),
        roomDescription: formData.roomDescription.trim(),
        companyLocation: formData.companyLocation.trim(),
        supervisorEmail: session?.user?.email || "",
        supervisorUsername: session?.user?.username || "",
        supervisorName: session?.user?.name || "",
      };
      
      const response = await fetch("/api/request/Room/supervisor", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(submitData),
      });
      
      if (response.ok) {
        await fetchRooms(session?.user.email || "", session?.user.username || "");
        setShowSuccess(true);
        handleCancel();
      } else {
        alert("Failed to create room. Please try again.");
      }
    } catch (error) {
      console.error("Error creating room:", error);
      alert("Network error. Please try again.");
    } finally {
      setIsCreating(false);
    }
  };

  const handleCancel = () => {
    setShowModal(false);
    setInputRequired(false);
    setFormData({
      company: "",
      roomCode: "",
      roomName: "",
      roomDescription: "",
      companyLocation: "",
      supervisorEmail: "",
      supervisorUsername: "",
      supervisorName: "",
    });
    setRandomCode("");
  };
  useEffect(() => {
    if (session?.user?.id && !userInfo.id) {
      fetchUserData(session.user.id);
    }
    if (session?.user?.email && session?.user?.username) {
      fetchRooms(session.user.email, session.user.username);
    }
  }, [userInfo.id, session?.user?.id, session?.user?.email, session?.user?.username, fetchRooms, fetchUserData]);

  if (isLoading) {
    return <Loading_Page />;
  }

  if (isCreating) {
    return <Creating_Loading />;
  }

  if (showSuccess) {
    return (
      <SuccessModal
        title="Room Created!"
        message="The room has been created successfully."
        onClose={() => setShowSuccess(false)}
      />
    );
  }
  return (
    <main className="space-y-3.5">
      <button
        className="px-3 py-2 rounded-lg shadow bg-white"
        onClick={generateRandomString}
      >
        + Generate Room
      </button>
      {/* Here */}
      <section className={`${rooms.length > 1 ? "grid-cols-2" : "grid-cols-1"} grid gap-4`}>
        {rooms.map((room) => (
          <div key={room.room_code} className="bg-white rounded-lg shadow-lg p-4 border">
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-semibold text-lg text-gray-800">{room.room_name}</h3>
              <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                {room.room_code}
              </span>
            </div>
            <p className="text-gray-600 text-sm mb-3">{room.room_description}</p>
            <div className="space-y-1 text-xs text-gray-500">
              <p><span className="font-medium">Company:</span> {room.company}</p>
              <p><span className="font-medium">Location:</span> {room.company_location}</p>
              <p><span className="font-medium">Created:</span> {new Date(room.date).toLocaleDateString()}</p>
            </div>
          </div>
        ))}
      </section>
      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/75 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <h2 className="text-xl font-semibold mb-4">Create Room</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Company
                </label>
                <input
                  type="text"
                  value={userInfo.company || ""}
                  disabled
                  className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100 text-gray-600"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Room Code
                </label>
                <input
                  type="text"
                  value={randomCode}
                  disabled
                  className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100 text-gray-600"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Company Location
                </label>
                <input
                  type="text"
                  value={formData.companyLocation}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      companyLocation: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter Company Location"
                  required
                />
                {!formData.companyLocation.trim() && inputRequired && (
                  <p className="text-red-500 text-xs mt-1">
                    Company location is required.
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Room Name
                </label>
                <input
                  type="text"
                  value={formData.roomName}
                  onChange={(e) =>
                    setFormData({ ...formData, roomName: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter room name"
                />
              {!formData.roomName.trim() && inputRequired && (
                <p className="text-red-500 text-xs mt-1">
                  Room name is required.
                </p>
              )}
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Room Description
                </label>
                <textarea
                  value={formData.roomDescription}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      roomDescription: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter room description"
                  rows={3}
                />
                {!formData.roomDescription.trim() && inputRequired && (
                  <p className="text-red-500 text-xs">
                    Room description is required.
                  </p>
                )}
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={handleCancel}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                disabled={isCreating}
              >
                Cancel
              </button>
              <button
                onClick={handleCreateRoom}
                disabled={isCreating}
                className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50"
              >
                {isCreating ? "Creating..." : "Create"}
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
