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
    const token = localStorage.getItem('AUTH_TOKEN') //obtenemos el token
    console.log(token);
    try {
        const url = `/dashboard/${projectId}/tasks`
        const { data} = await api.post<string>(url, formData, {headers: {Authorization: `Bearer ${token}`}})
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error('desde onError');
          }
    }
}

export async function getTaskById({projectId, taskId}: Pick<TaskAPI, 'projectId' | 'taskId'>) {
    const token = localStorage.getItem('AUTH_TOKEN') //obtenemos el token
    console.log(token);
    try {   
        const url = `/dashboard/${projectId}/tasks/${taskId}`
        const {data} = await api(url, {headers: {Authorization: `Bearer ${token}`}})
        const response = taskSchema.safeParse(data)
        console.log(response);
        if(response.success){
            console.log(response.data);
            
            return response.data
        } 
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error('desde onError');
          }
        console.log(error);
    }
}

export async function updateTaskApi({projectId, taskId, formData}: Pick<TaskAPI, 'projectId' | 'taskId' | 'formData'>) {
    const token = localStorage.getItem('AUTH_TOKEN') //obtenemos el token
    console.log(token);
    try {   
        const url = `/dashboard/${projectId}/tasks/${taskId}`
        const {data} = await api.put<string>(url, formData, {headers: {Authorization: `Bearer ${token}`}})
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error('desde onError');
          }
        console.log(error);
    }
}

export async function deleteTaskApi({projectId, taskId}: Pick<TaskAPI, 'projectId' | 'taskId'>) {
    const token = localStorage.getItem('AUTH_TOKEN') //obtenemos el token
    console.log(token);
    try {   
        const url = `/dashboard/${projectId}/tasks/${taskId}`
        const {data} = await api.delete<string>(url, {headers: {Authorization: `Bearer ${token}`}})
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
    const token = localStorage.getItem('AUTH_TOKEN') //obtenemos el token
    console.log(token);
    try {   
        const url = `/dashboard/${projectId}/tasks/${taskId}/status/`
        const {data} = await api.post<string>(url, {status}, {headers: {Authorization: `Bearer ${token}`}})
        const response = taskSchema.safeParse(data);
        if(response.success) return response.data
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error('desde onError');
          }
        console.log(error);
    }
}