import {  NavLink } from "react-router-dom";
import { User } from "../auth/validation";
import { useQueryClient } from "@tanstack/react-query";

type NavMenuHeaderProps = {
  name: User['name']
}

export default function Header({name}:NavMenuHeaderProps) {

  const queryClient = useQueryClient()
  const logout = () => {
    localStorage.removeItem('AUTH_TOKEN')
    queryClient.invalidateQueries({queryKey: ['user']})
  }


  return (
    <header>
      <nav className="bg-white border-gray-200 dark:bg-gray-900">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <a
            href="https://flowbite.com/"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <img
              src="./logo.webp"
              className="h-8"
              alt="Flowbite Logo"
            />
            <span className="self-center text-2xl font-extrabold whitespace-nowrap dark:text-white ">
              TODOLIST
            </span>
          </a>
          <button
            data-collapse-toggle="navbar-default"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-default"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
          <div className="hidden w-full md:block md:w-auto" id="navbar-default">
          <ul className="flex space-x-4">
        <li>
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              isActive
                ? "text-blue-700 font-bold underline"
                : "text-gray-700 hover:text-blue-500"
            }
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/projects/create"
            className={({ isActive }) =>
              isActive
                ? "text-blue-700 font-bold underline"
                : "text-gray-700 hover:text-blue-500"
            }
          >
            Nuevo Proyecto
          </NavLink>
        </li>
        <li>
          <span>Bienvenido {name}</span>
        </li>
        <li>
        <button type="button" 
        className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
        onClick={logout}
        >Cerrar Sesión</button>
        </li>
      </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}
