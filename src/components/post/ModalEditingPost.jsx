import { Dialog, Transition } from "@headlessui/react";
import { FaceSmileIcon, PhotoIcon, XCircleIcon } from "@heroicons/react/24/outline";
import React, { useState, Fragment, useEffect } from "react";
import { useForm } from "react-hook-form";

function ModalEditingPost({ modalPost, setModalPost, postEditing, setPostEditing }) {
  const defaultValues = {
    content: postEditing?.content || "",
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ defaultValues });

  useEffect(() => {
    reset(defaultValues);
  }, [postEditing, reset]);

  const handleCllckCloseModal = () => {
    setModalPost(false)
    reset([])
    setPostEditing([])
  };

  const handleSubmitUpdatePost = (data) => {
    console.log(data);
  }

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
                    <form
                      onSubmit={handleSubmit(handleSubmitUpdatePost)}
                    >
                      <div className="flex items-center justify-between mt-5 mb-5">
                        <input
                          className="w-full decoration-0 border-none outline-none p-2 text-xl text-white"
                          type="text"
                          {...register("content", {
                            required: "Ingresa un comentario",
                          })}
                          placeholder="Escribe un comentario..."
                          autoComplete="off"
                        />
                        <div className="flex gap-3">
                          <button type="button">
                            <FaceSmileIcon className="w-5 text-white font-extrabold" />
                          </button>
                          <button type="button">
                            <PhotoIcon className="w-5 text-white font-extrabold" />
                          </button>
                        </div>
                      </div>
                      {postEditing?.images
                        ? postEditing?.images.map((item) => (
                            <img
                              src={item.urlImage}
                              alt="imagen post"
                              className="w-full"
                              key={item.id}
                            />
                          ))
                        : ""}
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
