import React, { useEffect, useState } from 'react';
import { getAllPromos, updatePromo, deletePromo } from '../api/promoApi';

interface Promo {
  promoCode: string;
  promo_type: string;
  description: string;
  amount: number;
}

const PromoTable = () => {
  const [promos, setPromos] = useState<Promo[]>([]);
  const [editingCode, setEditingCode] = useState<string | null>(null);
  const [editValues, setEditValues] = useState<Partial<Promo>>({});

  useEffect(() => {
    getAllPromos().then((res) => setPromos(res.data));
  }, []);

  const handleEdit = (promo: Promo) => {
    setEditingCode(promo.promoCode);
    setEditValues({ ...promo });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    if (editingCode) {
      await updatePromo(editingCode, editValues);
      const res = await getAllPromos();
      setPromos(res.data);
      setEditingCode(null);
    }
  };

  const handleDelete = async (code: string) => {
    if (window.confirm('Are you sure you want to delete this promo?')) {
      await deletePromo(code);
      setPromos((prev) => prev.filter((p) => p.promoCode !== code));
    }
  };

  return (
    <table className="promo-table">
      <thead>
        <tr>
          <th>Promo Type</th>
          <th>Description</th>
          <th>Promo Code</th>
          <th>Amount</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {promos.map((promo) => (
          <tr key={promo.promoCode}>
            <td>
              {editingCode === promo.promoCode ? (
                <input name="promo_type" value={editValues.promo_type || ''} onChange={handleInputChange} />
              ) : (
                promo.promo_type
              )}
            </td>
            <td>
              {editingCode === promo.promoCode ? (
                <input name="description" value={editValues.description || ''} onChange={handleInputChange} />
              ) : (
                promo.description
              )}
            </td>
            <td>{promo.promoCode}</td>
            <td>
              {editingCode === promo.promoCode ? (
                <input name="amount" value={editValues.amount || ''} onChange={handleInputChange} />
              ) : (
                promo.amount
              )}
            </td>
            <td>
              {editingCode === promo.promoCode ? (
                <>
                  <button onClick={handleSave}>Save</button>
                  <button onClick={() => setEditingCode(null)}>Cancel</button>
                </>
              ) : (
                <>
                  <button onClick={() => handleEdit(promo)}>Edit</button>
                  <button onClick={() => handleDelete(promo.promoCode)}>Delete</button>
                </>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default PromoTable;
