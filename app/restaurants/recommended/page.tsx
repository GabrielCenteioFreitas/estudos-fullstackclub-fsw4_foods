import Header from "@/app/_components/header";
import RestaurantItem from "@/app/_components/restaurant-item";
import { authOptions } from "@/app/_lib/auth";
import { db } from "@/app/_lib/prisma";
import { getServerSession } from "next-auth";

const RecommendedRestaurants = async () => {
  const session = await getServerSession(authOptions);
  const restaurants = await db.restaurant.findMany({});
  const userFavoriteRestaurants = await db.userFavoriteRestaurants.findMany({
    where: {
      userId: session?.user?.id,
    },
    include: {
      restaurant: true,
    },
  });

  return (
    <>
      <Header />
      <div className="mt-6 px-5">
        <h2 className="mb-6 text-lg font-semibold">
          Restaurantes Recomendados
        </h2>
        <div className="flex w-full flex-col gap-6">
          {restaurants.map((restaurant) => (
            <RestaurantItem
              key={restaurant.id}
              restaurant={JSON.parse(JSON.stringify(restaurant))}
              className="min-w-full max-w-full"
              userFavoriteRestaurants={userFavoriteRestaurants}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default RecommendedRestaurants;
