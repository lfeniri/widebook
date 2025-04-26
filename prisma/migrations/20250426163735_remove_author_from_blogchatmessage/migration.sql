/*
  Warnings:

  - You are about to drop the column `authorId` on the `BlogChatMessage` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "BlogChatMessage" DROP CONSTRAINT "BlogChatMessage_authorId_fkey";

-- AlterTable
ALTER TABLE "BlogChatMessage" DROP COLUMN "authorId";
