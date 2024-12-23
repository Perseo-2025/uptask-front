import { BrowserRouter, Routes, Route } from "react-router-dom"
import AppLayout from "../../layouts/AppLayout"
import Dashboard from "../../page/Admin/Dashboard"
import ProjectPage from "../../page/projects/ProjectPage"
import Edit from "../../page/projects/Edit"
import ProjectDetails from "../../page/projects/ProjectDetails"


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
            </Routes>
        </BrowserRouter>
    )
}