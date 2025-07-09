import { useEffect } from "react";
import { createPost } from "../api/PostAPI";
import { useForm } from "react-hook-form";
import {
  FaceSmileIcon,
  MapPinIcon,
  PhotoIcon,
} from "@heroicons/react/24/outline";
import { useMutation } from '@tanstack/react-query'

function CreatePost() {
  const initialValues = {
    content: "",
    author: {
        id: 5,
      }, 
  };

  const { register, handleSubmit, formState: { errors }} = useForm({ defaultValues:initialValues });

  const mutation = useMutation({
    mutationFn: createPost,
    onError: () => {

    },
    onSuccess: (data) => {
      console.log(data);
      
    }
  })

  const handleForm = (data) => {
    mutation.mutateAsync(data)
  };

  return (
    <div className=" w-full border-2 border-sky-800 p-3 rounded-2xl">
      <form onSubmit={handleSubmit(handleForm)}>
        <div className="flex gap-3">
          <img
            src="/perfil.jpg"
            alt="image profile"
            className="rounded-full w-12"
          />
          <input
            type="text"
            id="content"
            placeholder={"¿Que estas pensando?"}
            className="w-full text-white focus:outline-none bg-slate-900 p-3 rounded-2xl"
            {...register("content", {
              required: "Ingresa contenido",
            })}
          />
        </div>
        <div className=" flex justify-between items-center mt-5">
          <div className="flex gap-2">
            <button className="w-8">
              <FaceSmileIcon className="text-white hover:bg-sky-700 p-1 rounded-full" />
            </button>
            <div className="w-8">
              <label htmlFor="fileInput" className="">
                <PhotoIcon className="text-white hover:bg-sky-700 p-1 rounded-full" />
              </label>
              <input type="file" id="fileInput" className="hidden" />
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
    </div>
  );
}

export default CreatePost;
