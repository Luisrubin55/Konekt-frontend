import {
  ChatBubbleBottomCenterIcon,
  ChatBubbleOvalLeftIcon,
  EllipsisHorizontalIcon,
  HeartIcon,
  ShareIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { formatDate } from "../utils/utils";

function PostCard({post}) {
  const { content, author:{name, paternalSurname, username, profilePictureUrl }, createdAt, urlImage } = post
  
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
            <p className="text-white text-xs">{"@"+username}</p>
          </div>
        </div>
        <div className="flex gap-0 p-0">
          <EllipsisHorizontalIcon className="text-white w-7" />
          <XMarkIcon className="text-white w-7 font-bold" />
        </div>
      </div>
      <div className="mt-2 px-4">
        <p className="text-white">
          {content}
        </p>
      </div>
      <div className="mt-3">
        {urlImage ? (
          <img src={urlImage} alt="imagen post" className="w-full" />
        ) : ''}
      </div>
      <div className="flex justify-around mt-3 p-2">
        <button className="flex items-center gap-2 hover:bg-red-600 p-1 rounded-2xl ">
          <HeartIcon className="text-white w-7" />
          <p className="text-white text-sm font-semibold">54</p>
        </button>
        <button className="flex items-center gap-2">
          <ChatBubbleOvalLeftIcon className="text-white w-7" />
          <p className="text-white text-sm font-semibold">12</p>
        </button>
        <button className="flex items-center gap-2">
          <ShareIcon className="text-white w-7" />
          <p className="text-white text-sm font-semibold">3</p>
        </button>
      </div>
    </div>
  );
}

export default PostCard;
