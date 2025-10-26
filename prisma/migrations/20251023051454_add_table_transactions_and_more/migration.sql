-- CreateEnum
CREATE TYPE "TrxDelivery" AS ENUM ('PENDING', 'READY', 'FINISH');

-- CreateEnum
CREATE TYPE "TrxStatus" AS ENUM ('UNPAID', 'PAID');

-- CreateTable
CREATE TABLE "Transaction" (
    "transaction_id" TEXT NOT NULL,
    "transaction_customer" TEXT NOT NULL,
    "transaction_date" TIMESTAMP(3) NOT NULL,
    "transaction_status" "TrxStatus" NOT NULL DEFAULT 'UNPAID',
    "transaction_deliver" "TrxDelivery" NOT NULL DEFAULT 'PENDING',
    "transaction_handler" TEXT NOT NULL,

    CONSTRAINT "Transaction_pkey" PRIMARY KEY ("transaction_id")
);

-- CreateTable
CREATE TABLE "TransactionItems" (
    "transaction_id" TEXT NOT NULL,
    "product_id" TEXT NOT NULL,
    "product_name" TEXT NOT NULL,
    "product_quantity" INTEGER NOT NULL,
    "product_price" INTEGER NOT NULL,

    CONSTRAINT "TransactionItems_pkey" PRIMARY KEY ("transaction_id","product_id")
);

-- AddForeignKey
ALTER TABLE "TransactionItems" ADD CONSTRAINT "TransactionItems_transaction_id_fkey" FOREIGN KEY ("transaction_id") REFERENCES "Transaction"("transaction_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TransactionItems" ADD CONSTRAINT "TransactionItems_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "Product"("product_id") ON DELETE RESTRICT ON UPDATE CASCADE;
