import { useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import { useMutation } from "@tanstack/react-query"
import { confirmTokenAccount } from "../../api/AuthAPI"


function ConfirmAccountPage() {

  const { register, handleSubmit } = useForm()
  const navigate = useNavigate()

  const mutation = useMutation({
    mutationFn: confirmTokenAccount,
    onSuccess: (data) => {
      console.log(data);
      navigate("/login")
    },
    onError: (error) => {
      console.log(error);
    }
  })

  const handleChangeSubmit = (data) => {
   mutation.mutateAsync(data)
  }

  return (
    <div className='flex flex-col gap-10 items-center justify-center'>
      <h1 className='text-white text-center text-4xl uppercase font-bold'>Tus palabras importan. Hazlas sonar en Konekt</h1>
      <form
        onSubmit={handleSubmit(handleChangeSubmit)}
        className='border-2 border-sky-600 p-5 rounded-2xl w-xl flex flex-col items-center'
      >
        <h2 className='text-center text-white text-3xl my-5 font-bold'>Confirma tu cuenta</h2>
        <p className='text-white text-center text-xl'>Ingresa el token que te enviamos a tu email</p>
        <div
          className='mt-10 flex gap-4'
        >
          <input 
            type="number"
            id="token" 
            className='bg-white p-3'
            placeholder='Ej. 12345'
            {...register("token", {
              required:"Ingresa un token"
            })}
          />
          <input 
            type="submit" 
            value={"Confirmar cuenta"}
            className='bg-sky-600 hover:bg-sky-700 text-white p-3 rounded-xl transition'
          />
        </div>
      </form>
    </div>
  )
}

export default ConfirmAccountPage