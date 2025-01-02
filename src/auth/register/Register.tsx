import { useForm } from "react-hook-form";
import { UserRegistrationForm } from "../validation";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { createAccount } from "../../api/auth.api";
import Swal from "sweetalert2";

export default function Register() {
   const navigate = useNavigate()
  const initialValues: UserRegistrationForm = {name: "",last_name: "",email: "",password: "",password_confirmation: "",};

  const { register,handleSubmit,reset,watch,formState: { errors }} = useForm<UserRegistrationForm>({ defaultValues: initialValues });

  const {mutate} = useMutation({
    mutationFn: createAccount,
    onError: (error) => {
      Swal.fire({
        icon: "error",
        title: error.message,
        text: "Ocurrió un error, verifique los datos!",
      });
    },
    onSuccess: (data) => {
      Swal.fire(data?.data, 'Te hemos enviado un correo electronico, revia tu email para confirmar tu cuenta', 'success');
      reset()
      navigate('/auth/confirm-account')
    }
  })

  const password = watch("password");

  const handleRegister = (formData: UserRegistrationForm) => mutate(formData)

  return (
    <>
      <form
        onSubmit={handleSubmit(handleRegister)}
        className="space-y-6 p-8 bg-white shadow-lg rounded-lg max-w-md mx-auto mt-10"
        noValidate
      >
        <h2 className="text-3xl font-bold text-gray-800 text-center">
          Crea tu cuenta
        </h2>
        <p className="text-gray-600 text-center">
          Regístrate para comenzar a administrar tus proyectos
        </p>

        {/* Campo Email */}
        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="font-medium text-gray-700 text-lg">
            Correo electrónico
          </label>
          <input
            id="email"
            type="email"
            placeholder="Escribe tu correo"
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-fuchsia-500 focus:outline-none"
            {...register("email", {
              required: "El correo electrónico es obligatorio",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "E-mail no válido",
              },
            })}
          />
          {errors.email && (
            <p className="text-sm text-red-600">{errors.email.message}</p>
          )}
        </div>

        {/* Campo Nombre */}
        <div className="flex flex-col gap-2">
          <label htmlFor="name" className="font-medium text-gray-700 text-lg">
            Nombre completo
          </label>
          <input
            id="name"
            type="text"
            placeholder="Escribe tu nombre"
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-fuchsia-500 focus:outline-none"
            {...register("name", {
              required: "El nombre es obligatorioi",
            })}
          />
          {errors.name && (
            <p className="text-sm text-red-600">{errors.name.message}</p>
          )}
        </div>

        {/* Campo Apellido */}
        <div className="flex flex-col gap-2">
          <label htmlFor="last_name" className="font-medium text-gray-700 text-lg">
            Apellidos
          </label>
          <input
            id="last_name"
            type="text"
            placeholder="Escribe tu apellido"
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-fuchsia-500 focus:outline-none"
            {...register("last_name", {
              required: "El apellido es obligatorio",
            })}
          />
          {errors.name && (
            <p className="text-sm text-red-600">{errors.last_name?.message}</p>
          )}
        </div>

        {/* Campo Password */}
        <div className="flex flex-col gap-2">
          <label
            htmlFor="password"
            className="font-medium text-gray-700 text-lg"
          >
            Contraseña
          </label>
          <input
            id="password"
            type="password"
            placeholder="Crea una contraseña"
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-fuchsia-500 focus:outline-none"
            {...register("password", {
              required: "La contraseña es obligatoria",
              minLength: {
                value: 8,
                message: "La contraseña debe tener al menos 8 caracteres",
              },
            })}
          />
          {errors.password && (
            <p className="text-sm text-red-600">{errors.password.message}</p>
          )}
        </div>

        {/* Campo Repetir Password */}
        <div className="flex flex-col gap-2">
          <label
            htmlFor="password_confirmation"
            className="font-medium text-gray-700 text-lg"
          >
            Repite la contraseña
          </label>
          <input
            id="password_confirmation"
            type="password"
            placeholder="Confirma tu contraseña"
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-fuchsia-500 focus:outline-none"
            {...register("password_confirmation", {
              required: "Es obligatorio confirmar la contraseña",
              validate: (value) =>
                value === password || "Las contraseñas no coinciden",
            })}
          />
          {errors.password_confirmation && (
            <p className="text-sm text-red-600">
              {errors.password_confirmation.message}
            </p>
          )}
        </div>

        {/* Botón de registro */}
        <input
          type="submit"
          value="Registrarme"
          className="bg-fuchsia-600 hover:bg-fuchsia-700 w-full p-3 text-white font-bold text-lg rounded-md cursor-pointer transition"
        />

        <p className="text-gray-500 text-sm text-center mt-4">
          ¿Ya tienes una cuenta?{" "}
          <Link
            to="/auth/login"
            className="text-fuchsia-600 hover:underline font-medium"
          >
            Inicia sesión aquí
          </Link>
        </p>
        <p className="text-gray-500 text-sm text-center mt-8">
        ¿Olvidastetu contraseña? 
        <Link to={"/auth/change-password"} className="text-blue-600 hover:underline">
          Reestablecer
        </Link>
      </p>
      </form>
    </>
  );
}
