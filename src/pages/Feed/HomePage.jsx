import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import CreatePost from "../../components/post/CreatePost"; 
import { getAllPost } from "../../api/PostAPI";
import useUser from "../../hooks/useUser";
import PostCard from "../../components/post/PostCard";
import ModalEditingPost from "../../components/post/ModalEditingPost";

function HomePage() {

  const [postEditing, setPostEditing] = useState([])
  const [modalPost, setModalPost] = useState(false)


  const { data: posts } = useQuery({
    queryKey: ["posts"],
    queryFn: getAllPost,
  });

  const {data} = useUser()

  return (
    <div className="flex gap-10 w-5xl">
      <div className="w-2xl">
        <CreatePost />
        <div className="mt-5">
          {posts?.map((post) => (
            <PostCard key={post.id} post={post} user={data} modalPost={modalPost} setModalPost={setModalPost} setPostEditing={setPostEditing} />
          ))}
        </div>
      </div>
      <div className="">
        <p className="text-white">Publicidad</p>
      </div>
      <ModalEditingPost modalPost={modalPost} setModalPost={setModalPost} postEditing={postEditing} setPostEditing={setPostEditing} />
    </div>
  );
}

export default HomePage;
