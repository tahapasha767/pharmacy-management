import React from 'react'

function Viewuser() {
  return (
    <div>
        <div className='text-2xl mx-8 mt-4 font-extrabold add '>View User</div>
        <div className=' w-[1000px] flex justify-center mt-10'>
        <div className='w-[900px] h-[80vh] border border-black  '>
            <div className='flex justify-between mt-4'>
            <div className='ml-3'>Id</div>
            <div>Name</div>
            <div>Username</div>
            <div>Login Time</div>
            <div>Logout Time</div>
            <div>Pr</div>
            </div>
            <div className='flex justify-between mt-4'>
            <div className='ml-3'>Id</div>
            <div>Name</div>
            <div>Username</div>
            <div>Login Time</div>
            <div>Logout Time</div>
            <div>Pr</div>
            </div>
        </div>
        </div>
    </div>
  )
}

export default Viewuser