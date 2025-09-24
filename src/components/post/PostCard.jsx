import {
  ChatBubbleBottomCenterIcon,
  ChatBubbleOvalLeftIcon,
  EllipsisHorizontalIcon,
  HeartIcon,
  ShareIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { formatDate } from "../../utils/utils";
import MenuOptionsPost from "../MenuOptionsPost";
import { useMemo, useState } from "react";
import ModalComments from "../comments/ModalComments";

function PostCard({post, user}) {
  const [modal, setModal] = useState(false)
  const { content, user:{id, name, paternalSurname, username, profilePictureUrl }, createdAt, images, comments, likes } = post
  const optionsMenuPost = useMemo(() => user?.id == id ? true : false, [])
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
              <p className="text-white">{name + " " + paternalSurname}</p>
              <p className="text-slate-400 text-xs">{formatDate(createdAt)}</p>
            </div>
            <p className="text-white text-xs">{username}</p>
          </div>
        </div>
        <div className="flex items-center  gap-3 p-0">
          <div>
            {optionsMenuPost ? (
              <MenuOptionsPost />
            ) : ""}
          </div>
          <XMarkIcon className="text-white w-7 font-bold" />
        </div>
      </div>
      <div className="mt-2 px-4">
        <p className="text-white">
          {content}
        </p>
      </div>
      <div className="mt-3">
        {images ? 
        images.map(item => (
          <img src={item.urlImage} alt="imagen post" className="w-full" key={item.id} />
        ))
        : ''}
      </div>
      <div className="flex justify-around mt-3 p-2">
        <button className="flex items-center gap-2 hover:bg-red-600 p-2 rounded-2xl ">
          <HeartIcon className="text-white w-7" />
          <p className="text-white text-sm font-semibold">{likes.length}</p>
        </button>
        <button className="flex items-center gap-2 hover:bg-sky-600 rounded-4xl p-2" onClick={() =>setModal(!modal)}>
          <ChatBubbleOvalLeftIcon className="text-white w-7" />
          <p className="text-white text-sm font-semibold">{comments.length}</p>
        </button>
        <button className="flex items-center gap-2">
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
    </div>
  );
}

export default PostCard;
