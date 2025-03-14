-- CreateTable
CREATE TABLE "Feedback" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "rating" REAL NOT NULL,
    "userId" TEXT NOT NULL,
    CONSTRAINT "Feedback_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Pajamas" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "price" REAL NOT NULL,
    "season" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "gender" TEXT NOT NULL,
    "favorite" BOOLEAN NOT NULL,
    "on_sale" BOOLEAN NOT NULL,
    "sale_percent" REAL
);

-- CreateTable
CREATE TABLE "PajamaSize" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "stock_quantity" INTEGER NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "size" TEXT NOT NULL,
    "pajamaId" TEXT NOT NULL,
    CONSTRAINT "PajamaSize_pajamaId_fkey" FOREIGN KEY ("pajamaId") REFERENCES "Pajamas" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Sale" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "buyer_name" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "price" REAL NOT NULL,
    "addressId" TEXT NOT NULL,
    "payment_method" TEXT NOT NULL,
    "installments" INTEGER NOT NULL DEFAULT 1,
    "card_number" TEXT,
    CONSTRAINT "Sale_addressId_fkey" FOREIGN KEY ("addressId") REFERENCES "Address" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Sale_Pajamas" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "quantity" INTEGER NOT NULL,
    "price" REAL NOT NULL,
    "pajamasId" TEXT NOT NULL,
    "saleId" TEXT NOT NULL,
    CONSTRAINT "Sale_Pajamas_pajamasId_fkey" FOREIGN KEY ("pajamasId") REFERENCES "Pajamas" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Sale_Pajamas_saleId_fkey" FOREIGN KEY ("saleId") REFERENCES "Sale" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Address" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "zip_code" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "neighborhood" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "number" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "PajamaSize_pajamaId_size_key" ON "PajamaSize"("pajamaId", "size");

-- CreateIndex
CREATE UNIQUE INDEX "Address_zip_code_key" ON "Address"("zip_code");

-- CreateIndex
CREATE UNIQUE INDEX "Address_zip_code_state_city_neighborhood_address_number_key" ON "Address"("zip_code", "state", "city", "neighborhood", "address", "number");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
