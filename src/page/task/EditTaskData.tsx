/* Este archivo hace consulta al id */

import { useQuery } from "@tanstack/react-query";
import { useLocation, useParams } from "react-router-dom"
import { getTaskById } from "../../api/task.api";
import EditTaskModal from "./EditTaskModal";
/* import EditTaskModal from "./EditTaskModal"; */


export default function EditTaskData() {

  const params = useParams()
  const projectId = params.projectId!
    

  //extraer el id para editarlo
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search);
  const taskId = queryParams.get('editTaskId')! //<---- ojo
  console.log(taskId);

  const {data} = useQuery({
    queryKey: ['task',taskId],
    queryFn: () => getTaskById({projectId, taskId}),
    enabled: !!taskId //convierte a booleano
  })
  console.log(data);
  
  if(data) return <EditTaskModal data={data}/>
  
}
