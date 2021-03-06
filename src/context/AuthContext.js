import React, { useContext, createContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
      const data = localStorage.getItem("@user_data_hidden");
      return data ? JSON.parse(data): null
  });

  useEffect(() => {
      localStorage.setItem("@user_data_hidden",JSON.stringify(user));
  },[user])

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
