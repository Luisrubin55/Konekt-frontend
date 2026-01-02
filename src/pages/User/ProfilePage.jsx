import { use, useState } from "react";
import { Cog8ToothIcon, LinkIcon } from "@heroicons/react/24/outline";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import MenuProfile from "../../components/MenuProfile";
import {getUserByUsername, updatePhotoProfile} from "../../api/UserAPI"
import { useParams } from "react-router-dom";
import useUser from "../../hooks/useUser";


function ProfilePage() {
  const [preview, setPreview] = useState(null);
  const [file, setFile] = useState(null);

  const {username} = useParams();
  const { data:userAuthenticated } = useUser();

  const { data: user } = useQuery({
        queryKey: ["profile", username],
        queryFn: () => getUserByUsername(username),
  });
  

  const manejarArchivo = (e) => {
    const archivo = e.target.files[0];
    if (archivo) {
      setPreview(URL.createObjectURL(archivo));
      setFile(e.target.files[0]);
    }
  };

  const { mutateAsync } = useMutation({
    mutationFn: updatePhotoProfile,
    onSuccess: (data) => {
      console.log(data);
      toast.success(data.message);
      setPreview(null)
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const uploadNewProfilePhoto = () => {
    const data = new FormData()
    data.append("file", file)
    mutateAsync(data)
  };

  const cancelImagePhoto = () => {
    setPreview(null);
  };

  return (
    <div className="flex flex-col justify-center mt-10">
      <div className="flex gap-10 items-center ">
        <div>
          <label htmlFor="fileInput">
            <img
              src={
                preview
                  ? preview
                  : user?.profilePictureUrl
                  ? user?.profilePictureUrl
                  : "/perfil.jpg"
              }
              alt="perfil"
              className="w-50 h-50 overflow-hidden object-cover rounded-full border-8 border-sky-500"
            />
            <input
              type="file"
              id="fileInput"
              className="hidden"
              onChange={manejarArchivo}
            />
          </label>
          {preview ? (
            <div className="flex mt-3 gap-5 justify-center items-center">
              <button
                onClick={uploadNewProfilePhoto}
                className="bg-green-600 p-1 rounded-xl hover:bg-green-500 text-white font-bold"
              >
                Aceptar
              </button>
              <button
                onClick={cancelImagePhoto}
                className="bg-red-600 p-1 rounded-xl hover:bg-red-500 text-white font-bold"
              >
                Cancelar
              </button>
            </div>
          ) : (
            ""
          )}
        </div>
        <div className="flex flex-col gap-4">
          <h2 className="text-white text-5xl font-bold">
            {user?.name + " " + user?.paternalSurname}
          </h2>
          <h3 className="text-white text-3xl">{user?.username}</h3>
          <div className="flex gap-2 items-center">
            <button className="text-xl text-white bg-sky-600 p-2 font-bold rounded-xl hover:bg-sky-700">
              { userAuthenticated?.id == user?.id ? "Editar perfil" : "Agregar a amigos" }
            </button>
            <button className=" flex items-center text-xl text-white bg-red-600 p-2 font-bold rounded-xl hover:bg-red-700">
              <Cog8ToothIcon className="text-white w-6" />
              Cofiguración
            </button>
            <button className="w-10 p-1 text-white bg-green-600 font-bold rounded-xl hover:bg-green-700">
              <LinkIcon className="w-8" />
            </button>
          </div>
        </div>
      </div>
      <div className="mt-10 flex gap-5">
        <MenuProfile 
          user={user}
        />
      </div>
      
    </div>
  );
}

export default ProfilePage;
