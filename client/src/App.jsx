import "./App.css";
import DashboardNavbar from "./components/dashboardNav";
import Navbar from "./components/navbar";
import Routing from "./routing/routing";
import { ToastContainer, toast } from "react-toastify";

function App() {
  return (
    <>
      <Navbar></Navbar>
      <DashboardNavbar></DashboardNavbar>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

      <Routing></Routing>
    </>
  );
}

export default App;
