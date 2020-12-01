import React, { useContext } from "react";
import { FredContext } from "../context/fred";

const Fred = () => {
  const history = useHistory();
  const { fredo, fredo2,fred3 } = useContext(FredContext);

  if (!cart.length) {
    return <h3>Empty Cart</h3>
  }
  return (
    <section className="fred">
      <header>
        <h2>My Cart</h2>
      </header>
    </section>
  );
};

export default Fred;
