import React, { useEffect, useState } from "react";
import { API } from "../../services/AxiosApi";
import { Link, useNavigate } from "react-router-dom";
import "./RegisterPage.css";

interface LoginPageProps {
  setUser: React.Dispatch<
    React.SetStateAction<{ name: string; email: string } | null>
  >;
}

export const RegisterPage: React.FC<LoginPageProps> = ({ setUser }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    setName("");
    setEmail("");
    localStorage.removeItem("email");
    localStorage.removeItem("password");
    sessionStorage.removeItem("email");
    sessionStorage.removeItem("password");
  }, []);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (password !== passwordConfirmation) {
      setError("Passwords do not match");
      return;
    }

    try {
      const { data } = await API.post("/register", {
        name,
        email,
        password,
        password_confirmation: passwordConfirmation,
      });

      setUser(data.user);
      navigate("/");
    } catch (error) {
      setError("Failed to register");
    }
  };

  return (
    <div className="register-container">
      <h2>Register</h2>-{error && <p className="error-message">{error}</p>}
      <form onSubmit={handleRegister}>
        <div>
          <label>Name*</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Email*</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password*</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Confirm Password*</label>
          <input
            type="password"
            value={passwordConfirmation}
            onChange={(e) => setPasswordConfirmation(e.target.value)}
            required
          />
        </div>
        <button type="submit">Register</button>
      </form>
      <p className="LoginLink">
        Already have an account? <Link to="/">Connexion</Link>
      </p>
    </div>
  );
};
