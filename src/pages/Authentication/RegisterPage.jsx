import { NavLink, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useMutation } from '@tanstack/react-query'
import { toast } from "react-toastify"
import { registerUser } from '../../api/AuthAPI'

function RegisterPage() {

    const { register, handleSubmit, resetField } = useForm()
    const navigate = useNavigate();
    
    const {mutateAsync} = useMutation({
        mutationFn: registerUser,
        onSuccess: (data) => {
            console.log(data)
            toast.success(data.message)
            navigate("/confirm-account")
        },
        onError: (error) => {
            toast.error(error.message)
        }
    })

    const onChangeForm = (formData) => {
       mutateAsync(formData)
       resetField()
    }

  return (
     <div className='flex flex-col gap-5 items-center justify-center'>
      <h1 className='text-white text-3xl text-center uppercase font-bold'>“Konekt: donde todas las conversaciones empiezan.”</h1>
      <form 
            onSubmit={handleSubmit(onChangeForm)}
            className='border-2 border-sky-600 p-5 rounded-2xl w-xl'
        >
            <h2 className='text-center text-white text-3xl my-5 font-bold'>Crear Cuenta</h2>
            <div className='flex gap-4'>
                <input 
                    type="text" 
                    id="name"
                    className='w-full p-3 bg-white rounded-xl text-xl'
                    placeholder='Nombre'
                    {...register("name", {
                        required:"El nombre es obligatorio"
                    })}
                />
                <input 
                    type="text" 
                    id="paternalSurname"
                    className='w-full p-3 bg-white rounded-xl text-xl'
                    placeholder='Apellido'
                    {...register("paternalSurname", {
                        required:"El apellido es obligatorio"
                    })}
                />
            </div>
            <div className='flex gap-5 mt-5'>
                <input 
                    type="date"
                    id="birthdate"
                    className='w-full p-3 bg-white rounded-xl text-xl text-slate-500'
                    {...register("birthdate", {
                        required:"Ingresa tu fecha de nacimiento"
                    })}
                />
                <select
                  className='w-full p-3 bg-white rounded-xl text-xl text-slate-500'
                  id='genre'
                  {...register("genre", {
                    required:"Selecciona tu genero"
                  })}
                >
                  <option value="">-- Genero --</option>
                  <option value="masculino">Masculino</option>
                  <option value="femenino">Femenino</option>
                </select>
            </div>
             <div className='flex flex-col mt-5  gap-4'>
                <input 
                    type="email" 
                    id="email"
                    className='w-full p-3 bg-white rounded-xl text-xl'
                    placeholder='Correo electronico'
                    {...register("email", {
                        required:"El correo electronico es obligatorio",
                        pattern: {
                            value:/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                            message:"Correo electronico no valido"
                        }
                    })}
                />
                <input 
                    type="password" 
                    id="password"
                    className='w-full p-3 bg-white rounded-xl text-xl'
                    placeholder='Contraseña'
                    {...register("password", {
                        required:"El password es obligatorio"
                    })}
                />
            </div>
            <input 
                type="submit" 
                value={"Iniciar Sesión"}
                className='w-full mt-4 bg-sky-500 p-2 rounded-2xl hover:bg-sky-600 text-2xl font-bold text-white'
            />
            <div className=' flex justify-between  mt-5'>
                <NavLink
                    to={"/login"}
                    className="text-white text-md font-bold hover:text-sky-300"
                >¿Ya tienes una cuenta? Inicia sesión</NavLink>
                <NavLink
                    to={"/forgot-password"}
                    className="text-white text-md font-bold hover:text-sky-300"
                >¿Olvidaste tu contraseña?</NavLink>
            </div>
        </form>
     </div>
  )
}

export default RegisterPage