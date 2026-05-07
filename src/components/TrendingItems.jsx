import starImg from "../assets/icons/star.png";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

const TrendingItems = (props) => {
  const { addToCart, changeQty, cartItems } = useCart();
  const cartItem = cartItems.find((i) => i.id === props.id);
  const qty = cartItem ? cartItem.qty : 0;
  const navigate = useNavigate();

  const handleButtonClick = (e) => {
    e.stopPropagation();
    addToCart(props);
  };

  return (
    <div
      onClick={() => navigate(`/product/${props.id}`)}
      className="bg-white rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden cursor-pointer"
    >


      <div className="overflow-hidden">
        <img
          src={props.image}
          alt={props.name}
          className="h-52 w-full object-cover hover:scale-110 transition duration-300"
        />
      </div>


      <div className="p-4">
        <h3 className="text-lg font-semibold">{props.name}</h3>

        <p className="text-gray-500 text-sm mt-1 line-clamp-2">
          {props.description}
        </p>


        <div className="flex justify-between items-center mt-3">
          <span className="font-bold text-[#ea580c]">
            ₹{props.price}
          </span>

          <div className="flex items-center gap-1 text-sm text-yellow-500">
            <img src={starImg} className="h-4" />
            <span>{props.rating}</span>
          </div>
        </div>


        <div className="mt-4 w-[140px]">
          {qty === 0 ? (
            <button
              onClick={handleButtonClick}
              className="w-full h-9 rounded-lg text-[#ff5f2e] border-2 border-[#ff5f2e] hover:bg-[#ff5f2e] hover:text-white transition"
            >
              Add
            </button>
          ) : (
            <div
              onClick={(e) => e.stopPropagation()} 
              className="w-full h-9 flex items-center justify-between px-3 border-2 border-[#ff5f2e] rounded-lg bg-orange-50"
            >
              <button
                onClick={() => changeQty(props.id, -1)}
                className="text-xl font-bold"
              >
                -
              </button>

              <span className="font-bold">{qty}</span>

              <button
                onClick={() => changeQty(props.id, 1)}
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
};

export default TrendingItems;