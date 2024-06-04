import React, { useState, useEffect } from 'react';

function Entry({ storeid, storename, name, employeeid, username }) {
  return (
    <div className='flex justify-between mt-6 ml-7 mr-3'>
      <div className='w-10'>{storeid}</div>
      <div className='w-16'>{storename}</div>
      <div>{name}</div>
      <div>{employeeid}</div>
     
      <div className='flex gap-2'>
        <div className='bg-red-500 text-white w-20 h-7 text-center rounded-lg hover:scale-105'>Delete</div>
        <div  className='bg-blue-400 text-white w-20 h-7 text-center rounded-lg hover:scale-105'>Update</div>
      </div>
    </div>
  );
}

function Viewuser() {
  const [realdata, setRealdata] = useState([]); // Use an empty array as initial state

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3000/employees');
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
        <div className='w-[1000px] h-[79vh] bg-white flex ml-[40px] relative bottom-20 rounded-xl flex-col'>
          <div className='text-xl text-gray-400 font-bold mx-8 mt-4'>View Stores</div>
          <div className='flex items-center justify-between   mt-10 bg-slate-400 h-12 text-white mb-4'>
            <div className='pl-3'>StoreID</div>
            <div>StoreName</div>
            <div>Managed By</div>
            <div className='pr-10'>EmployeeID</div>
           
            <div className='pr-3'>Action</div>
          </div>
          {realdata.length > 0 && (
            realdata.map((obj, i) => (
              <Entry
                key={obj.storeid}
                storeid={obj.storeid}
                storename={obj.storename}
                name={obj.name}
                employeeid={obj.employeeid}
                username={obj.username}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default Viewuser;
