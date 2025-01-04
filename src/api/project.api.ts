import { isAxiosError } from "axios";
import api from "../lib/axios";
import { dashboardProjectsSchema, Project, ProjectFormData } from "../types";
//dato este archivo trabaja con el archivo de los types index.js
export async function createProject(formData:ProjectFormData) {
    const token = localStorage.getItem('AUTH_TOKEN') //obtenemos el token
    console.log(token);
    try {
        const {data} = await api.post('/dashboard/projects', formData, {headers: {Authorization: `Bearer ${token}`}}); 
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error('desde onError');
          }
    }
}

export async function getProjects(){
    const token = localStorage.getItem('AUTH_TOKEN') //obtenemos el token
    console.log(token);
    try {
        const { data }  = await api('/dashboard/projects', {headers: {Authorization: `Bearer ${token}`}})
        console.log(data);
        
        const response = dashboardProjectsSchema.safeParse(data);
        if(response.success) return response.data
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error('desde onError');
        }
    }
}

export async function getProjectsById(id: Project['_id']){
    const token = localStorage.getItem('AUTH_TOKEN') //obtenemos el token
    console.log(token);
    try {
        const { data } = await api(`/dashboard/projects/${id}`, {headers: {Authorization: `Bearer ${token}`}})
        return data        
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error('desde onError');
        }
    }
}

type  ProjectApiType = {
    formData: ProjectFormData,
    projectId: Project['_id']
}
export async function updateProject({formData, projectId}: ProjectApiType){
    const token = localStorage.getItem('AUTH_TOKEN') //obtenemos el token
    console.log(token);
    try {
        const { data } = await api.put<string>(`/dashboard/projects/${projectId}`, formData.clientName, {headers: {Authorization: `Bearer ${token}`}})
        return data        
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error('desde onError');
        }
    }
}


export async function deleteProject(id: Project['_id']){
    const token = localStorage.getItem('AUTH_TOKEN') //obtenemos el token
    console.log(token);
    try {
        const { data } = await api.delete<string>(`/dashboard/projects/${id}`, {headers: {Authorization: `Bearer ${token}`}})
        return data        
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error('desde onError');
        }
    }
}
