import React, { useRef } from 'react'

function Adduser() {
    const emailid=useRef(null);
    const employee_name=useRef(null);
    const username=useRef(null);
    const password=useRef(null);
    const role=useRef(null);
  return (
    <div className='flex flex-col'>
        <div className='text-2xl font-extrabold mx-8 mt-4 add'>Add Employee</div>
        <div>
            <form className='flex ' onSubmit={(e)=>{e.preventDefault()}}>
                <div className='flex gap-20 ml-20 mt-14'>
                <div className='flex flex-col gap-3'>
                    <div className='flex flex-col '>
                <label className='text-lg'>EmployeeID</label>
                <input ref={emailid} className='border border-black  border-solid w-80 h-10 mt-4 rounded-md'></input>
                </div>
                <div className='flex flex-col'>
                <label className='text-lg'>Name</label>
                <input  ref={employee_name} className='border border-black  border-solid w-80 h-10 mt-4 rounded-md'></input>
                </div>
                <div className='flex flex-col'>
                <label className='text-lg'>Username</label>
                <input ref={username} className='border border-black  border-solid w-80 h-10 mt-4 rounded-md'></input>
                </div>

                <label className='text-lg'>Password</label>
                <input ref={password} className='border border-black  border-solid w-80 h-10 mt-4 rounded-md'></input>

                </div>
                <div className='w-1 rounded-lg h-50vh bg-blue-700'></div>
                <div className='flex flex-col gap-3'>
                <div className='flex flex-col '>
                <label className='text-lg'>Role</label>
                <input ref={role} className='border border-black  border-solid w-80 h-10 mt-4 rounded-md'></input>
</div>

{/* <div className='flex flex-col'>

                <label className='text-lg'>LoginTime</label>
                <input className='border border-black  border-solid w-80 h-10 mt-4 rounded-md'></input>
                </div>
                <div className='flex flex-col'>
                <label className='text-lg'>LogOutTime</label>
                <input className='border border-black  border-solid w-80 h-10 mt-4 rounded-md'></input>
                </div> */}
                <div className='flex justify-between'>
                <button className='ml-0 w-32 h-9 text-white bg-blue-600 rounded-lg mt-11 hover:scale-110' onClick={()=>{
                    console.log(emailid);
                }}>Sign up</button>
                <button className='ml-0 w-32 h-9 text-white bg-blue-600 rounded-lg mt-11 hover:scale-110' onClick={()=>{
                    console.log(emailid);
                }}>Reset</button>
                </div>
                
                </div>
                </div>
               
            </form>
        </div>
    </div>
 
  )
}

export default Adduser