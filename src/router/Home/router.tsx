import { BrowserRouter, Routes, Route } from "react-router-dom"
import AppLayout from "../../layouts/AppLayout"
import Dashboard from "../../page/Admin/Dashboard"
import ProjectPage from "../../page/projects/ProjectPage"
import Edit from "../../page/projects/Edit"
import ProjectDetails from "../../page/projects/ProjectDetails"
import Login from "../../auth/login/Login"
import AuthLayout from "../../layouts/AuthLayout"
import Register from "../../auth/register/Register"
import ConfirmAccount from "../../auth/confirm-account/ConfirmAccount"
import RegisterNewToken from "../../auth/request-new-token/RequestNewToken"
import ChangePassword from "../../auth/change-password/ChangePassword"
import NewPassword from "../../auth/change-password/NewPassword"



export default function Router() {
    
    return(
        <BrowserRouter>
            <Routes>
                <Route element={<AppLayout/>}>
                    <Route path="/dashboard" element={<Dashboard/>} index/>
                    <Route path="/projects/create" element={<ProjectPage/>}/>
                    <Route path="/projects/:projectId/edit" element={<Edit/>}/>
                    <Route path="/projects/:projectId/details-projects" element={<ProjectDetails />}/>
                </Route>

                <Route element={<AuthLayout/>} >
                    <Route path='/auth/login' element={<Login/>}></Route>
                    <Route path='/auth/register' element={<Register/>}></Route>
                    <Route path='/auth/confirm-account' element={<ConfirmAccount/>}></Route>
                    <Route path='/auth/request-new-token' element={<RegisterNewToken/>}></Route>
                    <Route path='/auth/change-password' element={<ChangePassword/>}></Route>
                    <Route path='/auth/new-password' element={<NewPassword/>}></Route>
                </Route>

            </Routes>
        </BrowserRouter>
    )
}