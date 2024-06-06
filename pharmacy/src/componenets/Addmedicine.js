import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';

function AddMedicine() {
  const productID = useRef(null);
  const product_name = useRef(null);
  const desc = useRef(null);
  const product_price = useRef(null);
  const stockLevel = useRef(null);
  const storeid = useRef(null);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newMedicine = {
      productID: productID.current.value,
      name: product_name.current.value,
      description: desc.current.value,
      price: product_price.current.value,
      stockLevel: stockLevel.current.value,
      storeid: storeid.current.value,
    };

    try {
      alert("Medicine Added Successfully");
      const response = await fetch('http://localhost:3000/add-stock', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newMedicine),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      setSuccess('Medicine added successfully!');
      setError(null);
      alert("Medicine added successfully!");

      // Reset form
      productID.current.value = '';
      product_name.current.value = '';
      desc.current.value = '';
      product_price.current.value = '';
      stockLevel.current.value = '';
      storeid.current.value = '';
    } catch (err) {
      setError(`Failed to add medicine: ${err.message}`);
      setSuccess(null);
      alert("Could not add medicine");
    }
  };

  return (
    <div className='bg-slate-100'>
      <div className='max-w-max'>
        <img
          src='https://www.bhmpics.com/downloads/pharmacy-Wallpapers/50.cropped-seamless-pattern-pills-capsules-icons-vector-illustration-medicine-colorful-vector-tiling-pharmacy-symbols-objects-45097531.jpg'
          className='w-[1200px] h-48'
          alt='Banner'
        />
      </div>
      <div className='w-[1000px] h-[79vh] bg-white flex ml-[40px] relative bottom-20 rounded-xl hello'>
        <div>
          <div className='text-2xl font-bold text-gray-500 mx-8 mt-8'>Medicine</div>
          <div className='flex justify-between'>
            <div className='text-lg font-bold text-gray-400 mx-8 mt-8'>Add Medicine</div>
            <button className='w-36 h-10 rounded-xl mr-20 mt-4 hover:scale-110 bg-black text-white'><Link to={"/viewmedicine"}>Manage Medicine</Link></button>
          </div>
          <form onSubmit={handleSubmit}>
            <div className='flex flex-col items-center ml-[45px] mt-4'>
              <div>
                <label className='text-gray-400 font-bold'>Product ID</label>
                <input ref={productID} placeholder='Add product_id' className='border border-black border-solid w-[900px] h-10 mt-4 rounded-md' />
              </div>
              <div className='mt-4'>
                <label className='text-gray-400 font-bold'>Product Name</label>
                <input ref={product_name} placeholder='Add Store Name' className='border border-black border-solid w-[900px] h-10 mt-4 rounded-md' />
              </div>
              <div className='mt-4'>
                <label className='text-gray-400 font-bold'>Description</label>
                <input placeholder='Enter Description' ref={desc} className='border border-black border-solid w-[900px] h-10 mt-4 rounded-md' />
              </div>
              <div className='mt-4'>
                <label className='text-gray-400 font-bold'>Product Price</label>
                <input placeholder='Enter product price' ref={product_price} className='border border-black border-solid w-[900px] h-10 mt-4 rounded-md' />
              </div>
              <div className='mt-4'>
                <label className='text-gray-400 font-bold'>Stock Level</label>
                <input placeholder='Enter Stock Level' ref={stockLevel} className='border border-black border-solid w-[900px] h-10 mt-4 rounded-md' />
              </div>
              <div className='mt-4'>
                <label className='text-gray-400 font-bold'>Store ID</label>
                <input placeholder='Enter Store Id' ref={storeid} className='border border-black border-solid w-[900px] h-10 mt-4 rounded-md' />
              </div>
            </div>
            <button type='submit' className='w-20 h-10 text-white rounded-xl bg-green-800 ml-11 mt-8'>Add</button>
          </form>
          {error && <p className='text-red-500'>{error}</p>}
          {success && <p className='text-green-500'>{success}</p>}
        </div>
      </div>
    </div>
  );
}

export default AddMedicine;
