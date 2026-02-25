import { createContext, useState } from "react";
import { register, login, getMe } from "./services/auth.api";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  // Seperate state for login
  const [identifier, setIdentifier] = useState("");

  const handleRegister = async (username, email, password) => {
    setLoading(true);
    try {
      const response = await register(username, email, password);
      setUser(response.user);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (identifier, password) => {
    setLoading(true);
    try {
      const isEmail = identifier.includes("@");

      const username = isEmail ? "" : identifier;
      const email = isEmail ? identifier : "";

      const response = await login(username, email, password);

      setUser(response.user);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, handleRegister, handleLogin, setIdentifier }}
    >
      {children}
    </AuthContext.Provider>
  );
}
