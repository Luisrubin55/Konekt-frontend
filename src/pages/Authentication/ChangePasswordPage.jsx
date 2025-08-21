import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import {changePasswordAccount} from "../../api/AuthAPI"

function ChangePasswordPage() {
  const navigate = useNavigate();
  const { register, handleSubmit, watch, formState:{errors}} = useForm()
  const password = watch('password');
  const { token } = useParams();
  
  const {mutateAsync} = useMutation({
        mutationFn: changePasswordAccount,
        onSuccess: (data) => {
            toast.success(data.message)
            navigate("/login")
        },
        onError: (error) => {
            toast.error(error.message)
        }
    })

  const handleChangeSubmit = (formData) => {
    const values = {
      password: formData.password,
      token: token
    }
    mutateAsync(values)
  }

  return <div className='flex flex-col gap-10 items-center justify-center'>
      <h1 className='text-white text-center text-4xl uppercase font-bold'>No es solo una red, es tu espacio.</h1>
      <form
        onSubmit={handleSubmit(handleChangeSubmit)}
        className='border-2 border-sky-600 p-5 rounded-2xl w-xl flex flex-col items-center'
      >
        <h2 className='text-center text-white  text-3xl my-5 font-bold'>Recuperar Cuenta</h2>
        <div
          className='mt-3 flex flex-col justify-center items-center gap-5'
        >
          <input 
            type="password"
            id="password" 
            className='bg-white p-3 w-80'
            placeholder='Ingresa tu nueva contraseña'
            {...register("password", {
              required:"La contraseña es obligatoria"
            })}
          />
          <input 
            type="password"
            id="password2" 
            className='bg-white p-3 w-80'
            placeholder='Confirma tu nueva contraseña'
            {...register("confirmPassword", {
              required:"Confirma tu contraseña",
              validate: (value) => value === password || 'Las contraseñas no coninciden'
            })}
          />
          {errors.confirmPassword && <p className="text-red-800">{errors.confirmPassword.message}</p>}
        </div>
         <input 
            type="submit" 
            value={"Recuperar Cuenta"}
            className=' mt-5 w-80 bg-sky-600 hover:bg-sky-700 font-bold text-white p-3 rounded-xl transition'
          />
      </form>
    </div>;
}

export default ChangePasswordPage;
