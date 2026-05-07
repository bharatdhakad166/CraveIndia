import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser, auth } from "../firebase/auth";

function LoginPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    setError("");

    if (!email.includes("@")) {
      return setError("Enter valid email");
    }

    if (password.length < 6) {
      return setError("Password must be at least 6 characters");
    }

    try {
      const user = await loginUser(email, password);

      if (!user.emailVerified) {
        await auth.signOut();
        setError("Please verify your email before login");
        return;
      }

      navigate("/ProfilePage");
    } catch {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f5f5f5]">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-[350px] text-center">

        <h2 className="text-xl font-semibold mb-2">Welcome Back</h2>
        <p className="text-sm text-gray-500 mb-6">
          Login to your account
        </p>

        {error && (
          <p className="text-red-500 text-sm mb-3">{error}</p>
        )}

        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 mb-3 border rounded-lg outline-none focus:border-orange-500"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 mb-4 border rounded-lg outline-none focus:border-orange-500"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleLogin}
          className="w-full bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600 transition"
        >
          Login
        </button>

        <p className="text-sm mt-4">
          Don't have an account?{" "}
          <span
            onClick={() => navigate("/SignupPage")}
            className="text-orange-500 cursor-pointer"
          >
            Signup
          </span>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;