import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import ProductTable from './ProductTable';
import PromoTable from './PromoTable';
import DiscountModal from './DiscountModal';
import './Dashboard.css';
import { fetchCategories } from '../redux/slices/categorySlice';
import { AppDispatch } from '../redux/store';

const Dashboard = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [isDiscountModalOpen, setIsDiscountModalOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleOpenModal = () => setIsDiscountModalOpen(true);
  const handleCloseModal = () => setIsDiscountModalOpen(false);

  return (
    <div className="dashboard-container">
      <h2 className="dashboard-heading">Catalog Dashboard</h2>

      <div className="search-box">
        <input type="text" placeholder="Search by Name, SKU, or Category" />
      </div>

      <div className="button-row">
        <button className="action-button" onClick={handleOpenModal}>
          Add Discount
        </button>
      </div>

      <ProductTable />

      <div className="excel-buttons">
        <button>IMPORT EXCEL</button>
        <button>EXPORT TO EXCEL</button>
      </div>

      <div className="button-row" style={{ marginTop: '30px' }}>
        <button className="action-button">Create Promo Code</button>
      </div>

      <PromoTable />

      {isDiscountModalOpen && (
        <DiscountModal onClose={handleCloseModal} />
      )}
    </div>
  );
};

export default Dashboard;
