/*
  Warnings:

  - The primary key for the `accountants` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `accountants` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `contador_id` on the `companies` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "companies" DROP CONSTRAINT "companies_contador_id_fkey";

-- AlterTable
ALTER TABLE "accountants" DROP CONSTRAINT "accountants_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "accountants_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "companies" DROP COLUMN "contador_id",
ADD COLUMN     "contador_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "companies" ADD CONSTRAINT "companies_contador_id_fkey" FOREIGN KEY ("contador_id") REFERENCES "accountants"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
