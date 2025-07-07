import React from 'react';
import { Box } from '@mui/material';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        textAlign: 'center',
        py: 2,
        backgroundColor: '#1c2e4a',
        color: 'white',
        fontSize: '14px',
        marginTop: 'auto'
      }}
    >
      © {new Date().getFullYear()} ASCEND Catalog Management System | Powered by Nisum
    </Box>
  );
};

export default Footer;
