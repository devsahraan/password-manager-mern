import React from "react";

function PostModel({ show, toggle , values , onChange , onSave , loading}) {
  return show ? <section className="addPost backdrop-blur-xs absolute top-[0] z-2 bg-black/50 w-[100%] h-[100%] flex justify-center items-center">
    <div className="box  bg-white w-[400px] h-[fit-content] text-black rounded-md p-4 animate__animated animate__bounceInDown">
        <div className="heading">
            <h2 className="text-3xl font-semibold flex justify-center">
                Add Password
            </h2>
        </div>
        <div className="inputs-modal mt-2 flex flex-col gap-4">
            <input name="username" value={values.username} onChange={onChange} type="text" className="w-[100%] border-gray-400 border-1 h-10 rounded-md indent-2 placeholder:text-[14px]" placeholder="Username" />
            <input name="email" value={values.email} onChange={onChange} type="text" className="w-[100%] border-gray-400 border-1 h-10 rounded-md indent-2 placeholder:text-[14px]" placeholder="Email" />
            <input name="password" value={values.password} onChange={onChange} type="text" className="w-[100%] border-gray-400 border-1 h-10 rounded-md indent-2 placeholder:text-[14px]" placeholder="Password" />
        </div>
        <div className="actions-btn flex justify-end items-center mt-4 gap-4">
                <button onClick={toggle} className="bg-red-600 text-white pt-2 pb-2 pl-4 pr-4 rounded-lg">Close</button>
                <button onClick={onSave} className="bg-blue-600 text-white pt-2 pb-2 pl-8 pr-8 flex items-center rounded-lg">Save  {
                  loading ?  <svg aria-hidden="true" className="w-5 h-5 ml-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="white"/>
        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="black"/>
    </svg> : null
                  }</button>
        </div>
    </div>
  </section> : null;
}

export default PostModel;
