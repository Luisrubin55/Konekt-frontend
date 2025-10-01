
import { UsersIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { useQuery } from '@tanstack/react-query';
import { getAllReactionsComment } from '../../api/Reactions';
import UserPerfilImg from '../Images/UserPerfilImg';

function ModalGetAllReactionsComment({ modalReaction, setModalReaction, comment }) {

    const { data: reactionsComment } = useQuery({
        queryKey: ["reactionsComment", comment?.id],
        queryFn: () => getAllReactionsComment(comment?.id),
    });

    const handleClickClose = () => {
        setModalReaction(false);
    }


    if (!modalReaction) return null;
    return (
        <div className="absolute w-96 top-24 left-1/2 -translate-x-1/2 z-50 bg-gray-900 border border-sky-600 rounded-xl shadow-lg p-3">
            <div className="flex justify-between items-center border-b-2 pb-2 mb-2">
                <p className="text-white font-semibold text-lg">Reacciones</p>
                <button onClick={handleClickClose}>
                    <XMarkIcon className="text-white w-7 font-bold" />
                </button>
            </div>
            {reactionsComment?.length > 0 ? (
                <div className="flex flex-col gap-5">
                    {reactionsComment?.map(reaction => (
                        <div className="flex justify-between" key={reaction.id}>
                            <div className='flex items-center gap-3'>
                                <UserPerfilImg profilePictureUrl={reaction.user.profilePictureUrl} />
                                <div className='flex gap-2'>
                                    <p className='text-white font-semibold'>{reaction?.user?.name + " " + reaction?.user?.paternalSurname}</p>
                                    <img src={`/reactions/${reaction.type}.svg`} alt={reaction.type} className='w-5' />
                                </div>
                            </div>
                            <div>
                                <button className='flex bg-gray-700 p-1 rounded-2xl hover:bg-gray-800 text-white gap-2 font-semibold'><UsersIcon className='w-5 text-white' />Agregar amigo</button>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p className='text-white text-center font-bold'>Aun no hay reacciones</p>
            )}
        </div>
    )
}

export default ModalGetAllReactionsComment