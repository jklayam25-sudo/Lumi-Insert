/*
  Warnings:

  - You are about to drop the column `transaction_customer` on the `Transaction` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Transaction" DROP COLUMN "transaction_customer",
ADD COLUMN     "transaction_customer_name" TEXT NOT NULL DEFAULT 'PUBLIC';

-- CreateTable
CREATE TABLE "Customer" (
    "customer_id" TEXT NOT NULL,
    "customer_name" TEXT NOT NULL,
    "customer_contact" TEXT NOT NULL,
    "customer_since" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "customer_address" TEXT NOT NULL,
    "customer_lat" DOUBLE PRECISION,
    "customer_lng" DOUBLE PRECISION,

    CONSTRAINT "Customer_pkey" PRIMARY KEY ("customer_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Customer_customer_name_key" ON "Customer"("customer_name");

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_transaction_customer_name_fkey" FOREIGN KEY ("transaction_customer_name") REFERENCES "Customer"("customer_name") ON DELETE SET DEFAULT ON UPDATE CASCADE;
