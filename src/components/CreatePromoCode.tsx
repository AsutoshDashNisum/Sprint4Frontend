import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../redux/store';
import { fetchPromos } from '../redux/slices/promoSlice';
import './CreatePromoCode.css';
import { createPromo } from '../redux/slices/promoSlice';


const CreatePromoCode = () => {
  const dispatch: AppDispatch = useDispatch();

  const [promoCode, setPromoCode] = useState('');
  const [promoType, setPromoType] = useState('');
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await dispatch(
        createPromo({
          promoCode,
          promoType,
          description,
          amount: parseFloat(amount)
        })
      );
      await dispatch(fetchPromos());
      setSuccess(true);
      setPromoCode('');
      setPromoType('');
      setDescription('');
      setAmount('');
    } catch (error) {
      console.error('Failed to create promo');
    }
  };

  return (
    <div className="create-promo">
      <h2>Create Promo Code</h2>
      <form onSubmit={handleSubmit}>
        <label>Promo Code:</label>
        <input
          type="text"
          value={promoCode}
          onChange={e => setPromoCode(e.target.value)}
          required
        />

        <label>Promo Type:</label>
        <select
          value={promoType}
          onChange={e => setPromoType(e.target.value)}
          required
        >
          <option value="">Select Type</option>
          <option value="Discount">Discount</option>
          <option value="Flat">Flat</option>
        </select>

        <label>Description:</label>
        <textarea
          value={description}
          onChange={e => setDescription(e.target.value)}
          rows={3}
        ></textarea>

        <label>Amount:</label>
        <input
          type="number"
          value={amount}
          onChange={e => setAmount(e.target.value)}
          required
        />

        <button type="submit">Create Promo</button>

        {success && <p className="success-msg">Promo created successfully!</p>}
      </form>
    </div>
  );
};

export default CreatePromoCode;
