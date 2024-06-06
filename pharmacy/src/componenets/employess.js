import React, { useState } from 'react';
import axios from 'axios';
import './pharmacy.css';
import { useParams } from 'react-router-dom';

function PharmacyTransaction({ employeeId }) {
    const {employeeid}=useParams();
    console.log(employeeid);
    const [items, setItems] = useState([{ productId: '', quantity: '', productName: '', price: 0 }]);
    const [error, setError] = useState(null);

    const handleInputChange = async (index, event) => {
        const { name, value } = event.target;
        const list = [...items];
        list[index][name] = value.trim();
        
        if (name === 'productId' && value.trim() !== '') {
            try {
                const response = await axios.get(`http://localhost:3000/products/${value}`);
                const product = response.data;

                list[index]['productName'] = product.name;
                list[index]['price'] = product.price;

                setItems(list);
                setError(null);
            } catch (error) {
                setError('Product not found');
            }
        } else {
            setItems(list);
            setError(null);
        }
    };

    const handleQuantityBlur = async (index) => {
        const { quantity, productId } = items[index];

        if (quantity !== '') {
            try {
                const response = await axios.get(`http://localhost:3000/products/${productId}`);
                const product = response.data;

                if (parseInt(quantity) > parseInt(product.quantity)) {
                    setError('Quantity cannot exceed available stock');
                } else {
                    setError(null);
                }
            } catch (error) {
                setError('Product details not found');
            }
        }
    };

    const handleAddItem = () => {
        setItems([...items, { productId: '', quantity: '', productName: '', price: 0 }]);
    };

    const handleRemoveItem = (index) => {
        const list = [...items];
        list.splice(index, 1);
        setItems(list);
    };

    const handlePrintClick = async () => {
        try {
            await axios.post('http://localhost:3000/sales', {
                employeeid: employeeId,
                items: items.map(item => ({
                    productid: item.productId,
                    quantitysold: item.quantity
                }))
            });
            setItems([{ productId: '', quantity: '', productName: '', price: 0 }]);
            setError(null);
        } catch (error) {
            setError(error.response?.data?.error || 'Failed to record transaction');
        }
    };

    return (
        <div className="transaction-container">
            <div className=' flex justify-between mb-32 text-lg font-bold text-gray-400'>
                <div>Pharmacist</div>
                <div>EmployeeID-{employeeid}</div>
            </div>
            <h1 className="transaction-title">Pharmacy Transaction</h1>
            {error && <p className="error-msg">{error}</p>}
            <form className="transaction-form">
                {items.map((item, index) => (
                    <div key={index} className="form-row">
                        <label className="form-label">
                            Product ID:
                            <input
                                type="text"
                                name="productId"
                                value={item.productId}
                                onChange={(e) => handleInputChange(index, e)}
                                className="form-input"
                            />
                        </label>
                        <label className="form-label">
                            Product Name:
                            <input
                                type="text"
                                name="productName"
                                value={item.productName}
                                disabled
                                className="form-input"
                            />
                        </label>
                        <label className="form-label">
                            Price:
                            <input
                                type="text"
                                name="price"
                                value={item.price}
                                disabled
                                className="form-input"
                            />
                        </label>
                        <label className="form-label">
                            Quantity:
                            <input
                                type="text"
                                name="quantity"
                                value={item.quantity}
                                onBlur={() => handleQuantityBlur(index)}
                                onChange={(e) => handleInputChange(index, e)}
                                className="form-input"
                            />
                        </label>
                        {index !== 0 && (
                            <button type="button" onClick={() => handleRemoveItem(index)} className="remove-btn">
                                <span role="img" aria-label="Remove" className="remove-icon">➖</span>
                            </button>
                        )}
                    </div>
                ))}
                <button type="button" onClick={handleAddItem} className="btn bg-green-700">
                    Add Item
                </button>
                <button type="button" onClick={handlePrintClick} className="btn">
                    Print
                </button>
            </form>
        </div>
    );
}

export default PharmacyTransaction;
