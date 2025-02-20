import {z} from 'zod';
import { userPerfilSchema } from '../auth/validation';

/* Notes */
export const noteSchema = z.object({
    _id: z.string(),
    content: z.string(),
    createdBy: userPerfilSchema,
    task: z.string(),
    createdAt: z.string()
})
export type Note = z.infer<typeof noteSchema>
export type NoteFormData = Pick<Note, 'content'>


/* Task */

export const taskStatusSchema = z.enum(["pending" , "onHold" , "inProgress" , "underReview" , "completed"])
export type TaskStatus = z.infer<typeof taskStatusSchema>

export const taskSchema = z.object({
    _id: z.string(),
    name: z.string(),
    description: z.string(),
    project: z.string(),
    status: taskStatusSchema,
    completedBy: z.array(z.object({
        status: taskStatusSchema,
        user: userPerfilSchema,
        _id: z.string(),
    })), 
    notes: z.array(noteSchema.extend({createdBy: userPerfilSchema})),
    createdAt: z.string(),
    updatedAt: z.string()
})
export const taskProjectSchema = taskSchema.pick({
    _id: true,
    name: true,
    description: true,
    status: true,
})

export type Task = z.infer<typeof taskSchema>
export type TaskFormData = Pick<Task, 'name' | 'description'>
export type TaskProject = z.infer<typeof taskProjectSchema>


/* Projects */
export const projectSchema = z.object({
    _id: z.string(),
    projectName: z.string(),
    clientName: z.string(),
    description: z.string(),
    manager: z.string(userPerfilSchema.pick({_id:true})),
    tasks: z.array(taskProjectSchema),
    team: z.array(z.string(userPerfilSchema.pick({_id:true})))
})

export const dashboardProjectsSchema = z.array(
    projectSchema.pick({
        _id: true,
        clientName: true,
        projectName: true,
        description: true,
        manager: true
    })
);

export const editProjectSchema = projectSchema.pick({
    projectName: true,
    clientName: true,
    description: true
})
export type Project = z.infer<typeof projectSchema>;
export type ProjectFormData = Pick<Project, 'clientName' | 'projectName' | 'description'>

/* TEAM */
export const teamMemberSchema = userPerfilSchema.pick({
    name:true,
    email: true,
    _id: true
})


export const teamMembersSchema = z.array(teamMemberSchema)
export type TeamMember = z.infer<typeof teamMemberSchema>
export type TeamMemberFormulario = Pick<TeamMember, 'email'>