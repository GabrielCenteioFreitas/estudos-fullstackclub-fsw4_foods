import { Product } from "@prisma/client";
import { ArrowDownIcon } from "lucide-react";

interface DiscountBadgeProps {
  product: Pick<Product, "discountPercentage">;
}

const DiscountBadge = ({
  product: { discountPercentage },
}: DiscountBadgeProps) => {
  return (
    <div className="flex items-center gap-0.5 rounded-full bg-primary px-2 py-0.5 text-white">
      <ArrowDownIcon size={12} />
      <span className="text-xs font-semibold">{discountPercentage}%</span>
    </div>
  );
};

export default DiscountBadge;
