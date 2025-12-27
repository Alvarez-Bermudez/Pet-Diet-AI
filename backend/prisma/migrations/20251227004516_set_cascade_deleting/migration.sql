-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_MenuHistory" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "petId" TEXT NOT NULL,
    "date" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "menu" TEXT NOT NULL,
    CONSTRAINT "MenuHistory_petId_fkey" FOREIGN KEY ("petId") REFERENCES "Pet" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_MenuHistory" ("date", "id", "menu", "petId") SELECT "date", "id", "menu", "petId" FROM "MenuHistory";
DROP TABLE "MenuHistory";
ALTER TABLE "new_MenuHistory" RENAME TO "MenuHistory";
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
    CONSTRAINT "Pet_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Pet" ("activityLevel", "birthDate", "breed", "currentWeight", "dailyNutritionalPlan", "id", "menu", "menuAccepted", "name", "species", "userId") SELECT "activityLevel", "birthDate", "breed", "currentWeight", "dailyNutritionalPlan", "id", "menu", "menuAccepted", "name", "species", "userId" FROM "Pet";
DROP TABLE "Pet";
ALTER TABLE "new_Pet" RENAME TO "Pet";
CREATE TABLE "new_WeightTrack" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "petId" TEXT NOT NULL,
    "weight" DECIMAL NOT NULL,
    "date" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "WeightTrack_petId_fkey" FOREIGN KEY ("petId") REFERENCES "Pet" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_WeightTrack" ("date", "id", "petId", "weight") SELECT "date", "id", "petId", "weight" FROM "WeightTrack";
DROP TABLE "WeightTrack";
ALTER TABLE "new_WeightTrack" RENAME TO "WeightTrack";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
