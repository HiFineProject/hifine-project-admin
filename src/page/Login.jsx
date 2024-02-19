import { useState } from "react";
// import { Link } from "react-router-dom";
import PageNav from "../components/PageNav";
import styles from "./Login.module.css";
// import BackButton from "../components/BackButton";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    setError(""); // Clear any previous errors
    setSuccess(""); // Clear any previous success messages
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email or password.");
      return; // Stop the function if the email is not valid
    }

    // Password validation
    // Example: Ensure the password is at least 8 characters long
    if (password.length < 8) {
      setError("Password must be at least 8 characters long.");
      return; // Stop the function if the password is too short
    }

    try {
      const response = await axios.post(
        // "https://hifine-project-backend.onrender.com/login",
        "https://testdeployadminbe.onrender.com/adminlogin",
        {
          email,
          password,
        }
      );

      localStorage.setItem("token", response.data.token);
      setSuccess("Login successful!"); // Set success message
      console.log("Login successful!", response.data);

      // Optionally delay navigation to display the success message
      setTimeout(() => {
        navigate("/app");
      }, 1000); // Adjust delay as needed
      clearInput();
    } catch (error) {
      setError("Invalid username or password. Please try again.");
      console.error("Login error:", error);
    }
    // finally {
    //   clearInput();
    // }
  };
  const clearInput = () => {
    setEmail("");
    setPassword("");
  };

  return (
    <main className={styles.login}>
      <PageNav />

      <form className={styles.form}>
        <div className={styles.row}>
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            placeholder="Input your admin email."
          />
        </div>
        <div className={styles.row}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            placeholder="************"
          />
        </div>
        <div className="flex justify-center ">
          {/* Display success message */}
          {success && <p className="text-lg text-green-500">{success}</p>}
          {/* Display error message */}
          {error && <p className="text-lg text-red-500">{error}</p>}
        </div>
        <div>
          <button
            type="button"
            onClick={handleLogin}
            className="bg-emerald-950 bg-emerald-950 w-full text-white hover:bg-green-600 hover:text-stone-800 mt-5"
          >
            Login
          </button>
        </div>
      </form>
    </main>
  );
}

export default Login;
