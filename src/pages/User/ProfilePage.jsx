import { Cog8ToothIcon, LinkIcon } from "@heroicons/react/24/outline";
import useUser from "../../hooks/useUser";
import MenuProfile from "../../components/MenuProfile";
import { useState } from "react";

function ProfilePage() {

  const [preview, setPreview] = useState(null)
  const [file, setFile] = useState(null)
  const [url, setUrl] = useState("");
  const [nombre, setNombre] = useState("");

  const { data } = useUser();

  const manejarArchivo = (e) => {
    const archivo = e.target.files[0];
    if (archivo) {
      setPreview(URL.createObjectURL(archivo));
      setFile(e.target.files[0])
    }
  };

  const cancelImagePhoto = () => {
    setPreview(null)
  }

  
  

  const uploadNewProfilePhoto = async () => {
    if (!file) return alert("Selecciona un archivo primero");
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await axios.post(
        "https://api.cloudinary.com/v1_1/dofgbev8i/image/upload", // Cambia TU_CLOUD_NAME
        formData
      );
      console.log("Respuesta Cloudinary:", res.data);

      setUrl(res.data.secure_url);      // URL pública de la imagen
      setNombre(res.data.original_filename); // Nombre original del archivo
    } catch (error) {
      console.error("Error al subir:", error);
    }

  }

  return (
    <div className="flex flex-col justify-center mt-10">
      <div className="flex gap-10 items-center ">
        <div>
          <label htmlFor="fileInput" >
            <img
              src={preview ? preview : data?.profilePictureUrl ? data?.profilePictureUrl : "/perfil.jpg"}
              alt="perfil"
              className="w-50 h-50 overflow-hidden object-cover rounded-full border-8 border-sky-500"
            />
            <input type="file" id="fileInput" className="hidden" onChange={manejarArchivo} />
          </label>
          {
            preview ? (
              <div className="flex mt-3 gap-5 justify-center items-center">
                <button onClick={uploadNewProfilePhoto}  className="bg-green-600 p-1 rounded-xl hover:bg-green-500 text-white font-bold">Aceptar</button>
                <button onClick={cancelImagePhoto} className="bg-red-600 p-1 rounded-xl hover:bg-red-500 text-white font-bold">Cancelar</button>
              </div>
            ) : ""
          }
        </div>
        <div className="flex flex-col gap-4">
          <h2 className="text-white text-5xl font-bold">
            {data?.name + " " + data?.paternalSurname}
          </h2>
          <h3 className="text-white text-3xl">@{data?.username}</h3>
          <div className="flex gap-2 items-center">
            <button className="text-xl text-white bg-sky-600 p-2 font-bold rounded-xl hover:bg-sky-700">
              Editar perfil
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
        <MenuProfile />
      </div>
    </div>
  );
}

export default ProfilePage;
