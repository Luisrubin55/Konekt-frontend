import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Description,
  Dialog,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import {
  FaceSmileIcon,
  MapPinIcon,
  PhotoIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";
import { useMutation } from "@tanstack/react-query";
import { createPostWithImage } from "../api/PostAPI";

function ModalImgPost({ modal, setModal, user }) {
  const [preview, setPreview] = useState(null);
  const [file, setFile] = useState(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const manejarArchivo = (e) => {
    const archivo = e.target.files[0];
    if (archivo) {
      setPreview(URL.createObjectURL(archivo));
      setFile(e.target.files[0]);
    }
  };

  const mutation = useMutation({
    mutationFn: createPostWithImage,
    onSuccess: (data) => {},
    onError: (error) => {
      console.log(error);
    },
  });

  const handleForm = (formData) => {
    const data = new FormData();
    data.append("file", file);
    data.append(
      "content",
      new Blob([JSON.stringify(formData)], { type: "application/json" })
    );
    mutation.mutateAsync(data)
  };

  const closeModal = () => {
    setModal(!modal);
    setPreview(null);
  };

  return (
    <>
      <Dialog open={modal} onClose={() => modal} className="relative z-50">
        <div className="fixed inset-0 flex w-screen items-center justify-center p-2">
          <DialogPanel className="w-xl space-y-4 border rounded-xl  p-3 bg-gray-900 border-sky-600">
            <div className="flex justify-between">
              <div className="flex justify-center items-center">
                <h1 className="text-center text-xl font-bold text-white">
                  Crear publicación
                </h1>
              </div>
              <button onClick={closeModal}>
                <XCircleIcon className="w-8 text-white" />
              </button>
            </div>
            <div className="flex gap-2 items-center">
              <div>
                <img
                  src={
                    user?.profilePictureUrl
                      ? user?.profilePictureUrl
                      : "/perfil.jpg"
                  }
                  alt="image profile"
                  className="w-9 h-9 overflow-hidden object-cover rounded-full"
                />
              </div>
              <div>
                <p className="text-white">
                  {user?.name + " " + user?.paternalSurname}
                </p>
              </div>
            </div>
            <form onSubmit={handleSubmit(handleForm)}>
              <div>
                <input
                  type="text"
                  placeholder="¿Que estas pensando hoy?"
                  className="w-full decoration-0 border-none outline-none p-2 text-xl text-white"
                  {...register("content", {
                    required: "Ingresa contenido",
                  })}
                  autoComplete="off"
                />
                <div className="w-auto h-auto">
                  {preview ? (
                    <img src={preview} alt="perfil" className="w-80" />
                  ) : (
                    ""
                  )}
                </div>
              </div>
              <div className=" flex justify-between items-center mt-5">
                <div className="flex gap-2">
                  <button className="w-8">
                    <FaceSmileIcon className="text-white hover:bg-sky-700 p-1 rounded-full" />
                  </button>
                  <div className="w-8">
                    <label htmlFor="fileInput">
                      <PhotoIcon className="text-white hover:bg-sky-700 p-1 rounded-full" />
                    </label>
                    <input
                      type="file"
                      id="fileInput"
                      className="hidden"
                      onChange={manejarArchivo}
                    />
                  </div>
                  <button className="w-8">
                    <MapPinIcon className="text-white hover:bg-sky-700 p-1 rounded-full" />
                  </button>
                </div>
                <div>
                  <input
                    type="submit"
                    value={"Post"}
                    className="text-white text-xl font-bold bg-sky-600 p-2 rounded-xl hover:bg-sky-700"
                  />
                </div>
              </div>
            </form>
          </DialogPanel>
        </div>
      </Dialog>
    </>
  );
}

export default ModalImgPost;
