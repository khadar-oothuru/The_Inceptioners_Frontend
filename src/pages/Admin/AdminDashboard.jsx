import { Outlet } from "react-router-dom";
import Footer from "../Footer";


const AdminDashboard = () => {
  return (
    <div className="flex h-screen">
      <div className="flex-1  bg-slate-50">
       
        <Outlet />
        <Footer/>
      </div>
    </div>
  );
};

export default AdminDashboard;
