import { useForm } from "react-hook-form";
import {
  PaperAirplaneIcon,
  FaceSmileIcon,
  PhotoIcon,
} from "@heroicons/react/24/outline";
import { useMutation } from "@tanstack/react-query";
import {
  createCommentByPostId,
  updateCommentById,
} from "../../api/CommentsAPI";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import EmojisInput from "../reactions/EmojisInput";

function CreateComment({ user, post, commentEditing, setCommentEditing }) {
  const [showPicker, setShowPicker] = useState(false)
  const defaultValues = {
    content: commentEditing?.content || "",
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch
  } = useForm({ defaultValues });

  useEffect(() => {
    if (commentEditing?.id) {
      reset(defaultValues);
    }
  }, [commentEditing, reset]);

  const mutationCreate = useMutation({
    mutationFn: createCommentByPostId,
    onSuccess: (data) => {
      toast.success("Comentario creado",{position: "bottom-left" });
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const mutationUpdate = useMutation({
    mutationFn: updateCommentById,
    onSuccess: (data) => {
      toast.success("Comentario actualizado");
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const contentValue = watch("content");

  const handleEmojiClick = (emojiData) => {
    setValue("content", contentValue + emojiData.emoji, {
      shouldValidate: true,
      shouldDirty: true,
    });
    setShowPicker(false);
  };

  const handleForm = (data) => {
    if (commentEditing.id) {
      const formData = {
        id: commentEditing?.id,
        content: data.content,
      };
      mutationUpdate.mutateAsync(formData);
      reset({ content: "" });
      setCommentEditing([])
      return;
    }
    const formData = {
      content: data.content,
      postId: post.id,
    };
    mutationCreate.mutateAsync(formData);
    reset({ content: "" });
  };

  return (
    <div className="flex  items-center gap-3">
      <div>
        <img
          src={
            user?.profilePictureUrl ? user?.profilePictureUrl : "/perfil.jpg"
          }
          alt="image profile"
          className="w-9 h-9 overflow-hidden object-cover rounded-full"
        />
      </div>
      <div className="bg-gray-800 p-2 rounded-2xl w-full">
        <form className="flex flex-col" onSubmit={handleSubmit(handleForm)}>
          <div className="flex items-center justify-between">
            <textarea
              className="focus:outline-none bg-gray-800 p-3 rounded-2xl text-white w-full"
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
          <div className="flex justify-between">
            <div className="flex gap-3">
              <div>
                <button onClick={() => setShowPicker(!showPicker)} type="button">
                  <FaceSmileIcon className="w-5 text-white font-extrabold" />
                </button>
                <EmojisInput showPicker={showPicker} handleEmojiClick={handleEmojiClick} />
              </div>
              <button type="button">
                <PhotoIcon className="w-5 text-white font-extrabold" />
              </button>
            </div>
            <button type="submit" className="">
              <PaperAirplaneIcon className="w-6 text-sky-600 font-bold hover:text-sky-700 " />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateComment;
