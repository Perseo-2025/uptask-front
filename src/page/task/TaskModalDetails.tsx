import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Navigate, useLocation, useNavigate, useParams } from 'react-router-dom';
import { getTaskById } from '../../api/task.api';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import { formatDate } from '../../util/format-date';


export default function TaskModalDetails() {

    const params = useParams()
    const projectId = params.projectId!

    const navigate = useNavigate()
    const location = useLocation();
    const queryParams = new  URLSearchParams(location.search);
    const taskId = queryParams.get('viewTask')!

    const show = taskId ? true : false
    
    const { data, isError, error} = useQuery({ 
        queryKey: ['task',taskId],
        queryFn: () => getTaskById({projectId, taskId }),
        enabled: !!taskId, //convierte a booleano
        retry: false
    })
    if(isError){
        Swal.fire({
            icon: "error",
            title: error.message,
            text: "Ocurrió un error, verifique los datos!",
        });
        return <Navigate to={`/dashboard`} />
    }
    

    if(data) return (
        <>
            <Transition appear show={show} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={() => navigate(location.pathname, { replace: true })}>
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
                                    <p className='text-sm text-slate-400'>Agregada el: {formatDate(data.createdAt)} </p>
                                    <p className='text-sm text-slate-400'>Última actualización: {formatDate(data.updatedAt)} </p>
                                    <Dialog.Title
                                        as="h3"
                                        className="font-black text-4xl text-slate-600 my-5"
                                    >{data.name}
                                    </Dialog.Title>
                                    <p className='text-lg text-slate-500 mb-2'>{data.description}</p>
                                    <div className='my-5 space-y-3'>
                                        <label className='font-bold'>Estado actual: {data.status}</label>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}