import React, { useRef, useState } from 'react';
import { useParams } from 'react-router-dom';

function Updatestock() {
    const { productid } = useParams();
    const new_stock_value = useRef(null);
    const [updateSuccessful, setUpdateSuccessful] = useState(false);

    const handleUpdateStock = async (event) => {
        event.preventDefault();

        const stockValue = new_stock_value.current.value;

        if (!stockValue) {
            alert('Please enter a new stock value');
            return;
        }

        try {
            const response = await fetch(`http://localhost:3000/update_stock/${productid}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ new_stock_value: stockValue }),
            });

            const result = await response.json();

            if (response.ok) {
                alert('Stock updated successfully');
                setUpdateSuccessful(true);
            } else {
                alert(`Error: ${result.error}`);
            }
        } catch (error) {
            console.error('Error updating stock:', error);
            alert('An error occurred while updating the stock');
        }
    };

    const handleAlert = () => {
        
        setUpdateSuccessful(false); // Reset the success state
    };

    return (
        <div className='bg-slate-100'>
            <div className='max-w-max'>
                <img src='https://previews.123rf.com/images/neirfy/neirfy1908/neirfy190800352/129227476-colorful-pills-with-glass-of-clear-water-over-blue-background-top-view-frame-medical-pharmacy.jpg' className='w-[1200px] h-48' alt='Banner' />
            </div>
            <div className='w-[1000px] h-[30vh] bg-white flex ml-[40px] relative bottom-20 rounded-xl flex-col'>
                <div className='text-2xl text-gray-400 mt-8 mx-4 font-bold'>Update stock Product-{productid}</div>
                <form onSubmit={handleUpdateStock}>
                    <input ref={new_stock_value} placeholder='Add Stock Value' className='border border-black border-solid w-[600px] h-10 mt-10 rounded-md ml-8' />
                    <button className='w-32 h-10 bg-green-500 ml-4 rounded-lg hover:scale-105 text-white' type='submit' >Update</button>
                </form>
                {false && (
                    <button className='w-32 h-10 bg-green-500 ml-8 mt-4 rounded-lg text-white' onClick={handleAlert}>Show Alert</button>
                )}
            </div>
        </div>
    );
}

export default Updatestock;
