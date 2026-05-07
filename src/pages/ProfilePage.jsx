import { useEffect, useState } from "react";
import { auth } from "../firebase/auth";
import { useNavigate } from "react-router-dom";

function Profile() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (!user) {
        navigate("/");
        return;
      }

      await user.reload();

      if (!user.emailVerified) {
        await auth.signOut();
        navigate("/LoginPage");
        return;
      }

      setUser(user);
    });

    return () => unsubscribe();
  }, [navigate]);

  const handleLogout = async () => {
    await auth.signOut();
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 flex items-center justify-center rounded-full bg-gray-200 text-gray-700 text-2xl font-semibold">
            {user?.displayName?.charAt(0).toUpperCase() || "U"}
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-800">
              {user?.displayName || "User"}
            </h2>
            <p className="text-sm text-gray-500">{user?.email}</p>
          </div>
        </div>

        <div className="my-6 border-t"></div>

        <div className="space-y-3 text-sm text-gray-700">
          <div className="flex justify-between">
            <span className="text-gray-500">Account Status</span>
            <span className="text-green-600 font-medium">Active</span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-500">Email Verified</span>
            <span className="text-blue-600 font-medium">Yes</span>
          </div>
        </div>
        <div className="mt-6 flex gap-3">
          <button
            onClick={handleLogout}
            className="flex-1 py-2 rounded-lg bg-gray-900 text-white hover:bg-black transition"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default Profile;
