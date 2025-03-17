import { useCart } from "../CartContext";

function CartAmountToggle({ item }) {
  const { setCartItems } = useCart();

  const setDecrease = () => {
    setCartItems((prevItems) =>
      prevItems.map((cartItem) =>
        cartItem.id === item.id
          ? { ...cartItem, quantity: Math.max(cartItem.quantity - 1, 1) }
          : cartItem
      )
    );
  };

  const setIncrease = () => {
    setCartItems((prevItems) =>
      prevItems.map((cartItem) =>
        cartItem.id === item.id
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      )
    );
  };

  return (
    <div className="flex items-center px-3 py-1 space-x-2 border rounded-md">
      <button
        onClick={setDecrease}
        className="px-2 py-1 bg-gray-300 rounded-md hover:bg-gray-400"
      >
        -
      </button>
      <div className="text-lg font-bold">{item.quantity}</div>
      <button
        onClick={setIncrease}
        className="px-2 py-1 bg-gray-300 rounded-md hover:bg-gray-400"
      >
        +
      </button>
    </div>
  );
}

export default CartAmountToggle;
