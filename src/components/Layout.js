import React from 'react';
import Navbar from './Routes/Navbar';

const Layout = ({ children }) => {
  return (
    <div className="layout">
      
      {children}
    </div>
  );
};

export default Layout;