import { isAxiosError } from "axios";
import api from "../lib/axios";
import { Project, Task, TaskFormData, taskSchema } from "../types";

type TaskAPI = {
    formData: TaskFormData,
    projectId: Project['_id'],
    taskId: Task['_id'],
    status: Task['status']
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

export async function updateTaskApi({projectId, taskId, formData}: Pick<TaskAPI, 'projectId' | 'taskId' | 'formData'>) {
    try {   
        const url = `/dashboard/${projectId}/tasks/${taskId}`
        const {data} = await api.put<string>(url, formData)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error('desde onError');
          }
        console.log(error);
    }
}

export async function deleteTaskApi({projectId, taskId}: Pick<TaskAPI, 'projectId' | 'taskId'>) {
    try {   
        const url = `/dashboard/${projectId}/tasks/${taskId}`
        const {data} = await api.delete<string>(url)
        const response = taskSchema.safeParse(data);
        if(response.success) return response.data
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error('desde onError');
          }
        console.log(error);
    }
}

//Api para el estado
export async function updateStatusTask({projectId, taskId, status}: Pick<TaskAPI, 'projectId' | 'taskId' | 'status'>) {
    try {   
        const url = `/dashboard/${projectId}/tasks/${taskId}/status/`
        const {data} = await api.post<string>(url, {status})
        const response = taskSchema.safeParse(data);
        if(response.success) return response.data
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error('desde onError');
          }
        console.log(error);
    }
}