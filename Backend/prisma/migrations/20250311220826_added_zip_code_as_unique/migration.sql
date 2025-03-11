/*
  Warnings:

  - A unique constraint covering the columns `[zip_code]` on the table `Address` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Address_zip_code_key" ON "Address"("zip_code");
