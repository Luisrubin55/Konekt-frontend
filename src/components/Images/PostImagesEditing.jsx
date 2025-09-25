import { PencilIcon, XCircleIcon, XMarkIcon } from "@heroicons/react/24/outline";

function PostImagesEditing({item}) {
  return (
    <div className="relative w-48 h-48 group ">
      <img
        src={item?.urlImage ? item?.urlImage : "/perfil.jpg"}
        alt="ejemplo"
        className="w-full h-full object-cover rounded-lg"
      />
      <div
        className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg"
      >
        <button type="button" onClick={() => console.log("Eliminar imagen")}>
            <XCircleIcon className="w-8 text-white" />
        </button>
      </div>
    </div>
  );
}

export default PostImagesEditing;
