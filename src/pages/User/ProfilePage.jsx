import { Cog8ToothIcon, LinkIcon } from "@heroicons/react/24/outline";

function ProfilePage() {
  return (
    <div className="flex flex-col gap-5 justify-center mt-4">
      <div className="flex gap-5 items-center justify-center">
        <div>
          <img
            src="/perfil.jpg"
            alt="perfil"
            className="w-50 rounded-full border-8 border-sky-500"
          />
        </div>
        <div className="flex flex-col gap-4">
          <h2 className="text-white text-5xl font-bold">Luis Armando</h2>
          <h3 className="text-white text-3xl">@luisarenas234</h3>
          <div className="flex gap-2 items-center">
            <button className="text-xl text-white bg-sky-600 p-2 font-bold rounded-xl hover:bg-sky-700">Editar perfil</button>
            <button className=" flex items-center text-xl text-white bg-red-600 p-2 font-bold rounded-xl hover:bg-red-700">
              <Cog8ToothIcon className="text-white w-6" />
              Cofiguración
            </button>
            <button className="w-10 p-1 text-white bg-green-600 font-bold rounded-xl hover:bg-green-700"><LinkIcon className="w-8" /></button>
          </div>
        </div>
      </div>

      <div className="mt-10 flex gap-5">
        <p className="text-white">Publicaciones</p>
        <p className="text-white">Amigos</p>
        <p className="text-white">Seguidores</p>
        <p className="text-white">Multimedia</p>
      </div>
    </div>
  );
}

export default ProfilePage;
