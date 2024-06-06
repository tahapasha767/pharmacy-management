import React, { useEffect,useState } from 'react'
import { Link } from 'react-router-dom';

function Viewmedicine(props) {
    console.log(props);
    const [realdata, setRealdata] = useState([]); // Use an empty array as initial state
  const [flag,setflag]=useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3000/products');
        const data = await response.json();
        console.log(data);
        setRealdata(data); // Update state with fetched data
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData(); // Call the function to fetch data on component mount
  }, []); 
  return (
    <div className='bg-slate-100'>
       <div className='max-w-max'>
                <img src='https://images.unsplash.com/photo-1585435557343-3b092031a831?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGhhcm1hY3l8ZW58MHx8MHx8fDA%3D' className='w-[1200px] h-48'></img>
            </div> 
            <div className='w-[1000px] h-[79vh] bg-white flex ml-[40px] relative bottom-20 rounded-xl flex-col tata' >
                <div className='text-2xl text-gray-400 font-bold mx-8 mt-4 py-5'>View Medicines</div>
                <div className='flex justify-between mx-12 mt-8 text bg-teal-500 h-16 items-center text-white font-bold mb-7'>
                    <div>Product Id</div>
                    <div>Product Name</div>
                    <div>Quantity</div>
                    <div>Price per unit</div>
                   {props.prop&&<div className='mr-12'>Action</div>}
                </div>
                <div>
                {
                    realdata.map((medicine)=>{
                        return(
                            <div className='flex justify-between mx-16 mb-7'>
                                <div>{medicine.id}</div>
                                <div>{medicine.name}</div>
                                <div>{medicine.quantity}</div>
                                <div>{medicine.price}</div>
                               {props.prop&&<button className='bg-green-600 w-28 text-sm h-8 text-white scale-90 hover:scale-100 rounded-lg'><Link to={'/updatestock/'+medicine.id}>Update Stock</Link></button>}
                            </div>
                        )

                    })
                }
                </div>
                </div>
        </div>
  
  )
}

export default Viewmedicine