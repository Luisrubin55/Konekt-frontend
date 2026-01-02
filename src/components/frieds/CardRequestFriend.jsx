import React from 'react'
import { formatDate, getDaysDifference } from '../../utils/utils';
import { Link } from 'react-router-dom';

function CardRequestFriend({friendRequest}) {
    console.log(friendRequest);
    
  return (
    <Link to={`/${friendRequest?.user?.username}`} className='hover:bg-slate-900 p-2 rounded-lg flex gap-3 items-center'>
        <div>
            <img src={friendRequest?.user?.profilePictureUrl} className="w-9 h-9 overflow-hidden object-cover rounded-full" />
        </div>
        <div className='p-3'>
            <div className='flex justify-between'>
                <p className='text-white'>{friendRequest?.user.name + " " + friendRequest?.user.paternalSurname}</p>
                <p className='text-gray-400 text-sm'>{getDaysDifference(friendRequest?.sentAt)}</p>
            </div>
            <div className='mt-3'>
                <button className='bg-cyan-600 hover:bg-cyan-700 text-white px-2 py-1 rounded-lg mr-2'>Aceptar</button>
                <button className='bg-gray-600 hover:bg-gray-700 text-white px-2 py-1 rounded-lg'>Rechazar</button>
            </div>
        </div>
    </Link>
  )
}

export default CardRequestFriend