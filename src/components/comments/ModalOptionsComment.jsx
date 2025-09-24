import { useState } from "react";
import { EllipsisHorizontalIcon } from "@heroicons/react/24/outline";
import { deleteCommentoById } from "../../api/CommentsAPI";
import { useMutation } from "@tanstack/react-query";

function ModalOptionsComment({comment, setCommentEditing}) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

    const mutation = useMutation({
      mutationFn: deleteCommentoById,
      onSuccess: (data) => {
          console.log(data);
      },
      onError: (error) => {
          console.log(error);
          
      }
    })

  const handleClickEdelete = (id) => {
    if (confirm("¿Estás seguro de que deseas eliminar este comentario?")) {
      mutation.mutateAsync(id);
    }
  }

  const handleClickEdit = (comment) => {
    setCommentEditing(comment)
  }

  return (
    <>
      <button onClick={toggleDropdown}>
        <EllipsisHorizontalIcon className="w-8 text-white font-extrabold hover:bg-gray-600 rounded-4xl" />
      </button>
      {isOpen && (
        <div data-open className="absolute bg-gray-800 p-2 rounded-2xl flex flex-col gap-2">
          <button onClick={() => handleClickEdit(comment)} className="text-white hover:bg-gray-600 rounded-xl text-md font-semibold p-1">Editar</button>
          <button onClick={() => handleClickEdelete(comment?.id)} className="text-white hover:bg-gray-600 rounded-xl text-md font-semibold p-1">Eliminar</button>
        </div>
      )}
    </>
  );
}

export default ModalOptionsComment;
