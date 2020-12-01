import React, { useState, useEffect, useContext } from "react";
import { CartContext } from "../context/cart";
import { FiChevronUp } from "react-icons/fi";
import { FiChevronDown } from "react-icons/fi";
import { useHistory } from "react-router-dom";
import { loadStripe } from '@stripe/stripe-js';

// trying to add old code
import { BookContext } from "../context/books";

const stripePromise = loadStripe('pk_test_51HED8xCBGEmUdJgLHTR4JmKO1jj4cHUHrGSHFiDVzhdFfxscX9fdNyorbnHQB3K1nKYfG6xXiDPHqBVFqrF5NPxe00TgGLKZpk');

const Cart = () => {
  //trying new
  const { cart, total, clearCart,increaseAmount, decreaseAmount } = useContext(CartContext);
  const { checkout } = useContext(BookContext);
  const [orderDetails, setOrderDetails] = useState({ cart, total, address: null, token: null });
  const [error, setError] = useState(null);
  const [busy,setBusy] = useState(0);

  const history = useHistory();
  // const { cart, total, increaseAmount, decreaseAmount } = useContext(CartContext);

  if (!cart.length) {
    return <h3>Empty Cart</h3>
  };


  function handleErrors(response) {
    if (!response.ok) {
        throw Error(response.statusText);
    }
    return response;
}


  // function async handleClick() {
  const handleClick = async (event) => {
    // history.push("/checkout");
    // maybe we could go over loop of cart element
    console.log("my cart",cart[0]);
    var unit_amount0 = cart[0].price*100;
    var quantity0 = cart[0].amount;
    var name0 = "Depict ebook";
    // var myprice = cart[0].price * cart[0].amount * 100;
    // console.log(myprice);
    const stripe = await stripePromise;

    let params = {
      // "b": myprice,
      // "param2": "value2",
      "unit_amount0": unit_amount0,
      "name0":name0,
      "quantity0":quantity0
    };

    let query = Object.keys(params)
                 .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(params[k]))
                 .join('&');

    let url = 'https://5jrya5r8fe.execute-api.eu-west-2.amazonaws.com/prod?' + query;
    console.log(url);
    // let url = 'https://5jrya5r8fe.execute-api.eu-west-2.amazonaws.com/prod';

    fetch(url, {
      // method: 'GET',
      headers: {
      // "Access-Control-Allow-Headers":"Origin, X-Requested-With, Content-Type, Accept, Authorization",
      'Accept': 'application/json',
      // 'Access-Control-Allow-Origin': '*',
      // 'Origin':'http://localhost:3000',
      'Content-Type': 'application/json'
      },
      crossDomain:true,
      // body: JSON.stringify({})
    })
    // .then(handleErrors)
    .then(response => response.json())
    .then(data => {
          console.log(data.session_id);
          // var session_id = JSON.parse(data.body).session_id;
          var session_id = data.session_id;
          console.log(session_id);
          stripe.redirectToCheckout({
            sessionId: session_id
          }).then(function (result) {
            //can we retriev Email
            console.log(result);
              checkout(orderDetails).then((res) => {
                  console.log("stripe done");
                  setOrderDetails({ ...orderDetails, address: "paris" })

                  // clearCart();
             })
          // If `redirectToCheckout` fails due to a browser or network
          // error, display the localized error message to your customer
          // using `result.error.message`.
          });
    })
    .catch(function(error) {
            console.log(error);
        })
  };
//   stripe.redirectToCheckout({
//   // Make the id field from the Checkout Session creation API response
//   // available to this file, so you can provide it as argument here
//   // instead of the {{CHECKOUT_SESSION_ID}} placeholder.
//   sessionId: sessionID
// }).then(function (result) {
//   // If `redirectToCheckout` fails due to a browser or network
//   // error, display the localized error message to your customer
//   // using `result.error.message`.
// });
  return (
    <section className="cart">
      <header>
        <h2>My Cart</h2>
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
            <div className="amount">
              <button onClick={() => increaseAmount(id)}><FiChevronUp /></button>
              <p>{amount}</p>
              <button onClick={() => decreaseAmount(id, amount)}><FiChevronDown /></button>
            </div>
          </article>
        ))}
      </div>
      <div>
        <h3>Total: $ {total}</h3>
      </div>
      <div>
        <button className="btn" onClick={handleClick}>Checkout</button>
      </div>
    </section>
  );
};

export default Cart;
