import { useQuery } from "@tanstack/react-query";
import CardRequestFriend from '../../components/frieds/CardRequestFriend'
import { getAllFriendRequest } from '../../api/FriendsAPI';

function FriendsPage() {


  const { data: friendRequests} = useQuery({
    queryKey: ["friendRequests"],
    queryFn: getAllFriendRequest,
  });

  return (
    <div className='flex gap-5'>
      <div className='w-72'>
        <h1 className='text-white text-center'>Solicitudes de Amistad</h1>
        <div className='mt-2'>
          {friendRequests?.map((friendRequest) => (
            <CardRequestFriend key={friendRequest.id} friendRequest={friendRequest} />
          ))}
        </div>
      </div>
      <div>
        <h1 className='text-white text-center'>Sugerencias de Amistad</h1>
      </div>
    </div>
  )
}

export default FriendsPage