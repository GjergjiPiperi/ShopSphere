import BuyCartAmount from "./BuyCartAmount";
import CartAmountToggle from "./CartAmountToggle";
import { useCart } from "../CartContext";

function ShoppingCart() {
  const { cartItems, removeFromCart, clearCart } = useCart();

  return (
    <div className="min-h-screen p-4 bg-gray-100 sm:p-6">
      <div className="max-w-3xl p-4 mx-auto bg-white rounded-lg shadow-lg sm:p-6">
        <h2 className="pb-4 mb-4 text-2xl font-bold text-gray-900 border-b">
          Shopping Cart
        </h2>

        {/* Show message if the cart is empty */}
        {cartItems.length === 0 ? (
          <p className="text-lg text-center text-gray-600">
            Your cart is empty.
          </p>
        ) : (
          <ul className="space-y-4">
            {/* Loop through cart items and display each */}
            {cartItems.map((item) => (
              <li
                key={item.id}
                className="flex flex-col items-center justify-between p-4 border rounded-lg shadow-sm md:flex-row bg-gray-50"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="object-contain w-16 h-16"
                  />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">
                      {item.title}
                    </h3>
                    <p className="font-bold text-blue-600">
                      ${item.price.toFixed(2)}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col items-center gap-4 mt-4 md:flex-row md:mt-0">
                  <CartAmountToggle item={item} />
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="px-3 py-2 text-sm font-semibold text-white transition bg-red-500 rounded-lg hover:bg-red-600"
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}

        {cartItems.length > 0 && (
          <div className="flex flex-col items-center justify-between gap-4 mt-6 md:flex-row">
            <button
              onClick={clearCart}
              className="px-4 py-2 font-semibold text-white transition bg-gray-500 rounded-lg hover:bg-gray-600"
            >
              Clear Cart
            </button>
            <BuyCartAmount cartItems={cartItems} />
          </div>
        )}
      </div>
    </div>
  );
}

export default ShoppingCart;
