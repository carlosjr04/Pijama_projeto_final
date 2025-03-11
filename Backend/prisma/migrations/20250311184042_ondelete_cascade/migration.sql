-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_PajamaSize" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "stock_quantity" INTEGER NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "size" TEXT NOT NULL,
    "pajamaId" TEXT NOT NULL,
    CONSTRAINT "PajamaSize_pajamaId_fkey" FOREIGN KEY ("pajamaId") REFERENCES "Pajamas" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_PajamaSize" ("created_at", "id", "pajamaId", "size", "stock_quantity") SELECT "created_at", "id", "pajamaId", "size", "stock_quantity" FROM "PajamaSize";
DROP TABLE "PajamaSize";
ALTER TABLE "new_PajamaSize" RENAME TO "PajamaSize";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
