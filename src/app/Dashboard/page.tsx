"use client";
import MobileNavBar from "@/_Component/Navigation_Bar/MobileNavBar";
import NavBar from "@/_Component/Navigation_Bar/NavBar";
import NonStudent_dashboard from "@/_Component/NotStudent/Dashboard/Nonstudent_dashboard";
import Nonstudent_Profile from "@/_Component/NotStudent/Profile/Nonstudent_profile";
import Student_Dashboard from "@/_Component/Student/Dashboard/Student_dashboard";
import LogBook from "@/_Component/Student/Logs/Logbook";
import Notification from "@/_Component/Student/Notifications/notification";
import Student_Profile from "@/_Component/Student/Profile/Student_Profile";
import Supervisor_Dashboard from "@/_Component/Supervisor/Dashboard/Supervisor_dashboard";
import Supervisor_Profile from "@/_Component/Supervisor/Profile/Supervisor_profile";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function Dashboard() {
  const { data: session, status } = useSession();
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [activeSection, setActiveSection] = useState<string>("dashboard");
  const router = useRouter();

  useEffect(() => {
    if (status === 'loading') return;
    if (!session) {
      router.push('/Login');
    } else {
      console.log('Session data:', session);
    }
  }, [session, status, router]);

  const handleLogout = async () => {
    await signOut({ redirect: false });
    router.push("/");
  };

  if (status === 'loading') {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  const renderSection = () => {
    const role = session.user?.role;
    
    switch (activeSection) {
      case "dashboard":
        if (role === 'supervisor') {
          return <Supervisor_Dashboard/>;
        } else if (role === 'student') {
          return <Student_Dashboard />;
        } else if (role === "non-student") {
          return <NonStudent_dashboard/>;
        }
        break;
      case "logbook":
        return <LogBook />;
      case "profile":
        if (role === 'supervisor') {
          return <Supervisor_Profile/>; // Add Supervisor_Profile component here
        } else if (role === 'student') {
          return <Student_Profile />;
        } else if (role === "non-student") {
          return <Nonstudent_Profile/>; // Add NonStudent_Profile component here
        }
        break;
      case "notifications":
        return <Notification />;
      default:
        if (role === 'supervisor') {
          return <Supervisor_Dashboard/>;
        } else if (role === 'student') {
          return <Student_Dashboard />;
        } else if (role === "non-student") {
          return <NonStudent_dashboard/>;
        }
    }
  };

  return (
    <main className="w-full h-screen">
      {/* Mobile Hamburger Nav */}
      <MobileNavBar 
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        handleLogout={handleLogout}
      />
      <section className="flex h-full text-black">
        <NavBar 
          activeSection={activeSection}
          setActiveSection={setActiveSection}
          handleLogout={handleLogout}
        />
        <section className="bg-[#f8fafc] flex-1 h-full overflow-y-auto">
          <section className="max-w-4xl bg-[#f8fafc] m-auto min-h-full py-4 px-3">
            {renderSection()}
          </section>
        </section>
      </section>
    </main>
  );
}
