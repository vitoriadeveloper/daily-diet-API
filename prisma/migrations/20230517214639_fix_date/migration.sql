/*
  Warnings:

  - You are about to drop the column `time` on the `Diet` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Diet" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "date" DATETIME NOT NULL,
    "isDiet" BOOLEAN NOT NULL DEFAULT false,
    "userId" TEXT NOT NULL,
    CONSTRAINT "Diet_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Diet" ("date", "description", "id", "isDiet", "name", "userId") SELECT "date", "description", "id", "isDiet", "name", "userId" FROM "Diet";
DROP TABLE "Diet";
ALTER TABLE "new_Diet" RENAME TO "Diet";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
