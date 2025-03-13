import { useEffect, useState } from "react";
import { Badge } from "../../ui/badge";
import { Button } from "../../ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../ui/tabs";
import {
  Check,
  ChevronLeft,
  ChevronRight,
  Heart,
  LoaderCircleIcon,
  ShoppingCart,
} from "lucide-react";
import PageNotFound from "../../PageNotFound";
import { useLocation, useNavigate } from "react-router-dom";

const ProductDetail = ({ products }) => {
  const [formData, setFormData] = useState({
    userId: "",
    productId: "",
    quantity: "",
  });
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const id = window.location.pathname.split("/")[2];

  useEffect(() => {
    fetchProduct();
  }, []);
  

  async function fetchProduct() {
    setLoading(true);
    setError(null);
    const data = products.find((item) => item._id === id);
    if (!data) {
      setError("Failed to load product. Please try again later.");
    }
    setProduct(data);
    setLoading(false);
  }

  if (loading) {
    return <ProductsLoading />;
  }

  if (error) {
    return <PageNotFound />;
  }

  const location = useLocation();
  const addToCart = async () => {
    const savedUser = JSON.parse(localStorage.getItem("user"));
    if (!savedUser) {
      alert("Please login.");
      navigate("/login", { state: { from: location } });
      return;
    }

    setFormData((prev) => ({
      ...prev,
      userId: savedUser._id,
    }));
    setFormData((prev) => ({
      ...prev,
      productId: product._id,
    }));
    setFormData((prev) => ({
      ...prev,
      quantity: quantity,
    }));
    

    console.log(formData);

    const response = await fetch("https://backend-1-cek6.onrender.com/api/cart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-key": "Gajraj@0905",
      },
      body: JSON.stringify(formData),
    });
    console.log(response);

    if (!response.ok) {
      alert("Failed to add To cart");
      return;
    }


    alert("added to cart");
  };

  const addToWishlist = () => {
    const savedUser = localStorage.getItem("user");
    if (!savedUser) {
      alert("Please login.");
      navigate("/login", { state: { from: location } });
      return;
    }
    alert("added to Wishlist");
  };

  const createdate = new Date(product.createdAt);
  const updatedate = new Date(product.updatedAt);

  const discountedPrice =
    product.price * (1 - product.discountPercentage / 100);

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === product.image.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? product.image.length - 1 : prevIndex - 1
    );
  };

  const incrementQuantity = () =>
    setQuantity((q) => Math.min(product.stockQuantity, q + 1));
  const decrementQuantity = () => setQuantity((q) => Math.max(1, q - 1));

  return (
    <div className="px-6 py-12 text-left text-black">
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="relative aspect-square overflow-hidden rounded-lg border bg-muted">
              <img
                src={product.image[currentImageIndex] || "/placeholder.svg"}
                alt={product.name}
                fill
                className="object-cover w-full"
                style={{ height: "350px" }}
              />

              {product.image.length > 0 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-2 top-1/2 -translate-y-1/2 h-9 w-9 rounded-full bg-white/80 flex items-center justify-center shadow-sm bg-white hover:bg-gray-400"
                    aria-label="Previous image"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-2 top-1/2 -translate-y-1/2 h-9 w-9 rounded-full bg-white/80 flex items-center justify-center shadow-sm bg-white hover:bg-gray-400"
                    aria-label="Next image"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </>
              )}

              {product.discountPercentage && (
                <div
                  className="absolute top-2 left-2 rounded-full"
                  style={{ backgroundColor: "orangered" }}
                >
                  <Badge className="bg-destructive hover:bg-destructive">
                    {product.discountPercentage}% OFF
                  </Badge>
                </div>
              )}
            </div>

            {/* Thumbnail Images */}
            {product.image.length > 0 && (
              <div className="flex space-x-2 overflow-x-auto pb-2">
                {product.image.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-md border ${
                      index === currentImageIndex ? "ring-2 ring-primary" : ""
                    }`}
                  >
                    <img
                      src={image || "/placeholder.svg"}
                      alt={`${product.name} - Image ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Details */}
          <div className="flex flex-col space-y-6">
            <div>
              {product.brand && (
                <p className="text-sm font-medium text-muted-foreground m-0 text-gray-600">
                  {product.brand}
                </p>
              )}
              <h1 className="text-3xl font-bold tracking-tight text-black m-0">
                {product.name}
              </h1>

              {/* Price Section */}
              <div className="mt-4 flex items-end">
                {discountedPrice ? (
                  <>
                    <p className="text-3xl font-bold text-primary">
                      {`\u20B9`}
                      {discountedPrice}
                    </p>
                    <p className="ml-2 text-lg text-gray-500 text-muted-foreground line-through">
                      {`\u20B9`}
                      {product.price}
                    </p>
                  </>
                ) : (
                  <p className="text-3xl font-bold text-primary">
                    {product.price}
                  </p>
                )}
              </div>

              {/* Stock Status */}
              <div className="mt-2 flex items-center">
                {product.stockQuantity > 0 ? (
                  <div className="flex items-center text-sm text-green-600">
                    <Check className="mr-1 h-4 w-4" />
                    <span>
                      {product.stockQuantity > 10
                        ? "In Stock"
                        : `Only ${product.stockQuantity} left in stock`}
                    </span>
                  </div>
                ) : (
                  <p className="text-sm text-destructive">Out of Stock</p>
                )}
              </div>
            </div>

            {/* Category */}
            {product.categoryName && (
              <div>
                <Badge variant="outline" className="text-xs">
                  {product.categoryName}
                </Badge>
              </div>
            )}

            {/* Description */}
            <div>
              <h2 className="text-lg font-semibold text-black m-0">
                Description
              </h2>
              <p className="mt-2 text-muted-foreground">
                {product.description}
              </p>
            </div>

            {/* Quantity Selector */}
            <div className="flex items-center space-x-4">
              <span className="font-medium">Quantity:</span>
              <div className="flex items-center">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={decrementQuantity}
                  disabled={quantity <= 1}
                >
                  -
                </Button>
                <span className="w-12 text-center">{quantity}</span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={incrementQuantity}
                  disabled={quantity >= product.stockQuantity}
                >
                  +
                </Button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 mt-2 ">
              <Button
                className="flex-1 bg-black text-white hover:bg-gray-700"
                size="lg"
                disabled={product.stockQuantity === 0}
                onClick={addToCart}
              >
                <ShoppingCart className="mr-2 h-5 w-5" />
                Add to Cart
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="hover:bg-red-600 hover:text-white"
                onClick={addToWishlist}
              >
                <Heart className="mr-2 h-5 w-5" />
                Add to Wishlist
              </Button>
            </div>

            {/* Last Updated */}
            <p className="text-xs text-muted-foreground">
              Last updated :{" "}
              {updatedate.toLocaleString("en-GB", {
                dateStyle: "full",
                timeStyle: "full",
              })}
            </p>
          </div>
        </div>

        {/* highlights and Additional Info */}
        <div className="mt-12">
          <Tabs defaultValue="highlights">
            <TabsList className="grid w-full bg-gray-400 grid-cols-2 md:w-auto">
              <TabsTrigger value="highlights" className="profile-tab">
                Specifications
              </TabsTrigger>
              <TabsTrigger value="additional" className="profile-tab">
                Additional Information
              </TabsTrigger>
            </TabsList>
            <TabsContent value="highlights" className="mt-6">
              <div className="rounded-md border">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-6">
                  {Object.entries(product.highlights).map(
                    ([key, value], index) => (
                      <div key={index} className="flex justify-between">
                        <span className="font-medium">{key}:</span>
                        <span className="text-muted-foreground">{value}</span>
                      </div>
                    )
                  )}
                </div>
              </div>
            </TabsContent>
            <TabsContent value="additional" className="mt-6">
              <div className="rounded-md border p-6 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-medium">Product ID</h3>
                    <p className="text-muted-foreground">{product._id}</p>
                  </div>
                  {product.brand && (
                    <div>
                      <h3 className="font-medium">Brand</h3>
                      <p className="text-muted-foreground">{product.brand}</p>
                    </div>
                  )}
                  <div>
                    <h3 className="font-medium">Added On</h3>
                    <p className="text-muted-foreground">
                      {createdate.toLocaleString("en-GB", {
                        dateStyle: "full",
                        timeStyle: "full",
                      })}
                    </p>
                  </div>
                </div>

                <div className="pt-4">
                  <h3 className="font-medium mb-2">Shipping Information</h3>
                  <p className="text-muted-foreground">
                    Free shipping on orders over {`\u20B9`}2000. Standard
                    delivery 3-5 business days in Mandla.
                  </p>
                </div>

                <div className="pt-4">
                  <h3 className="font-medium mb-2">Return Policy</h3>
                  <p className="text-muted-foreground">
                    30-day return policy. Items must be in original condition
                    with tags attached.
                  </p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

function ProductsLoading() {
  return (
    <div className="flex justify-center items-center h-64">
      <LoaderCircleIcon className="h-8 w-8 animate-spin" />
    </div>
  );
}

export default ProductDetail;
