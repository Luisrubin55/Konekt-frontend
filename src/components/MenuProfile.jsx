import { useQuery } from "@tanstack/react-query";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import { getAllUserPost } from "../api/PostAPI";
import PostCard from "./PostCard";

function MenuProfile() {
  const { data: UserPost } = useQuery({
    queryKey: ["UserPosts"],
    queryFn: getAllUserPost,
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
              key={"favorites"}
              className="rounded-full px-3 py-1 text-sm/6 font-semibold text-white focus:not-data-focus:outline-none data-focus:outline data-focus:outline-white data-hover:bg-white/5 data-selected:bg-white/10 data-selected:data-hover:bg-white/10"
            >
              <p>Informacion</p>
            </Tab>
          </TabList>
          <TabPanels className="mt-3">
            <div className="flex items-center justify-center">
              <TabPanel key={"posts"} className="rounded-xl w-1/2">
                {UserPost?.map((post) => (
                  <PostCard key={post.id} post={post} />
                ))}
              </TabPanel>
            </div>
          </TabPanels>
        </TabGroup>
      </div>
    </div>
  );
}

export default MenuProfile;
