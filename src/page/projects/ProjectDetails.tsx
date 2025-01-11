import { Link, Navigate, useNavigate, useParams } from "react-router-dom"
import { getFullProjectDetails } from "../../api/project.api"
import { useQuery } from "@tanstack/react-query"
import Modal from "../task/Modal"
import TaskList from "../task/TaskList"
import EditTaskData from "../task/EditTaskData"
import TaskModalDetails from "../task/TaskModalDetails"
import Spineer from "../../components/Spineer"
import { useAuth } from "../../hooks/useAuth"
import isManager from "../../util/policies"
import { useMemo } from "react"
/* import EditModal from "../task/EditTaskModal" */

export default function ProjectDetails() {

  const { data: user, isLoading: authLoading } = useAuth()

  const navigate = useNavigate()

  const params = useParams()
  const projectId = params.projectId!
  
  const {data, isLoading,isError} = useQuery({ 
    queryKey: ['editProject', projectId], //-ojito aqui //me confundí: en vez de editProject deberi de ser solo 'project' para la mutación pero igual funciona
    queryFn: () => getFullProjectDetails(projectId),
    retry: false,
  })

  const canEdit = useMemo(() => data?.manager === user?._id , [data, user])

  if(isLoading && authLoading) return <Spineer />
  if(isError) return <Navigate to='/404'/>
  if(data && user) return (
    <>
      <h1 className="text-5xl font-semibold">{data.projectName}</h1>
      <p className="text-2xl font-semibold">{data.description}</p>

      {isManager(data.manager, user._id) && (
          <nav className="my-5 flex gap-3">
          <button className="bg-indigo-600 hover:bg-indigo-800 transition-colors text-white font-bold uppercase rounded-lg p-3 flex gap-3 items-center"
            type="button"
            onClick={() => navigate('?newTask=true')}
          >
            Agregar Tarea
          </button>
  
          <Link className="bg-fuchsia-600 hover:bg-fuchsia-700 transition-colors text-white font-bold uppercase rounded-lg p-3 flex gap-3 items-center"
            to={"team"}
          >
            Colaboradores
          </Link>
        </nav>
      )}

      
      <TaskList
        tasks={data.tasks}
        canEdit={canEdit}
      />
      {/* Modales ventana flotante*/}

      <Modal/>

      <EditTaskData />

      <TaskModalDetails/>

    </>
  )
  

}
