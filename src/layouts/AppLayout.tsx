import { Navigate, Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import { useAuth } from "../hooks/useAuth";
import Spineer from "../components/Spineer";

export default function AppLayout() {
  
  const {data, isError, isLoading} = useAuth()

  console.log(data)
  console.log(isError)
  console.log(isLoading)

  if(isLoading) return  <Spineer />
  
  if(isError) return <Navigate to='/auth/login'/>
  
  if(data) return (
    <div>
        <Header name={data.name} />
          <section className="max-w-screen-2xl mx-auto mt-10 p-5">
          <Outlet />
          </section>
        <Footer/>
    </div>
  );
}
