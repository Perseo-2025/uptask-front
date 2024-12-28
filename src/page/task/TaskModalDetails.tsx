import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import {
  Navigate,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import { getTaskById, updateStatusTask } from "../../api/task.api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { formatDate } from "../../util/format-date";
import { statusTranslation } from "../../traductor/es";
import { TaskStatus } from "../../types";

export default function TaskModalDetails() {
  const params = useParams();
  const projectId = params.projectId!;
  const queryCliente = useQueryClient()

  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const taskId = queryParams.get("viewTask")!;

  const show = taskId ? true : false;

  const { data, isError, error } = useQuery({
    queryKey: ["task", taskId],
    queryFn: () => getTaskById({ projectId, taskId }),
    enabled: !!taskId, //convierte a booleano
    retry: false,
  });

  //Aqui se maneja el esatdo de las tareas
  const { mutate } = useMutation({
    mutationFn: updateStatusTask,
    onError: (error) => {
      Swal.fire({
        icon: "error",
        title: error,
        text: "Algo salió mal. Por favor, inténtalo de nuevo.",
        confirmButtonText: "Entendido",
      });
    },
    onSuccess: (data) => {
      queryCliente.invalidateQueries({ queryKey: ["editProject", projectId] });
      queryCliente.invalidateQueries({ queryKey: ["task", taskId] });
      Swal.fire({
        icon: "success",
        title: data,
        text: "😃",
        confirmButtonText: "¡Entendido!",
      });
      //navigate(location.pathname, { replace: true }); //<- reinicia el formulario y oculta el modal
    },
  });

  //funcion para seleccionar el estado del select
  const handleChange = (e : React.ChangeEvent<HTMLSelectElement>) => {
    const data = {projectId, taskId, status: e.target.value as TaskStatus}
    mutate(data)
  }

  if (isError) {
    Swal.fire({
      icon: "error",
      title: error.message,
      text: "Ocurrió un error, verifique los datos!",
    });
    return <Navigate to={`/dashboard`} />;
  }

  if (data)
    return (
      <>
        <Transition appear show={show} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-10"
            onClose={() => navigate(location.pathname, { replace: true })}
          >
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black/60" />
            </Transition.Child>

            <div className="fixed inset-0 overflow-y-auto">
              <div className="flex min-h-full items-center justify-center p-4 text-center">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 scale-95"
                  enterTo="opacity-100 scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="opacity-0 scale-95"
                >
                  <Dialog.Panel className="w-full max-w-4xl transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all p-16">
                    <p className="text-sm text-slate-400">
                      Agregada el: {formatDate(data.createdAt)}{" "}
                    </p>
                    <p className="text-sm text-slate-400">
                      Última actualización: {formatDate(data.updatedAt)}{" "}
                    </p>
                    <Dialog.Title
                      as="h3"
                      className="font-black text-4xl text-slate-600 my-5"
                    >
                      {data.name}
                    </Dialog.Title>
                    <p className="text-lg text-slate-500 mb-2">
                      {data.description}
                    </p>
                    <div className="my-5 space-y-3">
                      <label className="font-bold">Estado actual</label>

                      <select className="w-ful p-3 bg-white border border-gray-300 rounded-lg"
                        onChange={handleChange}
                      >
                        {Object.entries(statusTranslation).map(
                          ([key, value]) => (
                            <option
                              key={key}
                              value={key}
                              selected={data.status === key}
                            >
                              {value}
                            </option>
                          )
                        )}
                      </select>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition>
      </>
    );
}
