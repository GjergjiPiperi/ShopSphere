import CashOutModal from "./CashOutModal";

function BuyCartAmount({ cartItems }) {
  const subTotal = cartItems.reduce(
    (total, item) => total + item.price * (item.quantity || 1),
    0
  );
  const grandTotal = subTotal;
  console.log(cartItems);
  return (
    <div className="flex justify-start p-4">
      <div className="w-64 p-4 bg-white border rounded-lg shadow-md border-y-gray-300">
        <div className="space-y-2">
          <h4 className="flex justify-between pb-2 text-lg font-semibold border-b">
            Sub Total:
            <span className="font-bold">${subTotal.toFixed(2)}</span>
          </h4>
          <h4 className="flex justify-between text-lg font-semibold">
            Grand Total:
            <span className="font-bold">${grandTotal.toFixed(2)}</span>
          </h4>
        </div>
        <CashOutModal />
      </div>
    </div>
  );
}

export default BuyCartAmount;
