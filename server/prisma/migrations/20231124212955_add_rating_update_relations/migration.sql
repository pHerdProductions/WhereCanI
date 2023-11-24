/*
  Warnings:

  - You are about to drop the column `ratings` on the `Post` table. All the data in the column will be lost.
  - Added the required column `ratingAvg` to the `Poi` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Poi" ADD COLUMN     "ratingAvg" DECIMAL(2,1) NOT NULL;

-- AlterTable
ALTER TABLE "Post" DROP COLUMN "ratings";

-- CreateTable
CREATE TABLE "Rating" (
    "id" TEXT NOT NULL,
    "rating" DECIMAL(2,1) NOT NULL,
    "userId" TEXT NOT NULL,
    "poiId" TEXT NOT NULL,

    CONSTRAINT "Rating_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Rating" ADD CONSTRAINT "Rating_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Rating" ADD CONSTRAINT "Rating_poiId_fkey" FOREIGN KEY ("poiId") REFERENCES "Poi"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
