import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const navigate = useNavigate();

  const defaultUsername = "admin";
  const defaultPassword = localStorage.getItem("password") || "12345";

  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem("isAuthenticated") === "true"
  );

  useEffect(() => {
    localStorage.setItem("isAuthenticated", isAuthenticated);
  }, [isAuthenticated]);

  const login = (username, password, remember) => {
    if (username === defaultUsername && password === defaultPassword) {
      setIsAuthenticated(true);
      if (remember) localStorage.setItem("isAuthenticated", "true");
      navigate("/");
    } else {
      alert("❌ Invalid credentials");
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("isAuthenticated");
    navigate("/login");
  };

  const changePassword = (newPassword) => {
    localStorage.setItem("password", newPassword);
    alert("✅ Password updated successfully!");
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, login, logout, changePassword }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
