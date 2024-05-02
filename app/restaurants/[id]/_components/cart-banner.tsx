"use client";

import { Button } from "@/app/_components/ui/button";
import { formatCurrency } from "@/app/_helpers/price";
import { CartContext } from "@/app/_context/cart";
import { Restaurant } from "@prisma/client";
import { useContext } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/app/_components/ui/sheet";
import Cart from "@/app/_components/cart";

interface CartBannerProps {
  restaurant: Pick<Restaurant, "id">;
}

const CartBanner = ({ restaurant }: CartBannerProps) => {
  const { products, totalPrice, totalQuantity } = useContext(CartContext);

  const restaurantHasProductsOnCart = products.some(
    (product) => product.restaurantId === restaurant.id,
  );

  if (!restaurantHasProductsOnCart) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-20 border-t border-solid border-muted bg-white p-5 pt-3 shadow-md">
      <div className="item-center flex justify-between">
        <div>
          <span className="text-xs text-muted-foreground">
            Total sem entrega
          </span>
          <h3 className="font-semibold">
            {formatCurrency(totalPrice)}
            <span className="text-xs font-normal text-muted-foreground">
              {" "}
              /{totalQuantity > 1 ? `${totalQuantity} itens` : "1 item"}
            </span>
          </h3>
        </div>

        <Sheet>
          <SheetTrigger>
            <Button>Ver sacola</Button>
          </SheetTrigger>
          <SheetContent className="w-[90vw]">
            <SheetHeader>
              <SheetTitle className="text-left">Sacola</SheetTitle>
            </SheetHeader>

            <Cart />
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
};

export default CartBanner;
