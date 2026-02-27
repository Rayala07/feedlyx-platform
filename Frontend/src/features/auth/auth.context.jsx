import { createContext, useState } from "react";
import { register, login } from "./services/auth.api";

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleRegister = async (username, email, password) => {
    setLoading(true);
    try {
      const response = await register(username, email, password);
      setUser(response.user);
      console.log(response.user)
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (identifier, password) => {
    try {
      setLoading(true);
      const isEmail = identifier.includes("@");

      const username = isEmail ? "" : identifier;
      const email = isEmail ? identifier : "";

      const response = await login(username, email, password);

      setUser(response.user);
      console.log(response.user)
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, handleRegister, handleLogin }}
    >
      {children}
    </AuthContext.Provider>
  );
}
