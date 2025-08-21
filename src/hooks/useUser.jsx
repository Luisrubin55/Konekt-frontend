import { useQuery } from "@tanstack/react-query";
import {getUser} from "../api/UserAPI"

function useUser() {

  const { data } = useQuery({
    queryKey: ["user"],
    queryFn: () => getUser(),
  });

  return {
    data
  };
}

export default useUser;
