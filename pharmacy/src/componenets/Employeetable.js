import React from 'react'
import { Link, Outlet } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function Employeetable() {
    const {employeeid}=useParams();
    const navigate=useNavigate();
  return (
    <div className='flex '>
        <div className='sm:w-[250px]  h-[100vh] sm:h-[100vh] bg-white taha pt-4 '>
            <div className='flex flex-col justify-center items-center '>
            <img className='w-16' src='https://static.vecteezy.com/system/resources/previews/014/635/888/non_2x/round-flag-of-switzerland-illustration-vector.jpg' ></img>
            <div className='text-red-500 text-xl font-bold'>PMS</div>
            </div>
            <div className='flex flex-col text-black   mt-9 gap-5 text-sm text-gray-500 font-bold'>
             
            <div className='hover:bg-white w-[300px] flex ml-10 hover:text-black cursor-pointer h-10 items-center'><Link to={"/employee/"+employeeid}>🆔Transition</Link></div>
                <div className='hover:bg-white w-[300px] flex ml-10 hover:text-black cursor-pointer h-10 items-center'><Link to="viewmedi">🆔 View Medicine</Link></div>
                <div className='hover:bg-white w-[300px] flex ml-10 hover:text-black cursor-pointer h-10 items-center' onClick={async()=>{
                    const data={employee_id:employeeid};
                   try{

                    const response=await fetch("http://localhost:3000/logout",{
                      method:"POST",
                      headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data),
    
                    });
                    if (!response.ok) {
                      throw new Error('Network response was not ok');
                  }
      
                  const result = await response.json();
    
                  console.log('Success:',result);
                  alert("Logout succesfully");
                  
                  console.log(result.employeeid)
                 
                  navigate("/loginpage");
                  
    
                   }
                   catch (error) {
                    
                    console.error('Error:', error);
                    // Handle the error appropriately, e.g., display an error message
                }
                  

                }}>🔑 Log Out</div>
                
            </div>
        </div>
        <Outlet/>
    
    </div>
  )
}

export default Employeetable