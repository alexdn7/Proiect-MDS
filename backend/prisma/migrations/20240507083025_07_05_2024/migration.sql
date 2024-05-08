/*
  Warnings:

  - Added the required column `createdOn` to the `Ticket` table without a default value. This is not possible if the table is not empty.
  - Added the required column `editedByUserId` to the `Ticket` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `ticket` ADD COLUMN `createdOn` DATETIME(3) NOT NULL,
    ADD COLUMN `editedByUserId` INTEGER NOT NULL,
    ADD COLUMN `lastModifiedOn` DATETIME(3) NULL;

-- AddForeignKey
ALTER TABLE `Ticket` ADD CONSTRAINT `Ticket_editedByUserId_fkey` FOREIGN KEY (`editedByUserId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
