import Image from "next/image";
import { CartContext, CartProduct } from "../_providers/cart";
import { ChevronLeftIcon, ChevronRightIcon, TrashIcon } from "lucide-react";
import { calculateProductTotalPrice, formatCurrency } from "../_helpers/price";
import { Button } from "./ui/button";
import { useContext } from "react";

interface CartItemProps {
  cartProduct: CartProduct;
}

const CartItem = ({ cartProduct }: CartItemProps) => {
  const {
    decreaseProductQuantity,
    increaseProductQuantity,
    removeProductFromCart,
  } = useContext(CartContext);

  const handleDecreaseQuantityClick = () => {
    if (cartProduct.quantity !== 1) {
      decreaseProductQuantity(cartProduct.id);
    }
  };
  const handleIncreaseQuantityClick = () =>
    increaseProductQuantity(cartProduct.id);
  const handleRemoveProductClick = () => removeProductFromCart(cartProduct.id);

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div className="relative h-20 w-20">
          <Image
            src={cartProduct.imageUrl}
            alt={cartProduct.name}
            fill
            className="rounded-lg object-cover"
          />
        </div>

        <div className="flex h-20 flex-col justify-between">
          <div className="space-y-px">
            <h3 className="text-xs">{cartProduct.name}</h3>

            <div className="flex items-baseline gap-1">
              <h4 className="text-sm font-semibold">
                {formatCurrency(
                  calculateProductTotalPrice(cartProduct) *
                    cartProduct.quantity,
                )}
              </h4>
              {cartProduct.discountPercentage > 0 && (
                <span className="text-xs text-muted-foreground line-through">
                  {formatCurrency(
                    Number(cartProduct.price) * cartProduct.quantity,
                  )}
                </span>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button
              size="icon"
              variant="ghost"
              className="h-7 w-7 border border-solid border-muted-foreground"
              onClick={handleDecreaseQuantityClick}
            >
              <ChevronLeftIcon size={16} />
            </Button>
            <span className="w-6 text-center text-sm">
              {cartProduct.quantity}
            </span>
            <Button
              size="icon"
              className="h-7 w-7"
              onClick={handleIncreaseQuantityClick}
            >
              <ChevronRightIcon size={16} />
            </Button>
          </div>
        </div>
      </div>

      <Button
        size="icon"
        variant="ghost"
        className="h-8 w-8 border border-solid border-muted-foreground"
        onClick={handleRemoveProductClick}
      >
        <TrashIcon size={18} />
      </Button>
    </div>
  );
};

export default CartItem;
