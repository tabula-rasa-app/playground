-- CreateTable
CREATE TABLE "GoalCounter" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "championship" TEXT NOT NULL,
    "goals" INTEGER NOT NULL DEFAULT 0,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateIndex
CREATE UNIQUE INDEX "GoalCounter_championship_key" ON "GoalCounter"("championship");
