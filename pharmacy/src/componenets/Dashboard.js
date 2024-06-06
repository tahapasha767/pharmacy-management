import React from 'react'

function Dashboard() {
  return (
    <div className='bg-gradient-to-r from-purple-800 to-blue-500 w-full h-[80vh] flex-col gap-6 items-center justify-center'>
        <div className='flex justify-between mx-5 mt-5 text-lg text-white'>
            <div>Dashboard</div>
            <div>Administrator</div>
        </div>
        <div className='flex justify-evenly mb-8 mt-32'>
            <div className='w-80 h-20 bg-white'></div>
            <div className='w-80 h-20 bg-white'></div>
            <div className='w-80 h-20 bg-white'></div>

     
        </div>
        <div className='flex justify-evenly'>
            <div className='w-80 h-20 bg-white'></div>
            <div className='w-80 h-20 bg-white'></div>
            <div className='w-80 h-20 bg-white'></div>

     
        </div>
    </div>
  )
}

export default Dashboard