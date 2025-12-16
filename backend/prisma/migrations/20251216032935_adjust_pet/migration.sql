-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Pet" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "species" TEXT NOT NULL,
    "breed" TEXT NOT NULL,
    "birthDate" DATETIME NOT NULL,
    "currentWeight" DECIMAL NOT NULL,
    "activityLevel" TEXT NOT NULL,
    "dailyNutritionalPlan" TEXT,
    "menu" TEXT,
    "menuAccepted" BOOLEAN,
    CONSTRAINT "Pet_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Pet" ("activityLevel", "birthDate", "breed", "currentWeight", "dailyNutritionalPlan", "id", "menu", "menuAccepted", "name", "species", "userId") SELECT "activityLevel", "birthDate", "breed", "currentWeight", "dailyNutritionalPlan", "id", "menu", "menuAccepted", "name", "species", "userId" FROM "Pet";
DROP TABLE "Pet";
ALTER TABLE "new_Pet" RENAME TO "Pet";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
