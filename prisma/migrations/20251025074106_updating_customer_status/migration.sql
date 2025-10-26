-- CreateEnum
CREATE TYPE "CustStatus" AS ENUM ('ACTIVE', 'SUSPENDED');

-- AlterTable
ALTER TABLE "Customer" ADD COLUMN     "customer_status" "CustStatus" NOT NULL DEFAULT 'ACTIVE';
