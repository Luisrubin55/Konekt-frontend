import { use, useEffect } from "react";
import { createPost } from "../../api/PostAPI";
import { useForm } from "react-hook-form";
import {
  FaceSmileIcon,
  MapPinIcon,
  PhotoIcon,
} from "@heroicons/react/24/outline";
import { useMutation } from '@tanstack/react-query'
import ModalImgPost from "../ModalImgPost";
import { useState } from "react";
import useUser from "../../hooks/useUser";
import { toast } from "react-toastify";
import EmojisInput from "../reactions/EmojisInput";

function CreatePost() {
  const [showPicker, setShowPicker] = useState(false)
  const [modal, setModal] = useState(false)
  const { data } = useUser()

  const { register, handleSubmit, formState: { errors }, reset, watch, setValue } = useForm({
  defaultValues: {
    content: ""  
  }});
  
  const mutation = useMutation({
    mutationFn: createPost,
    onSuccess: (data) => {
      toast.success("Publicación creada con éxito")
    },
    onError: (error) => {
      console.log(error);
    }
  })

  const handleForm = (data) => {
    mutation.mutateAsync(data)
    reset({})
  };

  const contentValue = watch("content");

  const handleEmojiClick = (emojiData) => {
    setValue("content", contentValue + emojiData.emoji, {
      shouldValidate: true,
      shouldDirty: true,
    });
    setShowPicker(false);
  };

  const newPostPhoto = () => {
    setModal(true)
  }
 
  return (
    <div className=" w-full border-2 border-sky-800 p-3 rounded-2xl">
      <form onSubmit={handleSubmit(handleForm)}>
        <div className="flex gap-3">
          <img
            src={data?.profilePictureUrl ? data?.profilePictureUrl : "/perfil.jpg"}
            alt="image profile"
            className="w-9 h-9 overflow-hidden object-cover rounded-full"
          />
          <textarea
            type="text"
            id="content"
            placeholder={"¿Que estas pensando?"}
            className="w-full text-white focus:outline-none bg-slate-900 p-3 rounded-2xl"
            {...register("content", {
              required: "Ingresa contenido",
            })}
            autoComplete="off"
          />
        </div>
        <div className=" flex justify-between items-center mt-5">
          <div className="flex gap-2">
            <div>
              <button onClick={() => setShowPicker(!showPicker)} type="button" className="w-8">
                <FaceSmileIcon className="text-white hover:bg-sky-700 p-1 rounded-full" />
              </button>
               <EmojisInput handleEmojiClick={handleEmojiClick} showPicker={showPicker} />
            </div>

            <div className="w-8">
              <button onClick={newPostPhoto} type="button" className="w-full">
                <PhotoIcon className="text-white hover:bg-sky-700 p-1 rounded-full" />
              </button>
            </div>
            <button className="w-8" type="button">
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
      <ModalImgPost
        modal={modal}
        setModal={setModal}
        user={data}
      />
    </div>
  );
}

export default CreatePost;
