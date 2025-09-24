import { formatDate } from "../../utils/utils";
import ModalOptionsComment from "./ModalOptionsComment";
import useUser from "../../hooks/useUser";
import { useMemo } from "react";

function Comment({ comment, setCommentEditing }) {

  const user = useUser()
  const isAuthor =  useMemo(() => user.data?.id === comment?.user?.id, [])
  

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
            <p className="text-white font-semibold">
              {comment?.user?.name + " " + comment?.user?.paternalSurname}
            </p>
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
    </>
  );
}

export default Comment;
