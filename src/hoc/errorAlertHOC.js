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

/**
 * The errorAlertHOC is a High-Order Component (HOC) responsible for receiving a component, in
 * this case the main application container, and wrapping it inside the "react-alert" dependency.
 * This make the wrapped component able to send alert messages.
 */
export default WrappedComponent => props => (
  <AlertProvider template={AlertTemplate} {...options}>
    <WrappedComponent {...props} />
  </AlertProvider>
);
