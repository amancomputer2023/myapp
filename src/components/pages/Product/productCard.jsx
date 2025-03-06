import { Info, ShoppingCart } from "lucide-react";
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../../ui/button';
import { Badge } from '../../ui/badge';

const ProductCard = ({ product }) => {
  const discountedPrice = product.price - product.price * product.discountPercentage / 100;
  const navigate = useNavigate()

  return (
    <div
      key={product._id}
      className="group relative border rounded-lg overflow-hidden flex flex-col h-full bg-card"
      style={{border:"2px solid black", boxShadow: "2px   initial"}}
    >
      {/* Product Link - covers the entire card */}
      <Link href={`/products/${product._id}`} className="absolute inset-0 z-10">
        <span className="sr-only">View {product.name}</span>
      </Link>

      {/* Product Image */}
      <div className="relative aspect-square overflow-hidden bg-muted" style={{height:"211px"}}>
        <img
          src={product.image[0] || "/placeholder.svg"}
          alt={product.name}
          fill
          className="object-cover transition-transform group-hover:scale-105"
           
        />

        {/* Discount Badge */}
        {product.discountPercentage && (
          <div className="absolute top-2 left-2 z-20 rounded-full" style={{backgroundColor: "springgreen"}}>
            <Badge className="bg-destructive hover:bg-destructive">
              {product.discountPercentage}% OFF
            </Badge>
          </div>
        )}

        {/* Stock Badge */}
        {product.stockQuantity <= 5 && product.stockQuantity > 0 && (
          <div className="absolute top-2 right-2 z-20" >
            <Badge variant="outline" className="bg-background/80" style={{backgroundColor:"tomato", border:"2px solid white"}}>
              Only {product.stockQuantity} left
            </Badge>
          </div>
        )}

        {product.stockQuantity === 0 && (
          <div className="absolute inset-0 bg-background/80 flex items-center justify-center z-20">
            <Badge variant="outline" className="text-lg border-2">
              Out of Stock
            </Badge>
          </div>
        )}
      </div>

      {/* Product Details */}
      <div className="flex-1 p-4 flex flex-col">
        {/* Category & Brand */}
        <div className="flex justify-between items-start mb-1">
          {product.categoryName && (
            <Badge variant="outline" className="text-xs font-normal" style={{backgroundColor: "azure"}}>
              {product.categoryName}
            </Badge>
          )}
          {product.brand && (
            <span className="text-xs text-muted-foreground">
              {product.brand}
            </span>
          )}
        </div>

        {/* Product Name */}
        <h3 className="font-medium text-lg mb-1 line-clamp-2">
          {product.name}
        </h3>

        {/* Product Description */}
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
          {product.description}
        </p>

        {/* Price */}
        <div className="mt-auto">
          <div className="flex items-end gap-2">
            {discountedPrice ? (
              <>
                <span className="text-lg font-bold">
                {`\u20B9`} {discountedPrice}
                </span>
                <span className="text-sm text-muted-foreground line-through">
                {`\u20B9`} {product.price}
                </span>
              </>
            ) : (
              <span className="text-lg font-bold">
                {`\u20B9`} {product.price}
              </span>
            )}
          </div>
        </div>

        {/* Add to Cart Button */}
        <div className="mt-4 z-20 relative">
        <Button
            className="w-full rounded-full btn-primary text-lg mr-10"
            disabled={product.stockQuantity === 0}
            onClick={(e) => {
              navigate(`/product/${product._id}`)
            }}
          >
            <Info className="mr-2 h-4 w-4" />
            Specification
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
