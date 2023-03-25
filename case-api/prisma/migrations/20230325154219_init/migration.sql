-- CreateTable
CREATE TABLE "Signiflyer" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "expertises" TEXT NOT NULL DEFAULT '',
    "tools" TEXT NOT NULL DEFAULT '',
    "availableFrom" DATETIME NOT NULL,
    "yrs_exp_gen" INTEGER NOT NULL,
    "yrs_exp_sig" INTEGER NOT NULL,
    "about" TEXT NOT NULL DEFAULT 'Very Good',
    "img" TEXT NOT NULL,
    "education" TEXT
);

-- CreateTable
CREATE TABLE "Project" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "from" DATETIME NOT NULL,
    "to" DATETIME NOT NULL,
    "name" TEXT NOT NULL,
    "customerId" INTEGER NOT NULL,
    CONSTRAINT "Project_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Customer" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "about" TEXT NOT NULL DEFAULT 'An important client'
);

-- CreateTable
CREATE TABLE "Requirement" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "education" TEXT,
    "tool" TEXT DEFAULT '',
    "expertise" TEXT,
    "yrs_exp_gen" INTEGER NOT NULL,
    "yrs_exp_sig" INTEGER NOT NULL,
    "about" TEXT DEFAULT 'Details about this requirement',
    "projectId" INTEGER NOT NULL,
    "signiflyerId" INTEGER,
    CONSTRAINT "Requirement_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Requirement_signiflyerId_fkey" FOREIGN KEY ("signiflyerId") REFERENCES "Signiflyer" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Signiflyer_email_key" ON "Signiflyer"("email");
