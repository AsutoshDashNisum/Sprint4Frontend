import React, { useEffect, useState } from 'react';
import { fetchProducts, deleteProduct, updateProduct } from '../api/productApi';

interface Product {
  productId: number;
  name: string;
  sku: string;
  status: string;
  categoryName: string;
  categoryId: number;
  price: number;
  discount: number;
  discountedPrice: number;
}

const ProductTable = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editValues, setEditValues] = useState<Partial<Product>>({});

  const loadProducts = async () => {
    const res = await fetchProducts();
    setProducts(res.data);
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      await deleteProduct(id);
      setProducts((prev) => prev.filter((p) => p.productId !== id));
    }
  };

  const handleEdit = (product: Product) => {
    setEditingId(product.productId);
    setEditValues({ ...product });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
  if (editingId !== null) {
    const original = products.find((p) => p.productId === editingId);

    if (!original) return;

    const updated = {
      name: editValues.name ?? original.name,
      sku: editValues.sku ?? original.sku,
      categoryId: original.categoryId,
      status: original.status,
      price: Number(editValues.price ?? original.price),
      discount: Number(editValues.discount ?? original.discount)
    };

    await updateProduct(editingId, updated);
    await loadProducts();
    setEditingId(null);
  }
};


  return (
    <table className="product-table">
      <thead>
        <tr>
          <th>Category</th>
          <th>Product</th>
          <th>SKU</th>
          <th>Price (₹)</th>
          <th>Discount (%)</th>
          <th>Discounted Price (₹)</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {products.map((product) => (
          <tr key={product.productId}>
            <td>{product.categoryName}</td>
            <td>
              {editingId === product.productId ? (
                <input
                  name="name"
                  value={editValues.name || ''}
                  onChange={handleInputChange}
                />
              ) : (
                product.name
              )}
            </td>
            <td>{product.sku || '-'}</td>
            <td>
              {editingId === product.productId ? (
                <input
                  name="price"
                  value={editValues.price?.toString() || ''}
                  onChange={handleInputChange}
                />
              ) : (
                product.price
              )}
            </td>
            <td>
              {editingId === product.productId ? (
                <input
                  name="discount"
                  value={editValues.discount?.toString() || ''}
                  onChange={handleInputChange}
                />
              ) : (
                product.discount
              )}
            </td>
            <td>{product.discountedPrice}</td>
            <td>
              {editingId === product.productId ? (
                <>
                  <button onClick={handleSave}>Save</button>
                  <button onClick={() => setEditingId(null)}>Cancel</button>
                </>
              ) : (
                <>
                  <button onClick={() => handleEdit(product)}>Edit</button>
                  <button onClick={() => handleDelete(product.productId)}>Delete</button>
                </>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ProductTable;
