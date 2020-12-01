import React from 'react';
import ReactDOM from 'react-dom';

const Car = () => {
  var myvar = false;
  var fred = "";
  const simple = async () => {
    setTimeout(function(){ myvar = true;fred = "hi" }, 3000);
  };
  simple();
    return (
        <section className="car">
            <h2>Wisdom Books {fred}</h2>
            <h3>A room without books is like a <br />body without a soul</h3>
            <Link className="btn" to="/books">View All Books</Link>
        </section>
    )
}

export default Car
