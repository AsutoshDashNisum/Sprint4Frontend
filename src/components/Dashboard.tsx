import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import ProductTable from './ProductTable';
import PromoTable from './PromoTable';
import DiscountModal from './DiscountModal';
import './Dashboard.css';
import { fetchCategories } from '../redux/slices/categorySlice';
import { AppDispatch } from '../redux/store';
import { createPromo, fetchPromos } from '../redux/slices/promoSlice';

const Dashboard = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [isDiscountModalOpen, setIsDiscountModalOpen] = useState(false);
  const [isPromoModalOpen, setIsPromoModalOpen] = useState(false);

  // Promo form states
  const [promoCode, setPromoCode] = useState('');
  const [promoType, setPromoType] = useState('');
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');

  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchPromos());
  }, [dispatch]);

  const handleOpenDiscountModal = () => setIsDiscountModalOpen(true);
  const handleCloseDiscountModal = () => setIsDiscountModalOpen(false);

  const handleOpenPromoModal = () => setIsPromoModalOpen(true);
  const handleClosePromoModal = () => {
    setIsPromoModalOpen(false);
    resetPromoForm();
  };

  const resetPromoForm = () => {
    setPromoCode('');
    setPromoType('');
    setDescription('');
    setAmount('');
  };

  const handleCreatePromo = async (e: React.FormEvent) => {
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
      handleClosePromoModal();
    } catch (err) {
      console.error('Promo creation failed:', err);
    }
  };

  return (
    <div className="dashboard-container">
      <h2 className="dashboard-heading">Catalog Dashboard</h2>

      <div className="search-box">
        <input type="text" placeholder="Search by Name, SKU, or Category" />
      </div>

      <div className="button-row">
        <button className="action-button" onClick={handleOpenDiscountModal}>
          Add Discount
        </button>
      </div>

      <ProductTable />

      <div className="excel-buttons">
        <button>IMPORT EXCEL</button>
        <button>EXPORT TO EXCEL</button>
      </div>

      <div className="button-row" style={{ marginTop: '30px' }}>
        <button className="action-button" onClick={handleOpenPromoModal}>
          Create Promo Code
        </button>
      </div>

      <PromoTable />

      {/* Discount Modal */}
      {isDiscountModalOpen && (
        <DiscountModal onClose={handleCloseDiscountModal} />
      )}

      {/* Promo Code Modal */}
      {isPromoModalOpen && (
        <div className="promo-modal">
          <div className="promo-modal-content">
            <button className="close-button" onClick={handleClosePromoModal}>X</button>
            <div className="create-promo">
              <h2>Create Promo Code</h2>
              <form onSubmit={handleCreatePromo}>
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
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
