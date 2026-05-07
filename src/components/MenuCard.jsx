import starImg from "../assets/icons/star.png";
import { useCart } from "../context/CartContext";
import { useToast } from "../context/ToastContext";

const MenuCard = (props) => {
  const { addToCart, changeQty, cartItems } = useCart();
  const cartItem = cartItems.find((i) => i.id === props.id);
  const qty = cartItem ? cartItem.qty : 0;
  const { showToast } = useToast();

  const handleButtonClick = () => {
    addToCart(props);
    showToast("Item added to cart", "success");
  };

  return (
    <div className="border-2 rounded-2xl my-6 mx-5 inline-block w-64">
      <div className="rounded-3xl">
        <img src={props.image} className="rounded-2xl w-[100%] h-48" />
      </div>

      <div className="mx-2 my-8">
        <h1 className="font-bold text-2xl">{props.name}</h1>
        <p className="truncate">{props.description}</p>

        <div className="flex align-middle gap-1">
          <img src={starImg} className="h-4 self-center" />
          <span>{props.rating}</span>
        </div>

        <div className="flex justify-between pr-4">
          <h1 className="text-[#ff5f2e] font-bold text-2xl">₹{props.price}</h1>

          <div className="w-[140px] flex justify-center">
            {qty === 0 ? (
              <button
                onClick={handleButtonClick}
                className="w-full h-9 rounded-lg text-[#ff5f2e] border-2 border-[#ff5f2e] transition-all"
              >
                Add to Cart
              </button>
            ) : (
              <div className="w-full h-9 flex items-center justify-between px-3 border-2 border-[#ff5f2e] rounded-lg">
                <button
                  onClick={() => changeQty(props.id, -1)}
                  className="text-xl font-bold w-6 flex justify-center"
                >
                  -
                </button>

                <span className="font-bold w-6 text-center">{qty}</span>

                <button
                  onClick={() => changeQty(props.id, 1)}
                  className="text-xl font-bold w-6 flex justify-center"
                >
                  +
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuCard;
