import { db } from "@/app/_lib/prisma";
import { notFound } from "next/navigation";
import RestaurantImage from "./_components/restaurant-image";
import Image from "next/image";
import { StarIcon } from "lucide-react";
import DeliveryInfo from "@/app/_components/delivery-info";
import ProductList from "@/app/_components/product-list";
import CartBanner from "./_components/cart-banner";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/_lib/auth";

interface RestaurantPageProps {
  params: {
    id: string;
  };
}

const RestaurantPage = async ({ params: { id } }: RestaurantPageProps) => {
  const restaurant = await db.restaurant.findUnique({
    where: {
      id,
    },
    include: {
      categories: {
        orderBy: {
          createdAt: "desc",
        },
        include: {
          products: {
            where: {
              restaurantId: id,
            },
            include: {
              restaurant: {
                select: {
                  name: true,
                },
              },
            },
          },
        },
      },
      products: {
        take: 10,
        include: {
          restaurant: {
            select: {
              name: true,
            },
          },
        },
      },
    },
  });

  if (!restaurant) {
    return notFound();
  }

  const session = await getServerSession(authOptions);

  const userFavoriteRestaurants = await db.userFavoriteRestaurants.findMany({
    where: {
      userId: session?.user.id,
    },
  });

  return (
    <>
      <RestaurantImage
        restaurant={JSON.parse(JSON.stringify(restaurant))}
        userFavoriteRestaurants={userFavoriteRestaurants}
      />

      <div className="relative z-10 -mt-6 rounded-t-3xl bg-white py-5">
        <div className="flex items-center justify-between px-5">
          <div className="flex items-center gap-1.5">
            <div className="relative h-8 w-8">
              <Image
                src={restaurant.imageUrl}
                alt={restaurant.name}
                fill
                sizes="100%"
                className="rounded-full object-cover"
              />
            </div>

            <h1 className="text-xl font-semibold">{restaurant.name}</h1>
          </div>

          <div className="flex items-center gap-[3px] rounded-full bg-foreground px-2.5 py-1 text-white">
            <StarIcon size={12} className="fill-yellow-400 text-yellow-400" />
            <span className="text-xs font-semibold">5.0</span>
          </div>
        </div>

        <div className="px-5">
          <DeliveryInfo restaurant={JSON.parse(JSON.stringify(restaurant))} />
        </div>

        <div className="no-scrollbar mt-3 flex gap-4 overflow-x-scroll px-5">
          {restaurant.categories.map((category) => (
            <div
              key={category.id}
              className="min-w-[167px] rounded-lg bg-[#F4F4F5] px-1.5 py-1 text-center"
            >
              <span className="text-xs text-muted-foreground">
                {category.name}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-6 space-y-4">
          <h2 className="px-5 font-semibold">Mais pedidos</h2>

          <ProductList
            products={JSON.parse(JSON.stringify(restaurant.products))}
          />
        </div>

        {restaurant.categories.map((category) => (
          <div key={category.id} className="mt-6 space-y-4">
            <h2 className="px-5 font-semibold">{category.name}</h2>

            <ProductList
              products={JSON.parse(JSON.stringify(category.products))}
            />
          </div>
        ))}
      </div>

      <CartBanner restaurant={JSON.parse(JSON.stringify(restaurant))} />
    </>
  );
};

export default RestaurantPage;
