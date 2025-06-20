import React, { useState } from "react";
import { useLocation , useNavigate} from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";


function Newpassword() {
  const location = useLocation();
  const navigate = useNavigate();

  let [showLoading , setLoading] = useState(false);
  let [password, setPassword] = useState("");
  let [confirmpass, setConfirmpass] = useState("");

  
    let showError = (message) => {
      toast.error(message);
    };
  
    let showSuccess = (message) => {
      toast.success(message);
    };

  let newpass = (pass, cpass) => {
    let email = location.state.email;
    setLoading(true);
    if(pass != "" && cpass != "") {
      if (pass == cpass) {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
          email: email,
          password: cpass,
        });

        const requestOptions = {
          method: "POST",
          headers: myHeaders,
          body: raw,
          redirect: "follow",
        };

        fetch("http://localhost:3000/user/newpassword", requestOptions)
          .then((response) => response.text())
          .then((result) =>{
            let data = JSON.parse(result);
            if(data.status == "failed"){
              setLoading(false);
              showError(data.message);
            } else{
              setLoading(false);
              showSuccess(data.message);
              navigate("/login" , {replace : "true" ,})
            }
          })
          .catch((error) => console.error(error));
      } else{
        setLoading(false);
        showError("Fields Not Match");
      }
    } else{
        setLoading(false);
        showError("Fill All Fields");
      
    }
  };
  return (
    <section className="flex justify-center items-center h-[100vh] w-[100%]">
      <div className="center-box rounded-md  w-[30%] h-[fit-content] pb-[15px] pt-[15px]">
        <div className="heading flex justify-center items-center h-[100px] font-bold text-3xl">
          <h2>New Password </h2>
        </div>
        <div className="flex flex-col pr-3 pl-3">
          <input
            type="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            className="h-[42px] indent-2 border-1 border-gray-300 rounded-sm mb-[12px]"
            placeholder="Password"
          />
          <input
            type="password"
            onChange={(e) => {
              setConfirmpass(e.target.value);
            }}
            className="h-[42px] indent-2 border-1 border-gray-300 rounded-sm mb-[12px]"
            placeholder="Confirm Password"
          />
        </div>
        <div className="pr-3 pl-3 pb-3 font-semibold flex justify-end"></div>
        <div className="pr-3 pl-3">
          <button
            onClick={() => newpass(password, confirmpass)}
            className="rounded-lg w-[100%] h-[49px] bg-black"
          >
            <span className="text-white font-bold">Save 
              {
                showLoading ? <span>
              <svg aria-hidden="true" role="status" class="ml-3 inline w-6 h-6 me-0 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB"/>
              <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="black"/>
              </svg>
              </span> : null
              }
            </span>
          </button>
        </div>
      </div>
    </section>
  );
}

export default Newpassword;
