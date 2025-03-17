import { useCart } from "../CartContext";

function CartAmountToggle({ item }) {
  const { setCartItems } = useCart();

  // Function to decrease the item quantity, ensuring it doesn't go below 1
  const setDecrease = () => {
    setCartItems((prevItems) =>
      prevItems.map((cartItem) =>
        cartItem.id === item.id
          ? { ...cartItem, quantity: Math.max(cartItem.quantity - 1, 1) }
          : cartItem
      )
    );
  };

  // Function to increase the item quantity
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
      {/* Decrease quantity button */}
      <button
        onClick={setDecrease}
        className="px-2 py-1 bg-gray-300 rounded-md hover:bg-gray-400"
      >
        -
      </button>

      {/* Display current quantity */}
      <div className="text-lg font-bold">{item.quantity}</div>

      {/* Increase quantity button */}
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
