import React, { useState, useEffect } from 'react';
import { getAllCategories } from '../api/categoryApi';
import { applyDiscountToCategory } from '../api/productApi';

interface DiscountModalProps {
  onClose: () => void;
  onSuccess: () => void;
}

const DiscountModal: React.FC<DiscountModalProps> = ({ onClose, onSuccess }) => {
  const [categories, setCategories] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [discount, setDiscount] = useState('');

  useEffect(() => {
    getAllCategories().then((res) => setCategories(res.data));
  }, []);

  const handleSubmit = async () => {
    if (!selectedCategory || !discount) return alert('Please select category and enter discount');
    try {
      await applyDiscountToCategory(Number(selectedCategory), Number(discount));
      onSuccess();
    } catch (err) {
      console.error('Error applying discount:', err);
    }
  };

  return (
    <div className="promo-modal">
      <div className="promo-modal-content">
        <button className="close-button" onClick={onClose}>X</button>
        <div className="create-promo">
          <h2>Apply Category Discount</h2>
          <label>Category:</label>
          <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)} required>
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat.categoryId} value={cat.categoryId}>
                {cat.categoryName}
              </option>
            ))}
          </select>

          <label>Discount (%):</label>
          <input
            type="number"
            value={discount}
            onChange={(e) => setDiscount(e.target.value)}
            required
          />

          <button onClick={handleSubmit}>Apply Discount</button>
        </div>
      </div>
    </div>
  );
};

export default DiscountModal;
