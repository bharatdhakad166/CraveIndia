import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { auth } from "../firebase/auth";
import cartIcon from "../assets/icons/cart.png";

function Navbar() {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        await user.reload();

        setUser(user);
        setIsAuthenticated(user.emailVerified);
      } else {
        setUser(null);
        setIsAuthenticated(false);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="flex justify-between py-3 px-8 bg-[#ffffff] border-b-2 sticky top-0 z-50">
    
      <div className="text-3xl font-bold text-[#ea580c]">
        <Link to="/">CraveIndia</Link>
      </div>

      <div className="flex gap-16 mt-1 text-sm font-medium">
        <Link
          to="/"
          className="text-lg px-3 transition duration-200 hover:text-[#ea580c] hover:border-b-2 hover:border-[#ea580c]"
        >
          Home
        </Link>

        <Link
          to="/MenuPage"
          className="text-lg px-3 transition duration-200 hover:text-[#ea580c] hover:border-b-2 hover:border-[#ea580c]"
        >
          Menu
        </Link>

        <Link
          to="/OrdersPage"
          className="text-lg px-3 transition duration-200 hover:text-[#ea580c] hover:border-b-2 hover:border-[#ea580c]"
        >
          Orders
        </Link>

        {!isAuthenticated && (
          <Link
            to="/LoginPage"
            className="text-lg px-3 transition duration-200 hover:text-[#ea580c] hover:border-b-2 hover:border-[#ea580c]"
          >
            Login
          </Link>
        )}
      </div>


      <div className="flex items-center gap-6">
        <Link to="/CartPage">
          <img src={cartIcon} alt="cart" className="h-6" />
        </Link>

        {isAuthenticated && (
          <Link to="/ProfilePage" className="flex items-center gap-2">
            <span className="bg-orange-500 text-white px-2 py-1 rounded-full text-xs">
              {user?.displayName?.charAt(0).toUpperCase() || "U"}
            </span>
            <span className="text-lg font-medium">
              {user?.displayName || "User"}
            </span>
          </Link>
        )}
      </div>
    </div>
  );
}

export default Navbar;
