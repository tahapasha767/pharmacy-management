import React from 'react'
import Adduser from './Adduser'
import Viewuser from './Viewuser'
import Addstore from './Addstore'
import { Outlet ,Link} from 'react-router-dom'

function Adminpage() {
  return (
    <div className='flex '>
        <div className='sm:w-[250px]  h-[100vh] sm:h-[100vh] bg-white taha pt-4 '>
            <div className='flex flex-col justify-center items-center '>
            <img className='w-16' src='https://static.vecteezy.com/system/resources/previews/014/635/888/non_2x/round-flag-of-switzerland-illustration-vector.jpg' ></img>
            <div className='text-red-500 text-xl font-bold'>PMS</div>
            </div>
            <div className='flex flex-col text-black   mt-9 gap-5 text-sm text-gray-500 font-bold'>
                <div className='hover:bg-white w-[300px] flex ml-10 hover:text-black cursor-pointer h-10 items-center'>📊 Dashboard </div>
                <div className='hover:bg-white w-[300px] flex ml-10 hover:text-black cursor-pointer h-10 items-center'><Link to="/addemployee">🙎‍♂️  Add User</Link></div>
                <div className='hover:bg-white w-[300px] flex ml-10 hover:text-black cursor-pointer h-10 items-center'><Link to="/viewuser">🙋‍♂️ View Stores</Link></div>
                <div className='hover:bg-white w-[300px] flex ml-10 hover:text-black cursor-pointer h-10 items-center'><Link to="/addstore">🆔 Add Store</Link></div>
                <div className='hover:bg-white w-[300px] flex ml-10 hover:text-black cursor-pointer h-10 items-center'><Link to="/addmedicine">🆔 Add Medicine</Link></div>
                <div className='hover:bg-white w-[300px] flex ml-10 hover:text-black cursor-pointer h-10 items-center'><Link to="/addstore">🆔 View Medicine</Link></div>
                <div className='hover:bg-white w-[300px] flex ml-10 hover:text-black cursor-pointer h-10 items-center'><Link></Link>🔑 Log Out</div>
                
            </div>
        </div>
    <Outlet/>
    </div>
  )
}

export default Adminpage