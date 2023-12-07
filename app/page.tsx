import Todos from "@/components/Todos";
import { userSession } from "@/libs/userSession";
import { redirect } from "next/navigation";

export default async function Home() {
  const {data} = await userSession();
  if (!data.session) {
    return redirect('/signin')
  }
  
  return (
    <div className="flex justify-center items-center h-full">
      <div className="md:w-1/3 w-2/3 bg-zinc-200 p-5 shadow-md rounded-md">
        <Todos/>
      </div>
    </div>
  )
}
