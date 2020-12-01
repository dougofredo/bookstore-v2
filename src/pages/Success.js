import React, { useState, useEffect, useContext } from "react";
import { CartContext } from "../context/cart";
import { useHistory } from "react-router-dom";
// trying to add old code
import { BookContext } from "../context/books";

const Success = () => {
  //trying new
  const { cart, total, clearCart,increaseAmount, decreaseAmount } = useContext(CartContext);
  const [orderDetails, setOrderDetails] = useState({ cart, total, address: null, token: null });
  const [error, setError] = useState(null);
  const [busy,setBusy] = useState(0);

  const history = useHistory();

  if (!cart.length) {
    return <h3>Empty Cart</h3>
  };

  const handleClick = async (event) => {
    };

  function handleErrors(response) {
    if (!response.ok) {
        throw Error(response.statusText);
    }
    return response;
}
  return (
    <section className="success">
      <header>
        <h2>Congrats!</h2>
      </header>
      <div className="cart-wrapper">
        {cart.map(({ id, title, price, image, amount }) => (
          <article key={id} className="cart-item">
            <div className="image">
              <img src={image} alt="cart item" />
            </div>
            <div className="details">
              <p>{title}</p>
              <p>$ {price}</p>
            </div>
          </article>
        ))}
      </div>
      <div>
        <h3>Total: $ {total}</h3>
      </div>
      <div>
        <button className="btn" onClick={handleClick}>Download</button>
      </div>
    </section>
  );
};

export default Success;
