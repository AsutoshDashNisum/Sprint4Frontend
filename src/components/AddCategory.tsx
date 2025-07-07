import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../redux/store';
import { createCategory, fetchCategories } from '../redux/slices/categorySlice';
import './AddCategory.css';

const AddCategory = () => {
  const dispatch: AppDispatch = useDispatch();

  const [categoryName, setCategoryName] = useState('');
  const [description, setDescription] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await dispatch(createCategory({ categoryName, description }));
      await dispatch(fetchCategories());
      setSuccess(true);
      setCategoryName('');
      setDescription('');
    } catch (err) {
      console.error('Failed to create category', err);
    }
  };

  return (
    <div className="add-category-container">
      <h2>Add New Category</h2>
      <form onSubmit={handleSubmit} className="category-form">
        <label>Category Name:</label>
        <input
          type="text"
          value={categoryName}
          onChange={e => setCategoryName(e.target.value)}
          required
        />

        <label>Description:</label>
        <textarea
          value={description}
          onChange={e => setDescription(e.target.value)}
          rows={3}
        ></textarea>

        <button type="submit">Create Category</button>

        {success && <p className="success-msg">Category created successfully!</p>}
      </form>
    </div>
  );
};

export default AddCategory;
