import { isAxiosError } from "axios";
import api from "../lib/axios";
import { dashboardProjectsSchema, Project, ProjectFormData } from "../types";
//dato este archivo trabaja con el archivo de los types index.js
export async function createProject(formData:ProjectFormData) {
    try {
        const {data} = await api.post('/dashboard/projects', formData); 
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error('desde onError');
          }
    }
}

export async function getProjects(){
    try {
        const { data }  = await api('/dashboard/projects')
        const response = dashboardProjectsSchema.safeParse(data);
        if(response.success) return response.data
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error('desde onError');
        }
    }
}

export async function getProjectsById(id: Project['_id']){
    try {
        const { data } = await api(`/dashboard/projects/${id}`)
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
    try {
        const { data } = await api.put<string>(`/dashboard/projects/${projectId}`, formData)
        return data        
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error('desde onError');
        }
    }
}


export async function deleteProject(id: Project['_id']){
    try {
        const { data } = await api.delete<string>(`/dashboard/projects/${id}`)
        return data        
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error('desde onError');
        }
    }
}
