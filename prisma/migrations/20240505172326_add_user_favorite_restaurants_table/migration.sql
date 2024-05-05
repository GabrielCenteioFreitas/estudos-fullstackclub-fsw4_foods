/*
  Warnings:

  - You are about to drop the `_RestaurantToUserFavoriteRestaurants` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `restaurantId` to the `UserFavoriteRestaurants` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_RestaurantToUserFavoriteRestaurants" DROP CONSTRAINT "_RestaurantToUserFavoriteRestaurants_A_fkey";

-- DropForeignKey
ALTER TABLE "_RestaurantToUserFavoriteRestaurants" DROP CONSTRAINT "_RestaurantToUserFavoriteRestaurants_B_fkey";

-- AlterTable
ALTER TABLE "UserFavoriteRestaurants" ADD COLUMN     "restaurantId" TEXT NOT NULL;

-- DropTable
DROP TABLE "_RestaurantToUserFavoriteRestaurants";

-- AddForeignKey
ALTER TABLE "UserFavoriteRestaurants" ADD CONSTRAINT "UserFavoriteRestaurants_restaurantId_fkey" FOREIGN KEY ("restaurantId") REFERENCES "Restaurant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
