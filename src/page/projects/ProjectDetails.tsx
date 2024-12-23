import { Navigate, useNavigate, useParams } from "react-router-dom"
import { getProjectsById } from "../../api/project.api"
import { useQuery } from "@tanstack/react-query"
import Modal from "../task/Modal"
import TaskList from "../task/TaskList"
import EditTaskData from "../task/EditTaskData"
import TaskModalDetails from "../task/TaskModalDetails"
/* import EditModal from "../task/EditTaskModal" */

export default function ProjectDetails() {

  const navigate = useNavigate()

  const params = useParams()
  const projectId = params.projectId!
  
  const {data, isLoading,isError} = useQuery({ 
    queryKey: ['editProject', projectId], //-ojito aqui
    queryFn: () => getProjectsById(projectId),
    retry: false,
  })
 
  if(isLoading) return "Cargando..."
  if(isError) return <Navigate to='/404'/>
  

  if(data) return (
    <>
      <h1 className="text-5xl font-semibold">{data.projectName}</h1>
      <p className="text-2xl font-semibold">{data.description}</p>

      <nav className="my-5 flex gap-3">
        <button className="bg-indigo-600 hover:bg-indigo-800 transition-colors text-white font-bold uppercase rounded-lg p-3 flex gap-3 items-center"
          type="button"
          onClick={() => navigate('?newTask=true')}
        >
          Agregar Tarea
        </button>
      </nav>
      <TaskList
        tasks={data.tasks}
      />
      {/* Modales ventana flotante*/}

      <Modal/>

      <EditTaskData />

      <TaskModalDetails/>

    </>
  )
  

}
