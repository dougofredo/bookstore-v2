import React from 'react';
import ReactDOM from 'react-dom';
import { BookProvider } from "./context/books";
import App from './App';
import './index.css';
import { CartProvider } from './context/cart';
import { FredProvider } from './context/fred';

ReactDOM.render(
  <BookProvider>
    <CartProvider>
      <FredProvider>
      <React.StrictMode>
        <App />
      </React.StrictMode>
      </FredProvider>
    </CartProvider>
  </BookProvider>,
  document.getElementById('root')
);
