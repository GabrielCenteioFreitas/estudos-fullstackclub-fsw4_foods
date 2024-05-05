-- CreateTable
CREATE TABLE "UserFavoriteRestaurants" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserFavoriteRestaurants_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_RestaurantToUserFavoriteRestaurants" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_RestaurantToUserFavoriteRestaurants_AB_unique" ON "_RestaurantToUserFavoriteRestaurants"("A", "B");

-- CreateIndex
CREATE INDEX "_RestaurantToUserFavoriteRestaurants_B_index" ON "_RestaurantToUserFavoriteRestaurants"("B");

-- AddForeignKey
ALTER TABLE "UserFavoriteRestaurants" ADD CONSTRAINT "UserFavoriteRestaurants_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RestaurantToUserFavoriteRestaurants" ADD CONSTRAINT "_RestaurantToUserFavoriteRestaurants_A_fkey" FOREIGN KEY ("A") REFERENCES "Restaurant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RestaurantToUserFavoriteRestaurants" ADD CONSTRAINT "_RestaurantToUserFavoriteRestaurants_B_fkey" FOREIGN KEY ("B") REFERENCES "UserFavoriteRestaurants"("id") ON DELETE CASCADE ON UPDATE CASCADE;
