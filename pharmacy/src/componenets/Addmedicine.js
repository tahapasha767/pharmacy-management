import React, { useState } from 'react';

function Addmedicine() {
    const [medicineName, setMedicineName] = useState('');
    const [manufacturer, setManufacturer] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [dosage, setDosage] = useState('');
    const [description, setDescription] = useState('');
    const [costPerUnit, setCostPerUnit] = useState('');
    const [quantity, setQuantity] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Basic form validation
        if (!medicineName || !manufacturer || !expiryDate || !dosage || !costPerUnit || !quantity) {
            setError('Please fill out all required fields.');
            return;
        }

        const medicineDetails = {
            medicineName,
            manufacturer,
            expiryDate,
            dosage,
            description,
            costPerUnit,
            quantity
        };

        console.log('Medicine Details Submitted: ', medicineDetails);

        // Optionally, send the form data to a server
        // const response = await fetch('/api/medicines', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify(medicineDetails)
        // });

        // Handle the response
        // if (response.ok) {
        //     console.log('Medicine details submitted successfully');
        // } else {
        //     console.error('Failed to submit medicine details');
        // }

        // Reset the form
        setMedicineName('');
        setManufacturer('');
        setExpiryDate('');
        setDosage('');
        setDescription('');
        setCostPerUnit('');
        setQuantity('');
        setError('');
    };

    return (
      <div>
        <div className='w-full h-28 taha'></div>
        <form className=" " onSubmit={handleSubmit}>
            <div>
                <label>Medicine Name *</label>
                <input 
                    type="text" 
                    value={medicineName} 
                    onChange={(e) => setMedicineName(e.target.value)} 
                    required 
                />
            </div>
            <div>
                <label>Manufacturer *</label>
                <input 
                    type="text" 
                    value={manufacturer} 
                    onChange={(e) => setManufacturer(e.target.value)} 
                    required 
                />
            </div>
            <div>
                <label>Expiry Date *</label>
                <input 
                    type="date" 
                    value={expiryDate} 
                    onChange={(e) => setExpiryDate(e.target.value)} 
                    required 
                />
            </div>
            <div>
                <label>Dosage *</label>
                <input 
                    type="text" 
                    value={dosage} 
                    onChange={(e) => setDosage(e.target.value)} 
                    required 
                />
            </div>
            <div>
                <label>Cost Per Unit *</label>
                <input 
                    type="number" 
                    value={costPerUnit} 
                    onChange={(e) => setCostPerUnit(e.target.value)} 
                    required 
                />
            </div>
            <div>
                <label>Quantity *</label>
                <input 
                    type="number" 
                    value={quantity} 
                    onChange={(e) => setQuantity(e.target.value)} 
                    required 
                />
            </div>
            <div>
                <label>Description</label>
                <textarea 
                    value={description} 
                    onChange={(e) => setDescription(e.target.value)} 
                ></textarea>
            </div>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <button type="submit">Submit</button>
        </form>
        </div>
    );
}

export default Addmedicine;
