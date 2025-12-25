-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_MenuHistory" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "petId" TEXT NOT NULL,
    "date" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "menu" TEXT NOT NULL,
    CONSTRAINT "MenuHistory_petId_fkey" FOREIGN KEY ("petId") REFERENCES "Pet" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_MenuHistory" ("date", "id", "menu", "petId") SELECT "date", "id", "menu", "petId" FROM "MenuHistory";
DROP TABLE "MenuHistory";
ALTER TABLE "new_MenuHistory" RENAME TO "MenuHistory";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
