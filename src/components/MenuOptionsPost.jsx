import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react'
import {
  EllipsisHorizontalIcon,
  PencilIcon,
  TrashIcon
} from "@heroicons/react/24/outline";
import { useMutation } from '@tanstack/react-query';
import { deltePostById } from '../api/PostAPI';
import { toast } from 'react-toastify';

function MenuOptionsPost({modalPost, setModalPost, post, setPostEditing}) {

  const handleClickEditar = (post) => {
    setModalPost(!modalPost)
    setPostEditing(post);
  }


  const mutation = useMutation({
        mutationFn: deltePostById,
        onSuccess: (data) => {
            toast.success(data.message)
        },
        onError: (error) => {
            console.log(error);
        }
      })

  const handleClickEliminar = (postId) => {
    if (confirm("¿Estás seguro de que deseas eliminar esta publicación?")) {
      mutation.mutateAsync(postId);
    }
  }

  return (
    <Popover className="relative">
      <PopoverButton><EllipsisHorizontalIcon className="text-white w-7" /></PopoverButton>
      <PopoverPanel anchor="bottom" className="flex flex-col gap-2 bg-gray-900 border-sky-600 p-4 text-white font-semibold rounded-xl">
        <button onClick={() => handleClickEditar(post)} className='flex gap-2'><PencilIcon className='w-5 font-bold' />Editar publicación</button>
        <button onClick={() => handleClickEliminar(post.id)} className='flex gap-2'><TrashIcon className='w-5 font-bold' />Eliminar publicación</button>
      </PopoverPanel>
    </Popover>
  );
}

export default MenuOptionsPost;
