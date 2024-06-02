import React from 'react'
import Adduser from './Adduser'
import Viewuser from './Viewuser'
import Addstore from './Addstore'
import { Outlet ,Link} from 'react-router-dom'

function Adminpage() {
  return (
    <div className='flex '>
        <div className='sm:w-[350px]  h-[100vh] sm:h-[100vh] bg-black taha pt-4 showmedash'>
            <div className='flex flex-col justify-center items-center '>
            <img className='w-16' src='https://cdn3.emoji.gg/emojis/3997-admin.png' ></img>
            <div className='text-white text-xl font-bold'>Adminstrator</div>
            </div>
            <div className='flex flex-col text-white justify-center items-center mt-9 gap-5 text-sm'>
                <div className='hover:bg-white w-[300px] flex justify-center hover:text-black cursor-pointer h-10 items-center'>📊 Dashboard </div>
                <div className='hover:bg-white w-[300px] flex justify-center hover:text-black cursor-pointer h-10 items-center'><Link to="/addemployee">🙎‍♂️  Add User</Link></div>
                <div className='hover:bg-white w-[300px] flex justify-center hover:text-black cursor-pointer h-10 items-center'><Link to="/viewuser">🙋‍♂️ View User</Link></div>
                <div className='hover:bg-white w-[300px] flex justify-center hover:text-black cursor-pointer h-10 items-center'><Link to="/addstore">🆔 Add Store</Link></div>
                <div className='hover:bg-white w-[300px] flex justify-center hover:text-black cursor-pointer h-10 items-center'><Link to="/addstore">🆔 Add Medicine</Link></div>
                <div className='hover:bg-white w-[300px] flex justify-center hover:text-black cursor-pointer h-10 items-center'><Link to="/addstore">🆔 View Medicine</Link></div>
                <div className='hover:bg-white w-[300px] flex justify-center hover:text-black cursor-pointer h-10 items-center'><Link></Link>🔑 Log Out</div>
                
            </div>
        </div>
    <Outlet/>
    </div>
  )
}

export default Adminpage