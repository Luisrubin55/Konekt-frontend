import {
  ChatBubbleOvalLeftIcon,
  HandThumbUpIcon,
  ShareIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { formatDate } from "../../utils/utils";
import MenuOptionsPost from "../MenuOptionsPost";
import { useMemo, useState } from "react";
import ModalComments from "../comments/ModalComments";
import CarruselPostImages from "../Images/CarruselPostImages";
import ModalReactionsPost from "../reactions/ModalReactionsPost";
import { useMutation } from "@tanstack/react-query";
import { addUpdateReactionPost } from "../../api/Reactions";
import ModalGetAllReactions from "../reactions/ModalGetAllReactions";
import { Link } from "react-router-dom";

function PostCard({ post, user, modalPost, setModalPost, setPostEditing }) {
  const [modal, setModal] = useState(false);
  const [modalReaction, setModalReaction] = useState(false);
  const [userReaction, setUserReaction] = useState(() => {
    const like = post.likes?.find(like => like.userId === user?.id);
    return like ? like.type : null;
  });
  const { content, user: { id, name, paternalSurname, username, profilePictureUrl }, createdAt, images, comments, likes } = post;
  const optionsMenuPost = useMemo(() => user?.id == id ? true : false, []);

  const mutationReaction = useMutation({
    mutationFn: addUpdateReactionPost,
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
        postId: post?.id,
        type: type
      };
      mutationReaction.mutateAsync(formData);
    } else {
      setUserReaction(type);
      const formData = {
        postId: post?.id,
        type
      };
      mutationReaction.mutateAsync(formData);
    }
  };


  return (
    <div className=" bg-gray-950 rounded-xl mt-10">
      <div className="flex justify-between px-3 pt-2">
        <div className="flex gap-2 items-center">
          <div className="w-10">
            <img
              src={profilePictureUrl ? profilePictureUrl : "/perfil.jpg"}
              alt="image profile"
              className="w-9 h-9 overflow-hidden object-cover rounded-full"
            />
          </div>
          <div className="space-y-1">
            <div className="flex gap-3 justify-center items-center">
              <Link to={`/${username}`} className="text-white">{name + " " + paternalSurname}</Link>
              <p className="text-slate-400 text-xs">{formatDate(createdAt)}</p>
            </div>
            <p className="text-white text-xs">{username}</p>
          </div>
        </div>
        <div className="flex items-center  gap-3 p-0">
          <div>
            {optionsMenuPost ? (
              <MenuOptionsPost setModalPost={setModalPost} modalPost={modalPost} post={post} setPostEditing={setPostEditing} />
            ) : ""}
          </div>
          <XMarkIcon className="text-white w-7 font-bold" />
        </div>
      </div>
      <div className="mt-4 px-4 mb-4">
        <p className="text-white">
          {content}
        </p>
      </div>
      <div className="mt-3">
        <CarruselPostImages images={images} />
      </div>
      <div className="flex justify-around mt-3 p-2">
        <div>
          <div className="relative group flex items-center gap-1">
            <button
              onClick={() => handleClickReaction(userReaction ? userReaction : "LIKE")}
              type="button"
              className=" hover:bg-red-600 p-2 rounded-2xl "
            >
              {userReaction ? (
                <img src={`/reactions/${userReaction}.svg`} className="w-7 h-7" alt={userReaction} />
              ) : (
                <HandThumbUpIcon className="text-white w-7" />
              )}
            </button>
            <div className="absolute w-max -top-13 left-3/4 -translate-x-1/2 bg-gray-900/90 rounded-xl shadow-lg p-2 hidden group-hover:flex scale-95 group-hover:scale-100 transition-transform duration-150 z-40">
              <ModalReactionsPost handleClickReaction={handleClickReaction} />
            </div>
            <button onClick={() => setModalReaction(true)} type="button" className="text-white">{likes.length}</button>
          </div>
        </div>
        <button type="button" className="flex items-center gap-2 hover:bg-sky-600 rounded-4xl p-2" onClick={() => setModal(!modal)}>
          <ChatBubbleOvalLeftIcon className="text-white w-7" />
          <p className="text-white text-sm font-semibold">{comments.length}</p>
        </button>
        <button type="button" className="flex items-center gap-2">
          <ShareIcon className="text-white w-7" />
          <p className="text-white text-sm font-semibold">3</p>
        </button>
      </div>
      <ModalComments
        modal={modal}
        setModal={setModal}
        post={post}
        user={user}
      />
      <ModalGetAllReactions modalReaction={modalReaction} setModalReaction={setModalReaction} post={post} />
    </div>
  );
}

export default PostCard;
