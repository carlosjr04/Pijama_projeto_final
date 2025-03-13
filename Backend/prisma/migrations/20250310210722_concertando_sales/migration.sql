/*
  Warnings:

  - A unique constraint covering the columns `[zip_code,state,city,neighborhood,address,number]` on the table `Address` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Sale_addressId_key";

-- CreateIndex
CREATE UNIQUE INDEX "Address_zip_code_state_city_neighborhood_address_number_key" ON "Address"("zip_code", "state", "city", "neighborhood", "address", "number");
