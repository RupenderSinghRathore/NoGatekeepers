import { createContext, useContext, useMemo, useState } from "react";
import { ADMIN_PASSWORD } from "../config";

const AdminAuthContext = createContext(null);

export const AdminAuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const value = useMemo(
    () => ({
      isAuthenticated,
      login: (password) => {
        const isValid = password === ADMIN_PASSWORD;
        setIsAuthenticated(isValid);
        return isValid;
      },
      logout: () => setIsAuthenticated(false),
    }),
    [isAuthenticated]
  );

  return <AdminAuthContext.Provider value={value}>{children}</AdminAuthContext.Provider>;
};

export const useAdminAuth = () => {
  const context = useContext(AdminAuthContext);

  if (!context) {
    throw new Error("useAdminAuth must be used within AdminAuthProvider");
  }

  return context;
};
