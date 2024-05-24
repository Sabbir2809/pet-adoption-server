/*
  Warnings:

  - You are about to drop the column `agreedToTerms` on the `adoption_requests` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "adoption_requests" DROP COLUMN "agreedToTerms";

-- AlterTable
ALTER TABLE "pets" ALTER COLUMN "photos" SET NOT NULL,
ALTER COLUMN "photos" SET DATA TYPE TEXT;
