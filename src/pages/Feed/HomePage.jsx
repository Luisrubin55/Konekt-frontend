import { useQuery } from "@tanstack/react-query";
import CreatePost from "../../components/CreatePost";
import PostCard from "../../components/PostCard";
import { getAllPost } from "../../api/PostAPI";

function HomePage({user}) {
  const { data: posts } = useQuery({
    queryKey: ["posts"],
    queryFn: getAllPost,
  });

  console.log(user);
  

  return (
    <div className="flex gap-10 w-5xl">
      <div className="w-2xl">
        <CreatePost />
        <div className="mt-5">
          {posts?.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      </div>
      <div className="">
        <p className="text-white">Publicidad</p>
      </div>
    </div>
  );
}

export default HomePage;
