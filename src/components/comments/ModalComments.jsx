import { useState } from "react";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useQuery } from "@tanstack/react-query";
import { getAllCommentsPostId } from "../../api/CommentsAPI";
import Comment from "./Comment";
import CreateComment from "./CreateComment";


function ModalComments({ modal, setModal, post, user }) {

  const [commentEditing, setCommentEditing] = useState([])

  const { data: comments } = useQuery({
    queryKey: ["comments", post?.id],
    queryFn: () => getAllCommentsPostId(post?.id),
  });
      

  const closeModal = () => {
    if (commentEditing?.id) {
      if(confirm("Tienes un comentario en edición, si cierras se perderán los cambios")){
      setCommentEditing([])
      setModal(!modal);
      return
      }else{
        return
      }
    }
    setModal(!modal);
  };

  return (
    <>
      <Dialog open={modal} onClose={() => closeModal} className="relative z-50">
        <div className="fixed inset-0 flex w-screen items-center justify-center p-2">
          <DialogPanel className="w-xl space-y-4 border rounded-xl  p-3 bg-gray-900 border-sky-600">
            <DialogTitle className="text-center flex justify-between text-white font-semibold text-2xl border-b-2 p-2 ">
              <div>
                <p className="text-center">Comentarios</p>
              </div>
              <div className="">
                <button onClick={closeModal}>
                  <XMarkIcon className="text-white w-7 font-bold" />
                </button>
              </div>
            </DialogTitle>
            <div className="flex flex-col gap-3">
              {comments?.length ? (
                comments?.map((comment) => (
                  <Comment key={comment.id} comment={comment} setCommentEditing={setCommentEditing} />
                ))
              ) : (
                <p className="text-center text-xl text-white font-bold">
                  No hay comentarios aún
                </p>
              )}
            </div>
            <CreateComment 
              user={user}
              post={post}
              commentEditing={commentEditing}
              setCommentEditing={setCommentEditing}
            />
          </DialogPanel>
        </div>
      </Dialog>
    </>
  );
}

export default ModalComments;
