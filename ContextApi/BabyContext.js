/*import React, { createContext, useState } from 'react';

const BabyContext = createContext();

const BabyContextProvider = ({ children }) => {
    // Define the state variable to hold the baby ID
    const [babyID, setBabyID] = useState(null);
  
    // Create functions to update the baby ID
    const setBabyIDValue = (id) => {
      setBabyID(id);
    };
  
    // Define the context value object
    const contextValue = {
      babyID,
      setBabyID: setBabyIDValue,
    };
  
    // Render the children components with the context value
    return (
      <BabyContext.Provider value={contextValue}>
        {children}
      </BabyContext.Provider>
    );
  };

  export { BabyContext, BabyContextProvider };*/

