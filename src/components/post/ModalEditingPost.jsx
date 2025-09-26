import { useState, Fragment, useEffect, useRef } from "react";
import { useMutation } from "@tanstack/react-query";
import { Dialog, Transition } from "@headlessui/react";
import { useForm } from "react-hook-form";
import { FaceSmileIcon, PhotoIcon, XCircleIcon } from "@heroicons/react/24/outline";
import { deleteImageByPostId, updatePostUser } from "../../api/PostAPI";
import PostImagesEditing from "../Images/PostImagesEditing";
import { toast } from "react-toastify";

function ModalEditingPost({ modalPost, setModalPost, postEditing, setPostEditing }) {
  const [preview, setPreview] = useState(null);
  const [file, setFile] = useState(null);

  const defaultValues = {
    content: postEditing?.content || "",
  };
  const { register, handleSubmit, formState: { errors }, reset, } = useForm({ defaultValues });

  useEffect(() => {
    reset(defaultValues);
  }, [postEditing, reset]);

  const handleCllckCloseModal = () => {
    setModalPost(false);
    reset([]);
    setPostEditing([]);
  };

  const mutationDelete = useMutation({
    mutationFn: deleteImageByPostId,
    onSuccess: (data) => {
      toast.success("Imagen eliminada con éxito");
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const handleClickDeleteImage = (imageId) => {
    const formData = {
      imageId: imageId,
      postId: postEditing?.id,
    };
    mutationDelete.mutate(formData);
  };

  const mutationUpdate = useMutation({
    mutationFn: ({ postId, formData }) => updatePostUser(postId, formData),
    onSuccess: (data) => {
      toast.success("Post actualizado con éxito");
    },
    onError: (error) => {
      console.log("Error:", error);
    },
  });

  const manejarArchivo = (e) => {
    const archivo = e.target.files[0];
    if (archivo) {
      setPreview(URL.createObjectURL(archivo));
      setFile(e.target.files[0]);
    }
  };

  const handleSubmitUpdatePost = (formData) => {
    const data = new FormData();
    if (file) data.append("file", file);
    data.append(
      "content",
      new Blob([JSON.stringify(formData)], { type: "application/json" })
    );
    mutationUpdate.mutateAsync({ postId: postEditing?.id, formData: data });
    setModalPost(false);
    reset([]);
    setPostEditing([]);
    setPreview(null);
  };

  return (
    <>
      <Transition appear show={modalPost} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={() => setModalPost(false)}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-0"
            enterFrom="opacity-0"
            enterTo="opacity-0"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black opacity-40" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="relative bg-gray-950 rounded-xl transform overflow-hidden  px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-2xl sm:p-6">
                  <div className="grid grid-cols-2 justify-between items-center">
                    <h2 className="text-end text-white text-2xl font-bold ">
                      Editar Post
                    </h2>
                    <div className="text-end">
                      <button onClick={handleCllckCloseModal} className="">
                        <XCircleIcon className="w-8 text-white font-bold hover:text-sky-600" />
                      </button>
                    </div>
                  </div>
                  <div>
                    <form onSubmit={handleSubmit(handleSubmitUpdatePost)}>
                      <div className="flex flex-col mt-5 mb-5 gap-0">
                        <textarea
                          rows="1"
                          placeholder="¿Qué estás pensando?"
                          className="w-full text-white p-3 rounded-lg resize-none overflow-hidden focus:outline-none"
                          autoComplete="off"
                          {...register("content", {
                            required: "Ingresa contenido",
                            onChange: (e) => {
                              e.target.style.height = "auto";
                              e.target.style.height =
                                e.target.scrollHeight + "px";
                            },
                          })}
                        />
                        <div className="flex justify-between">
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
                          <button type="button">
                            <FaceSmileIcon className="w-7 text-white font-extrabold hover:text-gray-400" />
                          </button>
                        </div>
                      </div>
                      <div className="grid grid-cols-3 gap-2">
                        {postEditing?.images
                          ? postEditing?.images.map((item) => (
                            <PostImagesEditing
                              item={item}
                              key={item.id}
                              handleClickDeleteImage={handleClickDeleteImage}
                            />
                          ))
                          : ""}
                        <div className="w-auto h-auto">
                          {preview ? (
                            <img src={preview} alt="perfil" className="w-full h-full object-cover rounded-lg" />
                          ) : (
                            ""
                          )}
                        </div>
                      </div>
                      <div className="mt-5">
                        <input
                          type="submit"
                          value={"Actualizar publicación"}
                          className="bg-sky-600 hover:bg-sky-700 w-full text-white font-bold py-2 px-4 rounded-full cursor-pointer"
                        />
                      </div>
                    </form>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}

export default ModalEditingPost;
