import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Viewmedicine({ prop = false }) {
  const [realdata, setRealdata] = useState([]);
  const [flag, setflag] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3000/products');
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
        <img
          src='https://images.unsplash.com/photo-1585435557343-3b092031a831?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGhhcm1hY3l8ZW58MHx8MHx8fDA%3D'
          className='w-[1200px] h-48'
          alt='Pharmacy'
        />
      </div>
      <div className='w-[1000px] h-[79vh] bg-white flex ml-[40px] relative bottom-20 rounded-xl flex-col hello'>
        <div className='text-2xl text-gray-400 font-bold mx-8 mt-4 py-5'>View Medicines</div>
        <div className='flex justify-between mx-12 mt-8 bg-teal-500 h-16 items-center text-white font-bold mb-7'>
          <div className='w-1/5 text-center'>Product Id</div>
          <div className='w-1/5 text-center'>Product Name</div>
          <div className='w-1/5 text-center'>Quantity</div>
          <div className='w-1/5 text-center'>Price per unit</div>
          {prop && <div className='w-1/5 text-center'>Action</div>}
        </div>
        <div>
          {
            realdata.map((medicine) => (
              <div key={medicine.id} className='flex justify-between mx-12 mb-4 items-center'>
                <div className='w-1/5 text-center'>{medicine.id}</div>
                <div className='w-1/5 text-center'>{medicine.name}</div>
                <div className='w-1/5 text-center'>{medicine.quantity}</div>
                <div className='w-1/5 text-center'>{medicine.price}</div>
                {prop && (
                  <div className='w-1/5 text-center'>
                    <Link to={'/updatestock/' + medicine.id}>
                      <button className='bg-green-600 w-28 text-sm h-8 text-white scale-90 hover:scale-100 rounded-lg'>
                        Update Stock
                      </button>
                    </Link>
                  </div>
                )}
              </div>
            ))
          }
        </div>
      </div>
    </div>
  );
}

export default Viewmedicine;
