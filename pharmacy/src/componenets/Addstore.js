import React from 'react'
import { useRef } from 'react';
import { Link } from 'react-router-dom';

function Addstore() {
    const storeid = useRef(null);
    const store_name = useRef(null);
    const location = useRef(null);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const id = storeid.current.value;
        const name = store_name.current.value;
        const locationbro = location.current.value;
        const managerda=null;
        const employeeid=null;
        const data = { storeID:id,storeName:name, location: locationbro,manager:managerda,employeeID:employeeid};

        try {
            const response = await fetch('http://localhost:3000/add-store', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const result = await response.json();
            console.log('Success:', result);
            // You can add more logic here to handle the response, e.g., display a success message or redirect
        } catch (error) {
            console.error('Error:', error);
            // Handle the error appropriately, e.g., display an error message
        }
    }

    return (
      <div className='bg-slate-100'>
        <div className='max-w-max'>
          <img src='https://img.freepik.com/premium-photo/assorted-pharmaceutical-pills-capsules-scattered-across-bright-blue-background-symbolizing_155027-6397.jpg' className='w-[1200px] h-48'></img>
        </div>
        <div className='w-[1000px] h-[79vh] bg-white flex ml-[40px] relative bottom-20 rounded-xl' >
          <div>
            <div className='text-2xl font-bold text-gray-500 mx-8 mt-8'>Store</div>
            <div className='flex justify-between'>
            <div className='text-lg font-bold text-gray-400 mx-8 mt-8'>Add Store</div>
            <button className='w-36 h-10 rounded-xl mr-20 mt-4 hover:scale-110 bg-black text-white'><Link to="/addemployee">Manage Store</Link></button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className='flex flex-col items-center ml-[45px] mt-4'>
                <div>
                  <label className='text-gray-400 font-bold'>Store ID</label>
                <input ref={storeid} placeholder='Add StoreID' className='border border-black border-solid w-[900px] h-10 mt-4 rounded-md'></input>
                </div>

                <div className='mt-4'>
                  <label className='text-gray-400 font-bold'>Store Name</label>
                <input ref={store_name} placeholder='Add Store Name' className='border border-black border-solid w-[900px] h-10 mt-4 rounded-md'></input>
                </div>

                <div className='mt-4'>
                  <label className='text-gray-400 font-bold' >Location</label>
                <input placeholder='Location' ref={location} className='border border-black border-solid w-[900px] h-10 mt-4 rounded-md'></input>
                </div>
            
           
            </div>
           <button type='submit' className='w-20 h-10 text-white rounded-xl bg-green-800 ml-11 mt-8'>Add</button>
            </form>
            
            
          </div>

        </div>
        {/* <div className='flex flex-col'>
            <div className='text-2xl font-extrabold mx-8 mt-4 add'>Add Store</div>
            <div>
                <form onSubmit={handleSubmit}>
                    <div className='flex gap-20 ml-20 mt-14'>
                        <div className='flex flex-col gap-3'>
                            <div className='flex flex-col '>
                                <label className='text-lg'>StoreID</label>
                                <input ref={storeid} className='border border-black border-solid w-80 h-10 mt-4 rounded-md'></input>
                            </div>
                            <div className='flex flex-col '>
                                <label className='text-lg'>Store Name</label>
                                <input ref={store_name} className='border border-black border-solid w-80 h-10 mt-4 rounded-md'></input>
                            </div>
                            <div className='flex flex-col '>
                                <label className='text-lg'>Location</label>
                                <input ref={location} className='border border-black border-solid w-80 h-10 mt-4 rounded-md'></input>
                                <div>
                                    <button type='submit' className='w-24 h-10 bg-blue-700 mt-7 rounded-lg text-white'>Submit</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div> */}
     {/* /   </div> */}
        </div>
    )
}

export default Addstore;
