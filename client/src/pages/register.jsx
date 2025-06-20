import { useState } from "react";
import {ToastContainer , toast} from "react-toastify";
import { useNavigate } from "react-router-dom";

function Register() {
    var navigate=useNavigate()


  let showError = (message) =>{
    toast.error(message);
  }

  let showSuccess = (message) =>{
    toast.success(message);
  }
  
  let [username, setUsername] = useState("");
  let [useremail, setUseremail] = useState("");
  let [password, setUserpass] = useState("");

  let RegisterUser = () => {
    if (username != "" && useremail != "" && password != "") {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      const raw = JSON.stringify({
        username: username,
        email: useremail,
        password: password,
      });

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      fetch("http://localhost:3000/user/register", requestOptions)
        .then((response) => response.text())
        .then((result) => {
          let data = JSON.parse(result);
          if(data.status === "failed"){
            return showError(data.message);
          } else{
            navigate("/verifyotp" , {replace : true , state : {email : useremail , forget : false}} );
            showSuccess(data.message);

          }
          
        })
        .catch((error) => console.error(error));
    } else{
      showError("Please fill all the fields");
    }
  };

  return (
    <section className="flex justify-center items-center h-[100vh] w-[100%]">
      <div className="center-box rounded-md  w-[30%] h-[fit-content] pb-[15px] pt-[15px]">
        <div className="heading flex justify-center items-center h-[100px] font-bold text-4xl">
          <h2>Register </h2>
        </div>
        <div className="flex flex-col pr-3 pl-3">
          <input
            type="text"
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            className="h-[42px] indent-2 border-1 border-gray-300 rounded-sm mb-[12px]"
            placeholder="Username"
          />
          <input
            type="text"
            onChange={(e) => {
              setUseremail(e.target.value);
            }}
            className="h-[42px] indent-2 border-1 border-gray-300 rounded-sm mb-[12px]"
            placeholder="Email"
          />
          <input
            type="password"
            onChange={(e) => {
              setUserpass(e.target.value);
            }}
            className="h-[42px] indent-2 border-1 border-gray-300 rounded-sm mb-[12px]"
            placeholder="Password"
          />
        </div>
        <div className="pr-3 pl-3">
          <button
            onClick={RegisterUser}
            className="rounded-lg w-[100%] h-[49px] bg-black"
          >
            <span className="text-white font-bold">Register</span>
          </button>
        </div>
      </div>
    </section>
  );
}

export default Register;
