/*
  Warnings:

  - A unique constraint covering the columns `[cardOrder]` on the table `Card` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Card_cardOrder_key" ON "public"."Card"("cardOrder");
