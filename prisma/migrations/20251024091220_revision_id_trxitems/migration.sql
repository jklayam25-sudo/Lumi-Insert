/*
  Warnings:

  - The primary key for the `TransactionItems` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Added the required column `refTransaction_id` to the `TransactionItems` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "TransactionItems" DROP CONSTRAINT "TransactionItems_pkey",
ADD COLUMN     "refTransaction_id" TEXT NOT NULL,
ADD CONSTRAINT "TransactionItems_pkey" PRIMARY KEY ("refTransaction_id");
