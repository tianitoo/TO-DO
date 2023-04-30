/*
  Warnings:

  - A unique constraint covering the columns `[cardId]` on the table `Card` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `cardId` to the `Card` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Card" ADD COLUMN     "cardId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Card_cardId_key" ON "Card"("cardId");
