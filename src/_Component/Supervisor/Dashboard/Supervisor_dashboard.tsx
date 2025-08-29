import { useSession } from "next-auth/react";
import { useEffect } from "react";

export default function Supervisor_Dashboard() {
  const { data: session } = useSession();

  useEffect(() => {
    const fetchData = async () => {
      if (session?.user?.id) {
        const response = await fetch(`/api/request/supervisor?id=${session?.user?.id}`);
        console.log(response);
      }
    };
    fetchData();
  }, [session]);

  return <main>Supervisor</main>;
}
