    import React, { useState, useEffect } from 'react';
    import { getAllCategories } from '../api/categoryApi';

    import { applyDiscountToCategory } from '../api/productApi';

    interface DiscountModalProps {
    onClose: () => void;
    }

    const DiscountModal: React.FC<DiscountModalProps> = ({ onClose }) => {
    const [categories, setCategories] = useState<any[]>([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [discount, setDiscount] = useState('');

    useEffect(() => {
  getAllCategories().then((res: { data: any[] }) => setCategories(res.data));
}, []);


    const handleSubmit = () => {
        if (!selectedCategory || !discount) return alert('Select category and discount');

        applyDiscountToCategory(Number(selectedCategory), Number(discount))
        .then(() => {
            alert('Discount applied successfully');
            onClose();
            window.location.reload(); // Refresh to fetch updated products
        })
        .catch((err: unknown) => {
    if (err instanceof Error) {
        console.error(err.message);
    } else {
        console.error('An unknown error occurred:', err);
    }
    });
    ;
    };

    return (
        <div className="modal-backdrop">
        <div className="modal">
            <h3>Apply Discount</h3>
            <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
            <option value="">Select Category</option>
            {categories.map((cat) => (
                <option key={cat.categoryId} value={cat.categoryId}>
                {cat.categoryName}
                </option>
            ))}
            </select>
            <input
            type="number"
            placeholder="Discount %"
            value={discount}
            onChange={(e) => setDiscount(e.target.value)}
            />
            <button onClick={handleSubmit}>Apply</button>
            <button onClick={onClose}>Close</button>
        </div>
        </div>
    );
    };

    export default DiscountModal;
