import { z } from 'zod'

/* Auth & Users */
export const authSchema = z.object({
    name: z.string(),
    last_name: z.string(),
    email: z.string().email(),
    password: z.string(),
    password_confirmation: z.string(),
    token: z.string()
})
type Auth = z.infer<typeof authSchema>
export type UserLoginForm = Pick<Auth, 'email' | 'password'>
export type UserRegistrationForm = Pick<Auth, 'name' | 'last_name' | 'email' | 'password' | 'password_confirmation'>

export type ConfirmToken = Pick<Auth, 'token'>
