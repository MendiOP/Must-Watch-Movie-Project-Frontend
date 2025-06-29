import { useState } from "react";
import { FiLogIn } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { authAPI } from "../services/api";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await authAPI.login(username, password);

      // Extract token and username from response
      const { token, username: responseUsername } = response.data;
      console.log("Token and name", token, responseUsername);

      if (!token || !responseUsername) {
        throw new Error("Token or username missing in response");
      }

      login(token, username);
      navigate("/");
    } catch (err) {
      console.error("Login error:", err);
      setError(
        err.response?.data?.message ||
          err.message ||
          "Login failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="bg-gray-800 rounded-xl shadow-lg w-full max-w-md p-6 sm:p-8">
        <div className="text-center mb-8">
          <div className="mx-auto bg-red-600 w-16 h-16 rounded-full flex items-center justify-center mb-4">
            <FiLogIn className="text-white text-2xl" />
          </div>
          <h1 className="text-2xl font-bold text-white">Login to MovieDB</h1>
          <p className="text-gray-400 mt-2">
            Access your watchlist and save movies
          </p>
        </div>

        {error && (
          <div className="bg-red-900/30 border border-red-700 rounded-lg p-3 mb-4 text-center">
            <p className="text-red-400">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-300 mb-1"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full bg-gray-700 border border-gray-600 rounded-lg py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
              placeholder="Enter your username"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-300 mb-1"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full bg-gray-700 border border-gray-600 rounded-lg py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg transition-colors flex justify-center items-center"
          >
            {loading ? (
              <span className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></span>
            ) : (
              "Sign In"
            )}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-400">
            Don't have an account?{" "}
            <Link to="/register" className="text-red-400 hover:text-red-300">
              Register now
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
