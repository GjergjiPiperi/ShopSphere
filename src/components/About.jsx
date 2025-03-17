function About() {
  return (
    <div className="flex items-center justify-center min-h-screen px-6 py-12 bg-gray-100">
      <div className="max-w-3xl p-8 bg-white rounded-lg shadow-lg">
        <h2 className="pb-4 text-3xl font-bold text-gray-900 border-b">
          About ShopSphere
        </h2>

        <p className="mt-4 text-lg leading-relaxed text-gray-700">
          Welcome to{" "}
          <span className="font-semibold text-blue-600">ShopSphere</span>, the
          next-generation online shopping experience. We combine cutting-edge
          e-commerce technology with AI-powered convenience, allowing you to
          browse and purchase products effortlessly.
        </p>

        <h3 className="mt-6 text-2xl font-semibold text-gray-800">
          🚀 Smart AI-Powered Shopping
        </h3>
        <p className="mt-2 text-gray-700">
          Our integrated chatbot assistant provides a seamless, personalized
          shopping experience. Simply chat with our AI, and it will help you
          find the perfect products, compare options, and even place orders for
          you.
        </p>

        <h3 className="mt-6 text-2xl font-semibold text-gray-800">
          🛍️ Fast & Secure Checkout
        </h3>
        <p className="mt-2 text-gray-700">
          With just a few clicks (or a quick chat!), you can securely complete
          your purchases. We prioritize security and ease, making sure your
          transactions are smooth and reliable.
        </p>

        <h3 className="mt-6 text-2xl font-semibold text-gray-800">
          🌟 Why Choose ShopSphere?
        </h3>
        <ul className="mt-2 space-y-2 text-gray-700 list-disc list-inside">
          <li>AI-driven recommendations tailored to your preferences</li>
          <li>24/7 chatbot support for quick shopping assistance</li>
          <li>Secure payment processing and fast delivery</li>
          <li>Beautiful and intuitive shopping experience</li>
        </ul>

        <p className="mt-6 text-lg text-gray-700">
          Whether you are looking for the latest trends, essential products, or
          just an easier way to shop,
          <span className="font-semibold text-blue-600"> ShopSphere</span> has
          you covered. Experience the future of online shopping today! 🛒
        </p>
      </div>
    </div>
  );
}

export default About;
