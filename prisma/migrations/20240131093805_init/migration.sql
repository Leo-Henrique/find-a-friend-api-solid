-- CreateEnum
CREATE TYPE "PetType" AS ENUM ('cat', 'dog');

-- CreateEnum
CREATE TYPE "PetSize" AS ENUM ('small', 'medium', 'large');

-- CreateEnum
CREATE TYPE "PetIndependency" AS ENUM ('little', 'normal', 'very');

-- CreateTable
CREATE TABLE "Org" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "tel" TEXT NOT NULL,
    "cep" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "neighborhood" TEXT NOT NULL,
    "street" TEXT NOT NULL,
    "addressNumber" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Org_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Pet" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "type" "PetType" NOT NULL,
    "size" "PetSize" NOT NULL,
    "independency" "PetIndependency" NOT NULL,
    "energyLevel" INTEGER NOT NULL,
    "adopted" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "orgId" TEXT NOT NULL,

    CONSTRAINT "Pet_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PetRequirement" (
    "id" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "petId" TEXT NOT NULL,

    CONSTRAINT "PetRequirement_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PetPhoto" (
    "id" TEXT NOT NULL,
    "source" TEXT NOT NULL,
    "alt" TEXT NOT NULL,
    "petId" TEXT NOT NULL,

    CONSTRAINT "PetPhoto_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Org_email_key" ON "Org"("email");

-- AddForeignKey
ALTER TABLE "Pet" ADD CONSTRAINT "Pet_orgId_fkey" FOREIGN KEY ("orgId") REFERENCES "Org"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PetRequirement" ADD CONSTRAINT "PetRequirement_petId_fkey" FOREIGN KEY ("petId") REFERENCES "Pet"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PetPhoto" ADD CONSTRAINT "PetPhoto_petId_fkey" FOREIGN KEY ("petId") REFERENCES "Pet"("id") ON DELETE CASCADE ON UPDATE CASCADE;
