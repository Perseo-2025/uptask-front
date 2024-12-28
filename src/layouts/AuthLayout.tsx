import { Outlet } from "react-router-dom";

export default function AuthLayout() {
  return (
    <>
      <div className="bg-gradient-to-br from-gray-800 to-gray-900 min-h-screen flex items-center justify-center">
        <div className="bg-white shadow-lg rounded-lg p-8 w-[450px]">
        <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500 text-center">
            UpTask
        </h1>
    
          <div className="mt-10">
            <Outlet />
          </div>

          
        </div>
      </div>
    </>
  );
}
