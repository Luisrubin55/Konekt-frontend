import {
  ArrowRightStartOnRectangleIcon,
  BellAlertIcon,
  ChatBubbleLeftEllipsisIcon,
  Cog6ToothIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import { NavLink } from "react-router-dom";

function Header({user}) {
  
  return (
    <header className="grid grid-cols-3 gap-5 justify-center items-center w-full p-5">
      <div>
        <img src="/logo.png" alt="logo konekt" className="w-40" />
      </div>
      <div className="flex gap-3 border-2 rounded-2xl hover:border-sky-500 border-white p-1">
        <MagnifyingGlassIcon className="text-white w-8" />
        <input
          type="text"
          placeholder="Buscar en Konekt"
          className="text-white p-2 border-0 w-full appearance-none focus:outline-none"
        />
      </div>
      <div>
        <nav className="flex justify-end gap-5">
          <button className="text-white hover:bg-sky-400 p-1 rounded-2xl">
            <ChatBubbleLeftEllipsisIcon className="w-10" />
          </button>
          <button className="text-white hover:bg-sky-400 p-1 rounded-2xl">
            <BellAlertIcon className="w-10" />
          </button>
          <div>
            <Popover className="relative">
              <PopoverButton>
                <img
                 src={user?.profilePictureUrl ? user?.profilePictureUrl : "/perfil.jpg"}
                  alt="imagen perfil user"
                  className="w-10 h-10 overflow-hidden object-cover rounded-full"
                />
              </PopoverButton>
              <PopoverPanel
                transition
                anchor="bottom"
                className=" flex flex-col w-90  rounded-xl bg-gray-900 text-sm/6 transition duration-200 ease-in-out [--anchor-gap:--spacing(5)] data-closed:-translate-y-1 data-closed:opacity-0 -translate-x-10 "
              >
                <div className="p-3">
                  <NavLink to={`/${user?.username}`} className="flex items-center gap-2 border-b-1 border-white pb-2">
                    <img
                      src={user?.profilePictureUrl ? user?.profilePictureUrl : "/perfil.jpg"}
                      alt="imagen perfil user"
                      className="w-10 h-10 overflow-hidden object-cover rounded-full"
                    />
                    <p className="text-white font-semibold text-xl">
                      {user?.name + " " + user?.paternalSurname}
                    </p>
                  </NavLink>
                  <div className="my-5 space-y-2">
                    <NavLink className="flex items-center gap-2 text-white text-md font-semibold">
                      <Cog6ToothIcon className="text-white w-9 bg-gray-950 rounded-full p-1" />
                      Configuración y privacidad
                    </NavLink>
                    <NavLink className="flex items-center gap-2 text-white text-md font-semibold">
                      <ArrowRightStartOnRectangleIcon className="text-white w-9 bg-gray-950 rounded-full p-1" />
                      Cerrar Sesión
                    </NavLink>
                  </div>
                </div>
              </PopoverPanel>
            </Popover>
          </div>
        </nav>
      </div>
    </header>
  );
}

export default Header;
