import React from 'react';
import { Link, useLocation , useNavigate } from 'react-router-dom';

function DashboardNavbar() {
  const location = useLocation();
  let navigate = useNavigate();

  const hiddenRoutes = ['/' , "/register" , "/verifyotp" , "/login" , "/forgotpassword" , "/newpassword"];

  if (hiddenRoutes.includes(location.pathname)) {
    return null;
  }

  return (
    <nav className="bg-black">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex shrink-0 items-center">
                <span className='text-white font-bold text-xl'>Password Manager</span>
            </div>
            
          </div>
          <div>
            <button onClick={() => navigate("/login", { replace: true })} className='bg-red-500 font-semibold p-2 rounded-lg hover:bg-red-700 text-white ease-linear duration-300'>
                Logout
            </button>
          </div>
        </div>
      </div>

      
    </nav>
  );
}

export default DashboardNavbar;
