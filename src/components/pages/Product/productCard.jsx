import { ShoppingCart } from "lucide-react";
import { Link } from 'react-router-dom';
import { Button } from '../../ui/button';
import { Badge } from '../../ui/badge';

const ProductCard = ({ product }) => {

  return (
    <div
      key={product.id}
      className="group relative border rounded-lg overflow-hidden flex flex-col h-full bg-card"
    >
      {/* Product Link - covers the entire card */}
      <Link href={`/products/${product.id}`} className="absolute inset-0 z-10">
        <span className="sr-only">View {product.name}</span>
      </Link>

      {/* Product Image */}
      <div className="relative aspect-square overflow-hidden bg-muted" style={{height:"211px"}}>
        <img
          src={product.image || "/placeholder.svg"}
          alt={product.name}
          fill
          className="object-cover transition-transform group-hover:scale-105"
           
        />

        {/* Discount Badge */}
        {product.discount_percentage && (
          <div className="absolute top-2 left-2 z-20">
            <Badge className="bg-destructive hover:bg-destructive">
              {product.discount_percentage}% OFF
            </Badge>
          </div>
        )}

        {/* Stock Badge */}
        {product.stock_quantity <= 5 && product.stock_quantity > 0 && (
          <div className="absolute top-2 right-2 z-20">
            <Badge variant="outline" className="bg-background/80">
              Only {product.stock_quantity} left
            </Badge>
          </div>
        )}

        {product.stock_quantity === 0 && (
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
          {product.category_name && (
            <Badge variant="outline" className="text-xs font-normal">
              {product.category_name}
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
            {/* {discountedPrice ? (
              <>
                <span className="text-lg font-bold">
                  {formatPrice(discountedPrice)}
                </span>
                <span className="text-sm text-muted-foreground line-through">
                  {formatPrice(product.price)}
                </span>
              </>
            ) : (
              <span className="text-lg font-bold">
                {formatPrice(product.price)}
              </span>
            )} */}
          </div>
        </div>

        {/* Add to Cart Button */}
        <div className="mt-4 z-20 relative">
          <Button
            className="w-full"
            disabled={product.stock_quantity === 0}
            onClick={(e) => {
              e.preventDefault();
              // Add to cart logic here
              alert(`Added ${product.name} to cart`);
            }}
          >
            <ShoppingCart className="mr-2 h-4 w-4" />
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
