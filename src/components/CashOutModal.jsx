import { useState } from "react";

function CashOutModal() {
  // State to handle whether the modal is open or closed
  const [modal, setModal] = useState(false);

  // Function to toggle the modal state
  const toggleModal = () => {
    setModal(!modal);
  };

  return (
    <div>
      {/* Button to open the modal */}
      <button
        onClick={toggleModal}
        className="w-full px-4 py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
      >
        Cash Out
      </button>

      {/* Modal that appears when the button is clicked */}
      {modal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="p-6 bg-white rounded-lg shadow-lg w-96 animate-fadeIn">
            <h2 className="mb-4 text-xl font-bold">Cash Out</h2>
            <p className="mb-4 text-gray-700">
              Thank you for purchasing from ShopSphere!
            </p>

            {/* Button to close the modal */}
            <button
              onClick={toggleModal}
              className="px-4 py-2 text-white bg-red-500 rounded-lg hover:bg-red-600"
            >
              CLOSE
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default CashOutModal;
