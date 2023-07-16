import React, { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [babyId, setBabyId] = useState(null);
  const [recentUserId, setRecentUserId] = useState(null);

  const login = (userData) => {
    const { id, email, name } = userData;
    setUser({ id, email, name });
  };

  const setRecentUserIdHandler = (userId) => {
    setRecentUserId(userId);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        login,
        logout,
        babyId,
        setBabyId,
        recentUserId,
        setRecentUserId: setRecentUserIdHandler,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
