import React, { useEffect, useState } from "react";
import axios, { AxiosResponse } from "axios";
import { API } from "../../services/AxiosApi";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css";
import caveImage from "./../../assets/cave.jpg";

interface LoginPageProps {
  setUser: React.Dispatch<
    React.SetStateAction<{ name: string; email: string } | null>
  >;
}

export const LoginPage: React.FC<LoginPageProps> = ({ setUser }) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    setEmail("");
    setPassword("");

    localStorage.removeItem("email");
    localStorage.removeItem("password");
    sessionStorage.removeItem("email");
    sessionStorage.removeItem("password");
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await API.get("http://localhost:8000/sanctum/csrf-cookie");
      const response: AxiosResponse<{ name: string; email: string }> =
        await API.post("/login", { email, password });
      setUser(response.data);
    } catch (error) {
      setError("Invalid email or password");
      console.error("Login error:", error);
    }
  };

  const handleRegister = () => {
    navigate("/register");
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit">Login</button>
          {error && <p>{error}</p>}
        </form>
        <button onClick={handleRegister}>Register</button>
      </div>
    </div>
  );
};
