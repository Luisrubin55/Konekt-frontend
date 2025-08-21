import { toast } from "react-toastify"
import { useForm } from "react-hook-form"
import { useMutation } from "@tanstack/react-query"
import { searchAccount } from "../../api/AuthAPI"

function ForgotPasswordPage() {
  const { register, handleSubmit } = useForm()

  const mutation = useMutation({
    mutationFn: searchAccount,
    onSuccess: (data) => {
      toast.success(data.message)
    },
    onError: (error) => {
      toast.error(error.message)
    }
  })

  const handleChangeSubmit = (data) => {
   mutation.mutateAsync(data)
  }
  return (
    <div className='flex flex-col gap-10 items-center justify-center'>
      <h1 className='text-white text-center text-4xl uppercase font-bold'>No es solo una red, es tu espacio.</h1>
      <form
        onSubmit={handleSubmit(handleChangeSubmit)}
        className='border-2 border-sky-600 p-5 rounded-2xl w-xl flex flex-col items-center'
      >
        <h2 className='text-center text-white text-3xl my-5 font-bold'>Recuperar Cuenta</h2>
        <div
          className='mt-10'
        >
          <input 
            type="email"
            id="email" 
            className='bg-white p-3 w-80'
            placeholder='Ingresa tu correo electronico'
            {...register("email", {
              required:"Ingresa tu email"
            })}
          />
        </div>
         <input 
            type="submit" 
            value={"Buscar cuenta"}
            className=' mt-5 w-80 bg-sky-600 hover:bg-sky-700 font-bold text-white p-3 rounded-xl transition'
          />
      </form>
    </div>
  )
}

export default ForgotPasswordPage