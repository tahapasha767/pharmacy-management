import React from 'react'
import { useRef } from 'react';

function Addstore() {
    const storeid=useRef(null);
    const store_name=useRef(null);
    const location=useRef(null);
  const handleSubmit=async(event)=>{
    event.preventDefault();
    const id=storeid.current.value;
    const name=store_name.current.value;
    const locationbro=location.current.value;
    const data={id,name,locationbro};

  }
  return (
    <div className='flex flex-col'>
           <div className='text-2xl font-extrabold mx-8 mt-4 add'>Add Store</div>
           <div>
            <form onSubmit={
            handleSubmit}>
            <div className='flex gap-20 ml-20 mt-14'>
            <div className='flex flex-col gap-3'>
            <div className='flex flex-col '>
                <label className='text-lg'>StoreID</label>
                <input ref={storeid} className='border border-black  border-solid w-80 h-10 mt-4 rounded-md'></input>
                </div>
                <div className='flex flex-col '>
                <label className='text-lg'>Store Name</label>
                <input ref={store_name} className='border border-black  border-solid w-80 h-10 mt-4 rounded-md'></input>
                </div>
                <div className='flex flex-col '>
                <label className='text-lg'>Location</label>
                <input ref={location} className='border border-black  border-solid w-80 h-10 mt-4 rounded-md'></input>
                <div>
                <button className='w-24 h-10 bg-blue-700 mt-7 rounded-lg text-white'>Submit</button>
                </div>
                </div>
                </div>
                </div>
            </form>
           </div>
    </div>
 
  )
}

export default Addstore