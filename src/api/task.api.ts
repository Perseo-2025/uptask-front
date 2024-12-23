import { isAxiosError } from "axios";
import api from "../lib/axios";
import { Project, Task, TaskFormData } from "../types";

type TaskAPI = {
    formData: TaskFormData,
    projectId: Project['_id'],
    taskId: Task['_id']
}


export async function createTask({formData, projectId} : Pick<TaskAPI, 'formData' | 'projectId'>) {
    try {
        const url = `/dashboard/${projectId}/tasks`
        const { data} = await api.post<string>(url, formData)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error('desde onError');
          }
    }
}

export async function getTaskById({projectId, taskId}: Pick<TaskAPI, 'projectId' | 'taskId'>) {
    try {   
        const url = `/dashboard/${projectId}/tasks/${taskId}`
        const {data} = await api(url)
        console.log('No hay nadada',data);
        
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error('desde onError');
          }
        console.log(error);
    }
}