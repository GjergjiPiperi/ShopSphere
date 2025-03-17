import { useEffect, useState } from "react";
import {
  NavLink,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import { CartProvider } from "./CartContext";
import About from "./components/About";
import Home from "./components/Home";
import MyChatBot from "./chatbot/MyChatBot";
import ShoppingCart from "./components/ShoppingCart";

function App() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  // Fetching data with caching
  async function fetchProductsData() {
    try {
      const cachedProducts = localStorage.getItem("cachedProducts");
      if (cachedProducts) {
        setProducts(JSON.parse(cachedProducts)); // ✅ Load from cache
        return;
      }

      const response = await fetch("https://fakestoreapi.com/products");
      if (!response.ok) {
        throw new Error("Product not found.");
      }

      const data = await response.json();
      setProducts(data);
      localStorage.setItem("cachedProducts", JSON.stringify(data)); // ✅ Store in cache
      setError("");
    } catch (err) {
      setError(err.message);
      setProducts([]);
    }
  }

  useEffect(() => {
    fetchProductsData();
  }, []);

  // Filter products based on search term
  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <CartProvider>
      {/* ✅ Pass products to chatbot to avoid multiple API calls */}
      <MyChatBot products={products} />
      <Router>
        <div className="p-4 pt-16">
          {/* Navbar */}
          <nav className="fixed top-0 z-10 flex items-center justify-between w-full p-2 px-6 bg-gray-200 rounded-md shadow-md">
            {/* Left Side - Navigation Links */}
            <div className="flex items-center space-x-4">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `px-4 py-2 font-bold ${
                    isActive ? "bg-blue-500 text-white" : "text-black"
                  } rounded-md`
                }
                end
              >
                Home
              </NavLink>
              <NavLink
                to="/about"
                className={({ isActive }) =>
                  `px-4 py-2 font-bold ${
                    isActive ? "bg-blue-500 text-white" : "text-black"
                  } rounded-md`
                }
              >
                About
              </NavLink>
            </div>

            {/* Right Side - Search Bar + Cart Icon */}
            <div className="flex items-center space-x-4">
              {/* Search Bar */}
              <div className="flex items-center overflow-hidden bg-white rounded-md shadow-sm">
                <input
                  type="text"
                  placeholder="Search Products..."
                  className="px-4 py-2 outline-none"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              {/* Cart Icon */}
              <NavLink to="/cart" className="flex items-center p-2">
                <img
                  src="/images/shoppingcart.png"
                  alt="Cart Icon"
                  className="object-cover w-10 h-10 rounded-full"
                />
              </NavLink>
            </div>
          </nav>
          {/* Error message (if any) */}
          {error && <p className="mt-4 font-bold text-red-500">{error}</p>}
          {/* Routes */}
          <Routes>
            <Route path="/" element={<Home products={filteredProducts} />} />
            <Route path="/about" element={<About />} />
            <Route path="/cart" element={<ShoppingCart />} />
          </Routes>
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
