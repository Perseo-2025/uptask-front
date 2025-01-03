import { isAxiosError } from "axios";
import api from "../lib/axios";
import { ConfirmToken, ForgotPasswordForm, NewPasswordForm, RequestConfirmationCodeForm, UserLoginForm, UserRegistrationForm } from "../auth/validation/index";

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
        const {data} = await api.post<string>(url, formData)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.message);
        }
    }
}

export async function requestConfirmationCodeForm(formData:RequestConfirmationCodeForm) {
    try {
        const url = '/auth/reset-token'
        const {data} = await api.post<string>(url, formData)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.message);
        }
    }
}

//Login - JWT -COOKIE
export async function authenticate(formData:UserLoginForm) {
    try {
        const url = '/auth/login'
        const {data} = await api.post<string>(url, formData)
        localStorage.setItem('AUTH_TOKEN', data)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.message);
        }
    }
}

export async function changePassword(formData:ForgotPasswordForm) {
    try {
        const url = '/auth/change-password'
        const {data} = await api.post<string>(url, formData)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.message);
        }
    }
}

export async function validateToken(formData:ConfirmToken) {
    try {
        const url = '/auth/validate-token'
        const {data} = await api.post<string>(url, formData)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.message);
        }
    }
}


export async function updatePasswordWithToken({formData, token}:{formData: NewPasswordForm, token: ConfirmToken['token']}) {
 
    try {
        const url = `/auth/change-password/${token}`
        const {data} = await api.post<string>(url, formData)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.message);
        }
    }
}

export async function getUserApi() {
    try {
        const { data } = await api('/auth/perfil/user')
        console.log(data);
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.message);
        }
    }
}