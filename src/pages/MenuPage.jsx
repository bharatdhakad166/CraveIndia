import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import menuItems from "../data/menuData";
import { useCart } from "../context/CartContext";

function MenuPage() {
  const { addToCart, changeQty, cartItems } = useCart();
  const navigate = useNavigate();
  const location = useLocation();

  
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  
  const queryParams = new URLSearchParams(location.search);
  const category = queryParams.get("category") || "all";

  
  useEffect(() => {
    setCurrentPage(1);
  }, [category]);

  
  const filteredItems =
    category === "all"
      ? menuItems
      : menuItems.filter((item) => item.type === category);

      
  const categories = ["all", ...new Set(menuItems.map((i) => i.type))];

  
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;

  const paginatedItems = filteredItems.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  return (
    <div className="flex px-6 py-6 font-['Plus_Jakarta_Sans'] bg-[#fafafa]">


      <div className="w-52 mr-8 sticky top-20 h-[80vh] overflow-y-auto no-scrollbar">
        <h2 className="text-xl font-semibold mb-4">Categories</h2>

        <div className="flex flex-col gap-2">
          {categories.map((cat, i) => (
            <button
              key={i}
              onClick={() => navigate(`/MenuPage?category=${cat}`)}
              className={`text-left px-4 py-2 rounded-xl transition-all duration-200 ${
                category === cat
                  ? "bg-[#ea580c] text-white shadow-md scale-[1.03]"
                  : "text-gray-700 hover:bg-orange-100 hover:translate-x-1"
              }`}
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          ))}
        </div>
      </div>


      <div className="flex-1">
        <h1 className="text-3xl font-bold mb-6 capitalize">
          {category === "all" ? "All Items" : category}
        </h1>
        

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {paginatedItems.map((item) => {
            const cartItem = cartItems.find((i) => i.id === item.id);
            const qty = cartItem ? cartItem.qty : 0;

            return (
              <div
                key={item.id}
                onClick={() => navigate(`/product/${item.id}`)}
                className="bg-white rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden cursor-pointer"
              >
              
                <div className="overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-40 w-full object-cover hover:scale-110 transition duration-300"
                  />
                </div>


                <div className="p-4">
                  <h3 className="text-lg font-semibold">{item.name}</h3>

                  <p className="text-gray-500 text-sm mt-1 line-clamp-2">
                    {item.description}
                  </p>

                  <div className="flex justify-between items-center mt-3">
                    <span className="font-bold text-[#ea580c]">
                      ₹{item.price}
                    </span>

                    <span className="text-sm text-yellow-500">
                      ⭐ {item.rating}
                    </span>
                  </div>


                  <div className="mt-4 w-[140px]">
                    {qty === 0 ? (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          addToCart(item);
                        }}
                        className="w-full h-9 rounded-lg text-[#ff5f2e] border-2 border-[#ff5f2e] transition-all hover:bg-[#ff5f2e] hover:text-white"
                      >
                        Add
                      </button>
                    ) : (
                      <div
                        onClick={(e) => e.stopPropagation()}
                        className="w-full h-9 flex items-center justify-between px-3 border-2 border-[#ff5f2e] rounded-lg bg-orange-50"
                      >
                        <button
                          onClick={() => changeQty(item.id, -1)}
                          className="text-xl font-bold"
                        >
                          −
                        </button>

                        <span className="font-bold">{qty}</span>

                        <button
                          onClick={() => changeQty(item.id, 1)}
                          className="text-xl font-bold"
                        >
                          +
                        </button>
                      </div>
                    )}
                  </div>

                </div>
              </div>
            );
          })}
        </div>
        
        
        <div className="flex justify-center items-center gap-4 mt-10">

          <button
            onClick={() => setCurrentPage((p) => p - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 border border-[#ea580c] text-[#ea580c] rounded hover:bg-[#ea580c] hover:text-white transition disabled:opacity-30"
          >
            Prev
          </button>

          <span className="font-semibold">
            Page {currentPage} of {totalPages}
          </span>

          <button
            onClick={() => setCurrentPage((p) => p + 1)}
            disabled={currentPage === totalPages}
            className="px-4 py-2 border border-[#ea580c] text-[#ea580c] rounded hover:bg-[#ea580c] hover:text-white transition disabled:opacity-30"
          >
            Next
          </button>

        </div>

      </div>
    </div>
  );
}

export default MenuPage;