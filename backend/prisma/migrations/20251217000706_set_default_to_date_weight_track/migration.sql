-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_WeightTrack" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "petId" TEXT NOT NULL,
    "weight" DECIMAL NOT NULL,
    "date" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "WeightTrack_petId_fkey" FOREIGN KEY ("petId") REFERENCES "Pet" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_WeightTrack" ("date", "id", "petId", "weight") SELECT "date", "id", "petId", "weight" FROM "WeightTrack";
DROP TABLE "WeightTrack";
ALTER TABLE "new_WeightTrack" RENAME TO "WeightTrack";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
