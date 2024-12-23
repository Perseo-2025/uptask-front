import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

export default function AppLayout() {
  return (
    <div>
        <Header/>
          <section className="max-w-screen-2xl mx-auto mt-10 p-5">
          <Outlet />
          </section>
        <Footer/>
    </div>
  );
}
