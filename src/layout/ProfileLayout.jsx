import { Outlet } from "react-router-dom"
import NavBar from "../components/NavBar"

function ProfileLayout() {
  return (
   <>
      <div className="flex">
        <div className="flex flex-col ">
          <img src="/logo.png" alt="logo konekt" className="w-40 mt-6 ml-5 mb-7" />
          <NavBar />
        </div>
        <main className="h-screen w-full overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </>
  )
}

export default ProfileLayout