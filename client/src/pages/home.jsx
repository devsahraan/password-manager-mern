import React from 'react'
import { ToastContainer, toast } from 'react-toastify';

function Home() {

  const notify = () => toast.error("This is an error message!");

  return (
    <>
    
    <div>Home</div>
    <button onClick={notify} className='bg-amber-500 rounded-sm p-2'>Notify</button>
    </>
  )
}

export default Home