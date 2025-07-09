import { NavLink, useNavigate } from 'react-router-dom'
import { useForm } from "react-hook-form"
import { useMutation } from '@tanstack/react-query'
import { login } from '../../api/AuthAPI'
function LoginPage() {

    const { register, handleSubmit, formState:{errors} } = useForm()
    const navigate = useNavigate()

    const mutation = useMutation({
        mutationFn:login,
        onSuccess:(data) => {
            navigate("/")
        },
        onError: (error) => {
            console.log(error);
        }
    })

    const handleChange = (data) => {
        mutation.mutateAsync(data)
    }

  return (
    <div className='flex flex-col gap-5 items-center justify-center'>
        <h1 className='text-white text-center text-5xl uppercase font-bold'>Aquí nacen las amistades reales.</h1>
        <form  
            action={handleSubmit(handleChange)}
            className='border-2 border-sky-600 p-5 rounded-2xl w-xl'
        >
            <h2 className='text-center text-white text-3xl my-5 font-bold'>Iniciar Sesión</h2>
            <div className='w-full'>
                <input 
                    type="text" 
                    id="email"
                    className='w-full p-3 bg-white rounded-xl text-xl'
                    placeholder='Ingresa tu correo electronico'
                    {...register("email", {
                        required:"El email es obligatorio"
                    })}
                />
            </div>
            <div className='my-5'>
                <input 
                    type="password"
                    id="password"
                    className='w-full p-3 bg-white rounded-xl text-xl'
                    placeholder='Contraseña'
                    {...register("password", {
                        required:"Ingre un password valido"
                    })}
                />
            </div>
            <input 
                type="submit" 
                value={"Iniciar Sesión"}
                className='w-full bg-sky-500 p-2 rounded-2xl hover:bg-sky-600 text-2xl font-bold text-white'
            />
            <div className=' flex justify-between  mt-5'>
                <NavLink
                    to={"/register"}
                    className="text-white text-md font-bold hover:text-sky-300"
                >¿No tienes una cuenta? Registrate</NavLink>
                <NavLink
                    to={"/forgot-password"}
                    className="text-white text-md font-bold hover:text-sky-300"
                >¿Olvidaste tu contraseña?</NavLink>
            </div>
        </form>
    </div>
  )
}

export default LoginPage