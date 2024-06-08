import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Entry({ storeid, storename, employee_count, location }) {
  return (
    <div className='flex justify-between items-center px-4 mt-6'>
      <div className='w-1/6 text-center'>{storeid}</div>
      <div className='w-1/4 text-center'>{storename}</div>
      <div className='w-1/4 text-center'>{location}</div>
      <div className='w-1/6 text-center'>{employee_count}</div>
      <div className='w-1/6 text-center'>
        <button className='bg-blue-400 w-20 h-8 text-white rounded'>
          <Link to={'/editstore/' + storeid}>Edit</Link>
        </button>
      </div>
    </div>
  );
}

function Viewuser() {
  const [realdata, setRealdata] = useState([]);
  const [flag, setflag] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3000/stores');
        const data = await response.json();
        console.log(data);
        setRealdata(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className='bg-slate-100'>
      <div className='max-w-max'>
        <div className='w-[1200px] h-48 bg-gradient-to-r from-purple-800 to-blue-500'></div>
        <div className='w-[1000px] h-[79vh] bg-white flex ml-[40px] relative bottom-20 rounded-xl flex-col hello'>
          <div className='text-2xl text-gray-400 font-bold mx-8 mt-4'>View Stores</div>
          <div className='flex justify-between items-center mt-10 bg-slate-400 h-12 text-white px-4 mb-4'>
            <div className='w-1/6 text-center'>StoreID</div>
            <div className='w-1/4 text-center'>StoreName</div>
            <div className='w-1/4 text-center'>Location</div>
            <div className='w-1/6 text-center'>Employee No</div>
            <div className='w-1/6 text-center'>Edit</div>
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
