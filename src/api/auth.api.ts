import { isAxiosError } from "axios";
import api from "../lib/axios";
import { ConfirmToken, UserRegistrationForm } from "../auth/validation/index";

export async function createAccount(formData:UserRegistrationForm) {
    try {
        const url = '/auth/register'
        const data = await api.post<string>(url, formData)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.message);
        }
    }
}

export async function confirmAccount(formData:ConfirmToken) {
    try {
        const url = '/auth/confirmation-account'
        const data = await api.post<string>(url, formData)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.message);
        }
    }
}