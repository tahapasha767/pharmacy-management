import React from 'react'

function Adminpage() {
  return (
    <div className='flex'>
        <div className='sm:w-[300px]  h-[100vh] sm:h-[100vh] bg-black taha pt-9'>
            <div className='flex flex-col justify-center items-center '>
            <img className='w-32' src='https://cdn3.emoji.gg/emojis/3997-admin.png' ></img>
            <div className='text-white text-3xl font-bold'>Adminstrator</div>
            </div>
            <div className='flex flex-col text-white justify-center items-center mt-14 gap-8 text-lg'>
                <div className='hover:bg-white w-[300px] flex justify-center hover:text-black cursor-pointer h-10 items-center'>📊 Dashboard</div>
                <div className='hover:bg-white w-[300px] flex justify-center hover:text-black cursor-pointer h-10 items-center'>🙎‍♂️  Add User</div>
                <div className='hover:bg-white w-[300px] flex justify-center hover:text-black cursor-pointer h-10 items-center'>🙋‍♂️ View User</div>
                <div className='hover:bg-white w-[300px] flex justify-center hover:text-black cursor-pointer h-10 items-center'>🆔 Profile</div>
                <div className='hover:bg-white w-[300px] flex justify-center hover:text-black cursor-pointer h-10 items-center'>🔑 Log Out</div>
            </div>
        </div>
        <div></div>
    </div>
  )
}

export default Adminpage