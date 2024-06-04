import { render } from '@testing-library/react';
import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { Link } from 'react-router-dom';


function Entry({ storeid, storename,employee_count,location }) {
  
 
  return (
   <div className='flex justify-between mt-6'>
    <div className='ml-4 '>{storeid}</div>
    <div>{storename}</div>
    <div>{location}</div>
    <div>{employee_count}</div>
    <button className='mr-14 bg-blue-400 w-14 h-8 text-white' ><Link to={'/editstore/'+storeid}>Edit</Link></button>
   </div>
  );
}

function Viewuser() {
  const [realdata, setRealdata] = useState([]); // Use an empty array as initial state
  const [flag,setflag]=useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3000/stores');
        const data = await response.json();
        console.log(data);
        setRealdata(data); // Update state with fetched data
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData(); // Call the function to fetch data on component mount
  }, []); // Empty dependency array to run only once

  return (
    <div className='bg-slate-100'>
      <div className='max-w-max'>
        <div className='w-[1200px] h-48 bg-gradient-to-r from-purple-800 to-blue-500 '>
        </div>
        <div className='w-[1000px] h-[79vh] bg-white flex ml-[40px] relative bottom-20 rounded-xl flex-col hello'>
          <div className='text-xl text-gray-400 font-bold mx-8 mt-4'>View Stores</div>
          <div className='flex items-center justify-between   mt-10 bg-slate-400 h-12 text-white mb-4'>
            <div className='pl-3'>StoreID</div>
            <div>StoreName</div>
            <div>Location</div>
            <div className='pr-10'>Employee No</div>
            <div className='pr-10'>Edit</div>
           
           
          </div>
          {realdata.length > 0 && (
            realdata.map((obj, i) => (
              <Entry
                key={obj.storeid}
                storeid={obj.storeid}
                storename={obj.storename}
                employee_count={obj.employee_count}
                location={obj.location}


                
                
              
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default Viewuser;
