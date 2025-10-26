-- DropForeignKey
ALTER TABLE "AuthToken" DROP CONSTRAINT "AuthToken_ownerId_fkey";

-- AddForeignKey
ALTER TABLE "AuthToken" ADD CONSTRAINT "AuthToken_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
