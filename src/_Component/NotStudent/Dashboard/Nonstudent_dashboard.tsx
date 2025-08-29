import { useSession } from "next-auth/react";

export default function NonStudent_dashboard(){
    const { data: session } = useSession();
    console.log(session)
    return(
        <main>
            Non student
        </main>
    )
}