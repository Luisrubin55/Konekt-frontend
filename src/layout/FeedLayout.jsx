import { Link, Outlet } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { HomeIcon, MagnifyingGlassIcon, TvIcon, UserGroupIcon } from "@heroicons/react/24/outline";
import Header from "../components/Header";
import {getUserByEmail} from "../api/AuthAPI"

function FeedLayout() {
  const localData = JSON.parse(localStorage.getItem("AUTH_TOKEN"));

  const email = localData.email;

  const { data:user } = useQuery({
    queryKey: ["user", email],
    queryFn: ({ queryKey }) => getUserByEmail(queryKey[1])
  });

  return (
    <>
      <Header 
        user={user}
      />
      <div className="flex fixed">
        <aside className="w-64 text-white p-4">
          <ul className="space-y-5">
            <li className="">
              <Link to={"/"} className="flex items-center gap-3 font-bold text-xl hover:bg-slate-700 p-1 rounded-2xl"><HomeIcon className="w-10" />Inicio</Link>
            </li>
            <li>
              <Link to={"/"} className="flex items-center gap-3 font-bold text-xl hover:bg-slate-700 p-1 rounded-2xl"><MagnifyingGlassIcon className="w-10" />Explorar</Link>
            </li>
            <li>
              <Link to={"/"} className="flex items-center gap-3 font-bold text-xl hover:bg-slate-700 p-1 rounded-2xl"><UserGroupIcon className="w-10" />Amigos</Link>
            </li>
            <li>
              <Link to={"/"} className="flex items-center gap-3 font-bold text-xl hover:bg-slate-700 p-1 rounded-2xl"><TvIcon className="w-10" />Videos</Link>
            </li>
          </ul>
        </aside>
        <main className="ml-20 h-screen overflow-y-auto">
          <Outlet 
            user={user}
          />
        </main>
      </div>
    </>
  );
}

export default FeedLayout;
