const fetchProducts = async () => {
  try {
    const response = await fetch(
      "https://backend-1-cek6.onrender.com/api/product/?api-key=Gajraj@0905"
    );
    if (!response.ok) {
      throw new Error("Failed to fetch products");
      return null;
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching products:", error);
    return null;
  }
};

module.exports = { fetchProducts };
