import React, { useState, useEffect } from "react";

const FredContext = React.createContext();

const FredProvider = ({ children }) => {
  const [fredo, setFredo] = useState(1);
  const [fredo2, setFredo2] = useState(0);
  const fred3 = 3;

  return (
    <FredContext.Provider
      value={{ fredo,fredo2,fred3 }}
    >
      {children}
    </FredContext.Provider>
  );
};

export { FredContext, FredProvider };
