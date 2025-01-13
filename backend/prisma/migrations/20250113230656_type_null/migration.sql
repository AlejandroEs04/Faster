-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_typeID_fkey";

-- AlterTable
ALTER TABLE "Product" ALTER COLUMN "typeID" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_typeID_fkey" FOREIGN KEY ("typeID") REFERENCES "Type"("ID") ON DELETE SET NULL ON UPDATE CASCADE;
