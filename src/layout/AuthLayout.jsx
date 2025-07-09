import { Outlet } from "react-router-dom"
import { ToastContainer } from 'react-toastify';

export default function AuthLayout() {
  return (
    <>
        <main className="flex gap-10 justify-center items-center h-screen p-10">
            <div>
                <img 
                    src="/logo.png" 
                    alt="Imagen logotipo" 
                    className="w-xl"
                />
            </div>
            <Outlet />
        </main>
        <ToastContainer />
    </>
  )
}
