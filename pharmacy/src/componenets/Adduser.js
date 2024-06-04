import React, { useRef } from 'react';
import { Link } from 'react-router-dom';

function Adduser() {
    const employeeIdRef = useRef(null);
    const employeeNameRef = useRef(null);
    const usernameRef = useRef(null);
    const passwordRef = useRef(null);
    const roleRef = useRef(null);
    const storeIdRef = useRef(null);
    const loginTimeRef = useRef(null);
    const logoutTimeRef = useRef(null);

    const handleSubmit = async (event) => {
        event.preventDefault();

        const employeeData = {
            employeeID: employeeIdRef.current.value,
            name: employeeNameRef.current.value,
            username: usernameRef.current.value,
            password: passwordRef.current.value,
            role: roleRef.current.value,
            storeID: storeIdRef.current.value,
            loginTime: loginTimeRef.current.value,
            logoutTime: logoutTimeRef.current.value
        };

        try {
            const response = await fetch('http://localhost:3000/add-employee', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(employeeData)
            });
            if (response.ok) {
                console.log('Employee added successfully');
            } else {
                console.error('Failed to add employee');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }

    return (
        <div className='bg-slate-100'>
            <div className='max-w-max'>
                <img src='https://images.unsplash.com/photo-1585435557343-3b092031a831?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGhhcm1hY3l8ZW58MHx8MHx8fDA%3D' className='w-[1200px] h-48'></img>
            </div>
            <div className='tata w-[1000px] h-[79vh] bg-white flex ml-[40px] relative bottom-20 rounded-xl'>
                <div>
                    <div className='text-2xl font-bold text-gray-500 mx-8 mt-8'>Manage Store</div>
                    <div className='flex justify-between'>
                        <div className='text-lg font-bold text-gray-400 mx-8 mt-8'>Add Employee</div>
                        <button className='w-36 h-10 rounded-xl mr-20 mt-4 hover:scale-110 bg-black text-white'>
                            <Link to="/addstore">Back</Link>
                        </button>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <div className='flex flex-col items-center ml-[45px] mt-4'>
                            <div>
                                <label className='text-gray-400 font-bold'>Employee ID</label>
                                <input ref={employeeIdRef} placeholder='Add Employee Id' className='border border-black border-solid w-[900px] h-10 mt-4 rounded-md'></input>
                            </div>

                            <div className='mt-4'>
                                <label className='text-gray-400 font-bold'>Employee Name</label>
                                <input ref={employeeNameRef} placeholder='Add Employee Name' className='border border-black border-solid w-[900px] h-10 mt-4 rounded-md'></input>
                            </div>

                            <div className='mt-4'>
                                <label className='text-gray-400 font-bold'>Username</label>
                                <input ref={usernameRef} placeholder='Username' className='border border-black border-solid w-[900px] h-10 mt-4 rounded-md'></input>
                            </div>
                            <div className='mt-4'>
                                <label className='text-gray-400 font-bold'>Password</label>
                                <input ref={passwordRef} placeholder='Password' className='border border-black border-solid w-[900px] h-10 mt-4 rounded-md'></input>
                            </div>
                            <div className='mt-4'>
                                <label className='text-gray-400 font-bold'>Enter Role</label>
                                <input ref={roleRef} placeholder='Role' className='border border-black border-solid w-[900px] h-10 mt-4 rounded-md'></input>
                            </div>
                            <div className='mt-4'>
                                <label className='text-gray-400 font-bold'>StoreID</label>
                                <input ref={storeIdRef} placeholder='Enter StoreId' className='border border-black border-solid w-[900px] h-10 mt-4 rounded-md'></input>
                            </div>
                            <div className='mt-4'>
                                <label className='text-gray-400 font-bold'>Login Time</label>
                                <input ref={loginTimeRef} placeholder='Enter Log time' className='border border-black border-solid w-[900px] h-10 mt-4 rounded-md'></input>
                            </div>
                            <div className='mt-4'>
                                <label className='text-gray-400 font-bold'>Logout Time</label>
                                <input ref={logoutTimeRef} placeholder='Enter Log out time' className='border border-black border-solid w-[900px] h-10 mt-4 rounded-md'></input>
                            </div>
                        </div>
                        <button type='submit' className='w-20 h-10 text-white rounded-xl bg-green-800 ml-11 mt-8'>Add</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Adduser;
