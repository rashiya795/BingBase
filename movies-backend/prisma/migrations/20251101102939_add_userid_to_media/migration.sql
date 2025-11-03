/*
  Warnings:

  - Added the required column `userId` to the `Media` table without a default value. This is not possible if the table is not empty.
  - Made the column `director` on table `media` required. This step will fail if there are existing NULL values in that column.
  - Made the column `budget` on table `media` required. This step will fail if there are existing NULL values in that column.
  - Made the column `location` on table `media` required. This step will fail if there are existing NULL values in that column.
  - Made the column `duration` on table `media` required. This step will fail if there are existing NULL values in that column.
  - Made the column `year` on table `media` required. This step will fail if there are existing NULL values in that column.
  - Made the column `description` on table `media` required. This step will fail if there are existing NULL values in that column.
  - Made the column `posterUrl` on table `media` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `media` ADD COLUMN `userId` INTEGER NOT NULL,
    MODIFY `director` VARCHAR(191) NOT NULL,
    MODIFY `budget` DOUBLE NOT NULL,
    MODIFY `location` VARCHAR(191) NOT NULL,
    MODIFY `duration` VARCHAR(191) NOT NULL,
    MODIFY `year` INTEGER NOT NULL,
    MODIFY `description` VARCHAR(191) NOT NULL,
    MODIFY `posterUrl` VARCHAR(191) NOT NULL;

-- CreateTable
CREATE TABLE `WeekendPick` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `mediaId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Media` ADD CONSTRAINT `Media_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `WeekendPick` ADD CONSTRAINT `WeekendPick_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `WeekendPick` ADD CONSTRAINT `WeekendPick_mediaId_fkey` FOREIGN KEY (`mediaId`) REFERENCES `Media`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
