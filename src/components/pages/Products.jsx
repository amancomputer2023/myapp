import React, { useState, useEffect } from "react";
import { Loader2, Search } from "lucide-react";
import { motion } from "framer-motion";
import ProductCard from "./Product/productCard";
import { fetchProducts } from "./Product/fetchproduct";
import { Route, Routes, useLocation } from "react-router-dom";
import ProductDetail from "./Product/ProductDetail";

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("name-asc");
  const location = useLocation();

  useEffect(() => {
    fetch();
  }, []);
  async function fetch() {
    setLoading(true);
    setError(null);
    const data = await fetchProducts();
    if (!data) {
      setError("Failed to load products. Please try again later.");
    }
    setProducts(data);
    setLoading(false);
  }

  if (loading) {
    return <ProductsLoading />;
  }

  if (error) {
    return (
      <div className="text-center text-red-500">
        <p>{error}</p>
        <button
          onClick={fetch}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
        >
          Retry
        </button>
      </div>
    );
  }
  // Filter & Sort Products
  const filteredProducts = products
    .filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === "name-asc") return a.name.localeCompare(b.name);
      if (sortBy === "name-desc") return b.name.localeCompare(a.name);
      if (sortBy === "price-asc") return a.price - b.price;
      if (sortBy === "price-desc") return b.price - a.price;
      return 0;
    });

  return (
    <Routes location={location}>
      <Route path="/" element={<AllProduct filteredProducts={filteredProducts} setSearchTerm={setSearchTerm} setSortBy={setSortBy}searchTerm={searchTerm} sortBy={sortBy}/>} />
      <Route path="/*" element={<ProductDetail products={products}/>} />
    </Routes>
  );
}

function ProductsLoading() {
  return (
    <div className="flex justify-center items-center h-screen">
      <Loader2 className="h-8 w-8 animate-spin" />
    </div>
  );
}

function AllProduct({filteredProducts, setSearchTerm, setSortBy, searchTerm, sortBy}) {
  return (
    <div className="bg-gray-100 min-h-screen">
      <motion.header
        className="bg-blue-600 text-white py-16 px-4"
        id="product-header"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Empowering Your Tech
          </h1>
          <p className="text-xl mb-8">
            Explore our curated selection of sells & services
          </p>
          <div className="flex justify-center">
            <div className="relative w-full max-w-xl">
              <input
                type="text"
                placeholder="Search Product..."
                className="w-full py-3 px-4 pr-12 rounded-full text-white bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
          </div>
        </div>
      </motion.header>

      <main className="w-full mx-auto py-6 px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-semibold text-gray-800">
            Available Products
          </h2>
          <select
            className="border rounded px-4 py-2 text-gray-800"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="name-asc">Sort by Name (A-Z)</option>
            <option value="name-desc">Sort by Name (Z-A)</option>
            <option value="price-asc">Sort by Price (Low to High)</option>
            <option value="price-desc">Sort by Price (High to Low)</option>
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => (
            <ProductCard product={product} />
          ))}
        </div>
      </main>
    </div>
  );
}

export default Products;
