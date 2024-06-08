import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function Editstore() {
    
                                     const [message, setMessage] = useState('');
  const { storeid } = useParams();
  const [realdata, setRealdata] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [flag,setflag]=useState(true);

  useEffect(() => {
    const fetchemployee = async () => {
      try {
        const response = await fetch(`http://localhost:3000/employees/storeid/${storeid}`);
        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.statusText}`);
        }
        const data = await response.json();
        setRealdata(data);
      } catch (err) {
        setError(`Failed to fetch data: ${err.message}`);
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchemployee();
  }, [storeid,flag]);

  return (
    <div className='bg-slate-100'>
      <div className='max-w-max'>
        <img
          src='https://img.freepik.com/premium-photo/assorted-pharmaceutical-pills-capsules-scattered-across-bright-blue-background-symbolizing_155027-6397.jpg'
          className='w-[1200px] h-48'
          alt='Banner'
        />
      </div>
      <div className='w-[1000px] h-[79vh] bg-white flex ml-[40px] relative bottom-20 rounded-xl flex-col'>
        {/* {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className='text-red-500'>{error}</p>
        ) : (
          <ul>
            {realdata.map((employee) => (
              <li key={employee.employeeid}>
                {employee.name} - {employee.position}
              </li>
            ))}
          </ul>
          
        )} */}
        <div className='flex  justify-between'>
        <div className='text-2xl font-bold text-gray-400 mx-8 mt-7'>Store-ID {storeid}  </div>
        <div className='text-2xl font-bold text-gray-400 mt-7 mr-8 '>Count {realdata.length}</div>
        </div>
        <div className='flex justify-evenly text-md font-bold bg-emerald-500 mt-10 text-white h-14 items-center' >

            <div>Employee ID</div>
            <div>Employee Name</div>
            <div>
                Actions
            </div>
        </div>
        <div>
            {
                realdata.map((employee)=>{
                    return(
                        <div className='flex justify-between text-md mt-8 '>
                            <div className='ml-52'>{employee.employeeid}</div>
                            <div>{employee.name}</div>
                            <div className='flex gap-5 mr-28'>
                                <button className='w-16 rounded-lg h-8 bg-red-600 text-white hover:scale-105' onClick={()=>{
                                     const employeeId=employee.employeeid;
                                   
                                     const deleteEmployee = async () => {
                                       
                                   
                                       try {
                                         const response = await fetch(`http://localhost:3000/employees/${employeeId}`, {
                                           method: 'DELETE',
                                           headers: {
                                             'Content-Type': 'application/json'
                                           }
                                         });
                                   
                                         if (response.status === 200) {
                                           setMessage('Employee deleted successfully');
                                           alert("Employee deleted succesfully ")
                                         } else if (response.status === 404) {
                                           setMessage('Employee not found');
                                         } else {
                                           setMessage('Error deleting employee');
                                         }
                                       } catch (error) {
                                         console.error('Error:', error);
                                         setMessage('Error deleting employee');
                                       }
                                     };
                                     deleteEmployee();
                                     setflag(!flag);
                                }}>Delete</button>
                                <button className='w-16 rounded-lg h-8 bg-blue-400 text-white hover:scale-105'>Update</button>
                            </div>
                                
                            </div>
                    )
                })
            }
        </div>
      </div>
    </div>
  );
}

export default Editstore;
