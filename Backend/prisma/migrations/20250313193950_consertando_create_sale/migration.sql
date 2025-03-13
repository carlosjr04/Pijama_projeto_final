/*
  Warnings:

  - A unique constraint covering the columns `[pajamaId,size]` on the table `PajamaSize` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "PajamaSize_pajamaId_size_key" ON "PajamaSize"("pajamaId", "size");
