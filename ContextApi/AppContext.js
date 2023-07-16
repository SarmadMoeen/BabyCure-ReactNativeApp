import React, { createContext, useState } from 'react';

const AppContext = createContext();

const AppProvider = ({ children }) => {
    const [userData, setUserData] = useState(null);
  
    // Define other shared state variables and functions here
  
    return (
      <AppContext.Provider value={{ userData, setUserData }}>
        {children}
      </AppContext.Provider>
    );
  };

  export { AppProvider, AppContext };
