import { useCart } from "../CartContext";

function Home({ products }) {
  const { addToCart } = useCart();

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      {products.length === 0 ? (
        <p className="text-lg text-center text-gray-500">No products found.</p>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {products.map((product) => (
            <div
              key={product.id}
              className="p-4 transition-all duration-300 bg-white shadow-lg rounded-xl hover:shadow-2xl"
            >
              <img
                src={product.image}
                alt={product.title}
                className="object-contain w-full h-48 mb-4"
              />
              <h2 className="text-lg font-semibold text-gray-900 truncate">
                {product.title}
              </h2>
              <p className="mt-1 text-sm text-gray-600">{product.category}</p>
              <p className="mt-2 text-xl font-bold text-blue-600">
                ${product.price.toFixed(2)}
              </p>
              <button
                className="w-full px-4 py-2 mt-4 font-semibold text-white transition duration-300 bg-blue-500 rounded-lg hover:bg-blue-600"
                onClick={() => addToCart(product)}
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;
