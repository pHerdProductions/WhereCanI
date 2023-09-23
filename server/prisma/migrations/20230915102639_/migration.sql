/*
  Warnings:

  - You are about to drop the column `comments` on the `POI` table. All the data in the column will be lost.
  - You are about to drop the column `ratingAVG` on the `POI` table. All the data in the column will be lost.
  - You are about to drop the column `ratings` on the `POI` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "POI" DROP COLUMN "comments",
DROP COLUMN "ratingAVG",
DROP COLUMN "ratings";

-- CreateTable
CREATE TABLE "Post" (
    "id" TEXT NOT NULL,
    "comment" VARCHAR(200) NOT NULL,
    "authorId" TEXT NOT NULL,
    "ratings" DECIMAL(2,1) NOT NULL,
    "poiId" TEXT NOT NULL,

    CONSTRAINT "Post_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_poiId_fkey" FOREIGN KEY ("poiId") REFERENCES "POI"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
