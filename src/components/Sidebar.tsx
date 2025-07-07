import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';

export default function Sidebar() {
  return (
    <div className="sidebar">
      <img
        src="https://www.nisum.com/hs-fs/hubfs/WP3%20-%20Home%20Page/wp3-%20%20business%20agility/Nisum-gif.gif?width=200&height=200&name=Nisum-gif.gif"
        alt="Nisum Logo"
        className="logo"
      />

      <h2>
        CATALOG
        <br />
        MANAGEMENT
      </h2>

      <nav>
        <Link to="/">Catalog Dashboard</Link>
        <Link to="/categories/add">Add Category</Link>
        <Link to="/promotions">Create Promo Code</Link>
      </nav>
    </div>
  );
}
