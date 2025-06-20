import {Routes,Route} from "react-router-dom";
import Login from "../pages/login";
import Home from "../pages/home";
import Register from "../pages/register";
import Verifyotp from "../pages/verifyotp";
import Dashboard from "../pages/dashboard";
import Forgotpassword from "../pages/forgotpassword";
import Newpassword from "../pages/newpassword";

function Routing(){
    return(
        <Routes>
            <Route path="/" element={<Home></Home>}></Route>
            <Route path="/login" element={<Login></Login>}></Route>
            <Route path="/register" element={<Register></Register>}></Route>
            <Route path="/verifyotp" element={<Verifyotp></Verifyotp>}></Route>
            <Route path="/dashboard" element={<Dashboard></Dashboard>}></Route>
            <Route path="/forgotpassword" element={<Forgotpassword></Forgotpassword>}></Route>
            <Route path="/newpassword" element={<Newpassword></Newpassword>}></Route>
        </Routes>
    )
}

export default Routing