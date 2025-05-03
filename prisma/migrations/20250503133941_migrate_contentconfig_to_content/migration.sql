/*
  Warnings:

  - You are about to drop the column `contentConfig` on the `Blog` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Blog" DROP COLUMN "contentConfig",
ADD COLUMN     "content" TEXT;
