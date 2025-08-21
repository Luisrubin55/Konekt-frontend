import { Link } from "react-router-dom";
import { HomeIcon, MagnifyingGlassIcon, TvIcon, UserGroupIcon } from "@heroicons/react/24/outline";

function NavBar() {
  return (
    <aside className="w-64 text-white p-4">
      <ul className="space-y-5">
        <li className="">
          <Link
            to={"/"}
            className="flex items-center gap-3 font-bold text-xl hover:bg-slate-700 p-1 rounded-2xl"
          >
            <HomeIcon className="w-10" />
            Inicio
          </Link>
        </li>
        <li>
          <Link
            to={"/"}
            className="flex items-center gap-3 font-bold text-xl hover:bg-slate-700 p-1 rounded-2xl"
          >
            <MagnifyingGlassIcon className="w-10" />
            Explorar
          </Link>
        </li>
        <li>
          <Link
            to={"/"}
            className="flex items-center gap-3 font-bold text-xl hover:bg-slate-700 p-1 rounded-2xl"
          >
            <UserGroupIcon className="w-10" />
            Amigos
          </Link>
        </li>
        <li>
          <Link
            to={"/"}
            className="flex items-center gap-3 font-bold text-xl hover:bg-slate-700 p-1 rounded-2xl"
          >
            <TvIcon className="w-10" />
            Videos
          </Link>
        </li>
      </ul>
    </aside>
  );
}

export default NavBar;
