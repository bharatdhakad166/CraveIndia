import { useState } from "react";
import { registerUser } from "../firebase/auth";
import { useNavigate } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignup = async () => {
    setError("");

    if (username.length < 3) {
      return setError("Username must be at least 3 characters");
    }

    try {
      const user = await registerUser(email, password, username);

      alert("Verification email sent!");

      setTimeout(async () => {
        await user.reload();
        if (!user.emailVerified) {
          await user.delete();
          alert("User deleted (not verified)");
        }
      }, 5 * 60 * 1000);

    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f5f5f5]">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-[350px] text-center">

        <h2 className="text-xl font-semibold mb-2">Create Account</h2>
        <p className="text-sm text-gray-500 mb-6">
          Signup to get started
        </p>

        {error && (
          <p className="text-red-500 text-sm mb-3">{error}</p>
        )}

        <input
          placeholder="Username"
          className="w-full p-2 mb-3 border rounded-lg outline-none focus:border-orange-500"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

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
          onClick={handleSignup}
          className="w-full bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600 transition"
        >
          Signup
        </button>

        <p className="text-sm mt-4">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/LoginPage")}
            className="text-orange-500 cursor-pointer"
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
}

export default Signup;