import React from 'react';
import { Provider as AlertProvider } from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';

const options = {
  position: 'bottom center',
  timeout: 10000,
  offset: '30px',
  transition: 'fade',
  type: 'error',
};

export default WrappedComponent => props => (
  <AlertProvider template={AlertTemplate} {...options}>
    <WrappedComponent {...props} />
  </AlertProvider>
);
