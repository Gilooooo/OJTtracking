"use client";
import Loading_Page from "@/_Component/Loading/Loading";
import MobileNavBar from "@/_Component/Navigation_Bar/MobileNavBar";
import NavBar from "@/_Component/Navigation_Bar/NavBar";
import NonStudent_dashboard from "@/_Component/NotStudent/Dashboard/Nonstudent_dashboard";
import NonStudent_LogBook from "@/_Component/NotStudent/LogBook/Nonstudent_logbook";
import Nonstudent_Profile from "@/_Component/NotStudent/Profile/Nonstudent_profile";
import Student_Dashboard from "@/_Component/Student/Dashboard/Student_dashboard";
import Student_LogBook from "@/_Component/Student/Logs/Student_logbook";
import Notification from "@/_Component/Student/Notifications/notification";
import Student_Profile from "@/_Component/Student/Profile/Student_Profile";
import Supervisor_Dashboard from "@/_Component/Supervisor/Dashboard/Supervisor_dashboard";
import Supervisor_Profile from "@/_Component/Supervisor/Profile/Supervisor_profile";
import Supervisor_Room from "@/_Component/Supervisor/Room/Supervisor_room";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function Dashboard() {
  const { data: session, status } = useSession();
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [activeSection, setActiveSection] = useState<string>("dashboard");
  const [isComponentLoading, setIsComponentLoading] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") return;
    if (!session) {
      router.push("/Login");
    }
  }, [session, status, router]);

  const handleLogout = async () => {
    await signOut({ redirect: false });
    router.push("/");
  };

  if (status === "loading") {
    return <Loading_Page />;
  }

  if (!session) {
    return null;
  }

  const renderSection = () => {
    const role = session.user?.role;

    switch (activeSection) {
      case "dashboard":
        if (role === "supervisor") {
          return <Supervisor_Dashboard />;
        } else if (role === "student") {
          return <Student_Dashboard />;
        } else if (role === "non-student") {
          return <NonStudent_dashboard  setActiveSection={setActiveSection}/>;
        }
        break;
      case "logbook":
        if (role === "supervisor") {
        }
        else if (role === "student") {
          return <Student_LogBook/>;
        }
        else if(role === "non-student"){
          return <NonStudent_LogBook/>
        }
        
      case "profile":
        if (role === "supervisor") {
          return <Supervisor_Profile />;
        } else if (role === "student") {
          return <Student_Profile />;
        } else if (role === "non-student") {
          return <Nonstudent_Profile handleLogout = {handleLogout}/>;
        }
        break;
      case "notifications":
        return <Notification />;
      case "room":
        return <Supervisor_Room />;
      default:
        if (role === "supervisor") {
          return <Supervisor_Dashboard />;
        } else if (role === "student") {
          return <Student_Dashboard />;
        } else if (role === "non-student") {
          return <NonStudent_dashboard setActiveSection={setActiveSection}/>;
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
        setIsComponentLoading={setIsComponentLoading}
      />
      <section className="flex h-full text-black">
        <NavBar
          activeSection={activeSection}
          setActiveSection={setActiveSection}
          handleLogout={handleLogout}
          setIsComponentLoading={setIsComponentLoading}
        />
        <section className="bg-[#f8fafc] flex-1 h-full overflow-y-auto">
          <section className="max-w-4xl bg-[#f8fafc] m-auto min-h-full py-4 px-3">
            {isComponentLoading ? <Loading_Page /> : renderSection()}
          </section>
        </section>
      </section>
    </main>
  );
}
