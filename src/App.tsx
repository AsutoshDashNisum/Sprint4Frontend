import React from 'react';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';
import AppRoutes from './routes/Routes';
import './App.css';

const App = () => {
  return (
    <div className="app-container">
      <Navbar />
      <div style={{ display: 'flex', flex: 1 }}>
        <Sidebar />
        <main className="main-content">
          <AppRoutes />
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default App;
