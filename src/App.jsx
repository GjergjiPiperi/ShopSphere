import { useEffect, useState } from "react";
import {
  NavLink,
  BrowserRouter as Router,
  Routes,
  Route,
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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  async function fetchProductsData() {
    try {
      const cachedProducts = localStorage.getItem("cachedProducts");
      if (cachedProducts) {
        setProducts(JSON.parse(cachedProducts));
        return;
      }

      const response = await fetch("https://fakestoreapi.com/products");
      if (!response.ok) {
        throw new Error("Product not found.");
      }
      const data = await response.json();
      setProducts(data);
      localStorage.setItem("cachedProducts", JSON.stringify(data));
      setError("");
    } catch (err) {
      setError(err.message);
      setProducts([]);
    }
  }

  useEffect(() => {
    fetchProductsData();
  }, []);

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <CartProvider>
      <Router>
        <MyChatBot products={products} />
        <div className="pt-20">
          {/* Navbar */}
          <nav className="fixed top-0 left-0 z-50 w-full bg-gray-200 shadow-md">
            <div className="container flex items-center justify-between p-4 mx-auto">
              {/* Left: Logo */}
              <NavLink to="/" className="text-xl font-bold text-black">
                ShopSphere
              </NavLink>
              {/* Desktop Menu */}
              <div className="items-center hidden space-x-4 md:flex">
                <NavLink
                  to="/"
                  end
                  className={({ isActive }) =>
                    `px-4 py-2 rounded-md font-bold ${
                      isActive ? "bg-blue-500 text-white" : "text-black"
                    }`
                  }
                >
                  Home
                </NavLink>
                <NavLink
                  to="/about"
                  className={({ isActive }) =>
                    `px-4 py-2 rounded-md font-bold ${
                      isActive ? "bg-blue-500 text-white" : "text-black"
                    }`
                  }
                >
                  About
                </NavLink>
                <div className="flex items-center">
                  <input
                    type="text"
                    placeholder="Search Products..."
                    className="px-3 py-2 border rounded-md outline-none"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <NavLink to="/cart" className="p-2">
                  <img
                    src="/images/shoppingcart.png"
                    alt="Cart Icon"
                    className="object-cover w-10 h-10 rounded-full"
                  />
                </NavLink>
              </div>
              {/* Mobile Hamburger */}
              <button
                className="p-2 md:hidden focus:outline-none"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                <span className="text-2xl">☰</span>
              </button>
            </div>
            {/* Mobile Menu */}
            {isMobileMenuOpen && (
              <div className="bg-gray-200 shadow-md md:hidden">
                <div className="container flex flex-col p-4 mx-auto space-y-2">
                  <NavLink
                    to="/"
                    end
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={({ isActive }) =>
                      `px-4 py-2 rounded-md font-bold ${
                        isActive ? "bg-blue-500 text-white" : "text-black"
                      }`
                    }
                  >
                    Home
                  </NavLink>
                  <NavLink
                    to="/about"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={({ isActive }) =>
                      `px-4 py-2 rounded-md font-bold ${
                        isActive ? "bg-blue-500 text-white" : "text-black"
                      }`
                    }
                  >
                    About
                  </NavLink>
                  <div className="flex items-center">
                    <input
                      type="text"
                      placeholder="Search Products..."
                      className="w-full px-3 py-2 border rounded-md outline-none"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <NavLink
                    to="/cart"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-2"
                  >
                    <img
                      src="/images/shoppingcart.png"
                      alt="Cart Icon"
                      className="object-cover w-10 h-10 rounded-full"
                    />
                  </NavLink>
                </div>
              </div>
            )}
          </nav>
          {/* Main Content */}
          <div className="container p-4 mx-auto">
            {error && <p className="mt-4 font-bold text-red-500">{error}</p>}
            <Routes>
              <Route path="/" element={<Home products={filteredProducts} />} />
              <Route path="/about" element={<About />} />
              <Route path="/cart" element={<ShoppingCart />} />
            </Routes>
          </div>
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
