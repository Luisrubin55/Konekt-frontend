import { formatDate } from "../../utils/utils";
import ModalOptionsComment from "./ModalOptionsComment";
import useUser from "../../hooks/useUser";
import { use, useMemo, useState } from "react";
import { HandThumbUpIcon } from "@heroicons/react/24/outline";
import ModalReactionsPost from "../reactions/ModalReactionsPost";
import ModalGetAllReactionsComment from "../reactions/ModalGetAllReactionsComment";
import { addUpdateReactionComment } from "../../api/Reactions";
import { useMutation } from "@tanstack/react-query";

function Comment({ comment, setCommentEditing }) {
  const user = useUser()
  const [modalReaction, setModalReaction] = useState(false);
  const [userReaction, setUserReaction] = useState(() => {
    const like = comment.likes?.find(like => like.userId === user?.data?.id);
    return like ? like.type : null;
  })
  const isAuthor = useMemo(() => user.data?.id === comment?.user?.id, [])


  const mutationReactionComment = useMutation({
    mutationFn: addUpdateReactionComment,
    onSuccess: (data) => {
      setUserReaction(data?.type || null);
    },
    onError: (error) => {
      console.log(error);
    }
  });


  const handleClickReaction = (type) => {
    if (userReaction === type) {
      setUserReaction(null);
      const formData = {
        commetnId: comment?.id,
        type: type
      };
      mutationReactionComment.mutateAsync(formData);
    } else {
      setUserReaction(type);
      const formData = {
        commentId: comment?.id,
        type
      };
      mutationReactionComment.mutateAsync(formData);
    }
  };
  

  return (
    <>
      <div className="flex items-center gap-4">
        <div>
          <img
            src={
              comment?.user?.profilePictureUrl
                ? comment?.user?.profilePictureUrl
                : "/perfil.jpg"
            }
            alt="image profile"
            className="w-9 h-9 overflow-hidden object-cover rounded-full"
          />
        </div>
        <div className="flex items-center gap-1 group">
          <div className="bg-gray-800 p-2 rounded-2xl flex-col gap-0.5">
            <div className="flex justify-between items-center">
              <p className="text-white font-semibold">
                {comment?.user?.name + " " + comment?.user?.paternalSurname}
              </p>
                  <div className="relative group flex gap-1">
                    <button>
                      {userReaction ? (
                        <img src={`/reactions/${userReaction}.svg`} className="w-6 h-6 hover:bg-gray-500 p-0.5 rounded-2xl " alt={userReaction} />
                      ) : (
                        <HandThumbUpIcon className="text-white w-6 hover:bg-gray-500 p-0.5 rounded-2xl " />
                      )}
                    </button>
                    <div className="absolute w-max -top-14 left-1/2 -translate-x-1/2 bg-gray-900/90 rounded-xl shadow-lg p-2 hidden group-hover:flex scale-95 group-hover:scale-100 transition-transform duration-150 z-40">
                      <ModalReactionsPost handleClickReaction={handleClickReaction} />
                    </div>
                    <button onClick={() => setModalReaction(true)} type="button" className="text-white">{comment?.likes?.length}</button>
                  </div>
            </div>
            <p className="text-white">{comment?.content}</p>
            <p className="text-sm text-gray-600">
              {formatDate(comment?.createdAt)}
            </p>
          </div>
          <div className=" hidden group-hover:block">
            {isAuthor && <ModalOptionsComment comment={comment} setCommentEditing={setCommentEditing} />}
          </div>
        </div>
      </div>
      <ModalGetAllReactionsComment setModalReaction={setModalReaction} modalReaction={modalReaction} comment={comment} />
    </>
  );
}

export default Comment;
