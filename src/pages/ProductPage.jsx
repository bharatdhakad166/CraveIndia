import { useParams, useNavigate } from "react-router-dom";
import menuItems from "../data/menuData";
import { useCart } from "../context/CartContext";

function ProductPage() {
  const { addToCart, changeQty, cartItems } = useCart();
  const { id } = useParams();
  const navigate = useNavigate();

  const product = menuItems.find((item) => item.id === Number(id));

  if (!product) {
    return <h2 className="p-6">Product not found</h2>;
  }

  
  const recommended = menuItems
    .filter((item) => item.type === product.type && item.id !== product.id)
    .slice(0, 4);

  return (
    <div className="p-6 max-w-6xl mx-auto font-['Plus_Jakarta_Sans']">
    
      <button
        onClick={() => navigate(-1)}
        className="mb-6 text-[#ea580c] font-medium"
      >
        ← Back
      </button>


      <div className="flex flex-col md:flex-row gap-10 items-start">
      
        <div className="w-[280px] h-[200px] shrink-0 rounded-xl overflow-hidden shadow border">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </div>


        <div className="flex-1">
          <h1 className="text-3xl font-bold">{product.name}</h1>

          <p className="text-yellow-500 mt-2">⭐ {product.rating}</p>

          <p className="text-2xl text-[#ea580c] font-semibold mt-3">
            ₹{product.price}
          </p>

          <p className="mt-4 text-gray-600 leading-relaxed">
            {product.description}
          </p>

          <div className="mt-6 w-[140px]">
            {(() => {
              const cartItem = cartItems.find((i) => i.id === product.id);
              const qty = cartItem ? cartItem.qty : 0;

              return qty === 0 ? (
                <button
                  onClick={() => addToCart(product)}
                  className="w-full h-9 rounded-lg text-[#ff5f2e] border-2 border-[#ff5f2e] transition-all hover:bg-[#ff5f2e] hover:text-white"
                >
                  Add to Cart
                </button>
              ) : (
                <div className="w-full h-9 flex items-center justify-between px-3 border-2 border-[#ff5f2e] rounded-lg">
                  <button
                    onClick={() => changeQty(product.id, -1)}
                    className="text-xl font-bold w-6 flex justify-center"
                  >
                    −
                  </button>

                  <span className="font-bold w-6 text-center">{qty}</span>

                  <button
                    onClick={() => changeQty(product.id, 1)}
                    className="text-xl font-bold w-6 flex justify-center"
                  >
                    +
                  </button>
                </div>
              );
            })()}
          </div>
        </div>
      </div>
      
      
      <div className="mt-12">
        <h2 className="text-2xl font-semibold mb-6">Recommended Items</h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {recommended.map((item) => (
            <div
              key={item.id}
              onClick={() => navigate(`/product/${item.id}`)}
              className="cursor-pointer bg-white rounded-lg shadow hover:shadow-md transition overflow-hidden"
            >
              <img
                src={item.image}
                alt={item.name}
                className="h-24 w-full object-cover"
              />

              <div className="p-2">
                <h4 className="text-sm font-medium">{item.name}</h4>

                <p className="text-[#ea580c] text-sm">₹{item.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProductPage;
