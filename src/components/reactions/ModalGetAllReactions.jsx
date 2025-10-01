import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import { UsersIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { useQuery } from '@tanstack/react-query';
import { getAllReactionsPost } from '../../api/Reactions';
import UserPerfilImg from '../Images/UserPerfilImg';

function ModalGetAllReactions({ modalReaction, setModalReaction, post }) {

    const { data: reactionsPost } = useQuery({
        queryKey: ["reactionsPost", post?.id],
        queryFn: () => getAllReactionsPost(post?.id),
    });

    const handleClickClose = () => {
        setModalReaction(false);
    }


    return (
        <>
            <Dialog open={modalReaction} onClose={() => handleClickClose} className="relative z-50">
                <div className="fixed inset-0 flex w-screen items-center justify-center p-2">
                    <DialogPanel className="w-xl space-y-4 border rounded-xl  p-3 bg-gray-900 border-sky-600">
                        <DialogTitle className="text-center flex justify-between text-white font-semibold text-2xl border-b-2 p-2 ">
                            <div>
                                <p className="text-center">Reacciones</p>
                            </div>
                            <div className="">
                                <button onClick={handleClickClose}>
                                    <XMarkIcon className="text-white w-7 font-bold" />
                                </button>
                            </div>
                        </DialogTitle>
                        {reactionsPost?.length > 0 ? (
                            <div className="flex flex-col gap-5">
                                {reactionsPost?.map(reaction => (
                                    <div className="flex justify-between" key={reaction.id}>
                                        <div className='flex items-center gap-3'>
                                            <div className=''>
                                                <UserPerfilImg profilePictureUrl={reaction.user.profilePictureUrl} />
                                            </div>
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
                    </DialogPanel>
                </div>
            </Dialog>
        </>
    )
}

export default ModalGetAllReactions