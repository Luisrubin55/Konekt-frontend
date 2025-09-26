import { useQuery } from "@tanstack/react-query";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import { getAllUserPost } from "../api/PostAPI";
import { getPhotosByUser } from "../api/UserAPI"
import PostCard from "./post/PostCard"; 
import CardImages from "./Images/CardImages";
import { useState } from "react";
import ModalEditingPost from "./post/ModalEditingPost";

function MenuProfile({ user }) {
    const [postEditing, setPostEditing] = useState([])
    const [modalPost, setModalPost] = useState(false)

  const { data: UserPost } = useQuery({
    queryKey: ["UserPosts"],
    queryFn: getAllUserPost,
  });

  const { data: UserPhotos } = useQuery({
    queryKey: ["UserPhotos"],
    queryFn: getPhotosByUser,
  });

  return (
    <div className="flex h-screen w-full justify-center px-4 ">
      <div className="w-full">
        <TabGroup>
          <TabList className="flex gap-4">
            <Tab
              key={"posts"}
              className="rounded-full px-3 py-1 text-sm/6 font-semibold text-white focus:not-data-focus:outline-none data-focus:outline data-focus:outline-white data-hover:bg-white/5 data-selected:bg-white/10 data-selected:data-hover:bg-white/10"
            >
              <p>Publicaciones</p>
            </Tab>
            <Tab
              key={"photos"}
              className="rounded-full px-3 py-1 text-sm/6 font-semibold text-white focus:not-data-focus:outline-none data-focus:outline data-focus:outline-white data-hover:bg-white/5 data-selected:bg-white/10 data-selected:data-hover:bg-white/10"
            >
              <p>Fotos</p>
            </Tab>
          </TabList>
          <TabPanels className="mt-3">
            <div className="flex items-center justify-center">
              <TabPanel key={"posts"} className="rounded-xl w-1/2">
                {UserPost?.map((post) => (
                  <PostCard key={post.id} user={user} post={post} modalPost={modalPost} setModalPost={setModalPost} setPostEditing={setPostEditing} />
                ))}
              </TabPanel>
            </div>
          </TabPanels>
          <TabPanels 
           className="mt-3"
          >
            <TabPanel  key={"photos"}>
              <div className="grid grid-cols-4 gap-6">
              {UserPhotos?.map(photo => (<CardImages  key={photo?.id} photo={photo} />))}
            </div>
            </TabPanel>
          </TabPanels>
        </TabGroup>
      </div>
      <ModalEditingPost modalPost={modalPost} setModalPost={setModalPost} postEditing={postEditing} setPostEditing={setPostEditing} />
    </div>
  );
}

export default MenuProfile;
