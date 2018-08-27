CREATE TABLE `quest_user_answers` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `userId` int(10) unsigned NOT NULL,
  `taskId` int(10) unsigned NOT NULL,
  `taskSpentTime` int(11) NOT NULL,
  `taskPoints` int(11) NOT NULL,
  `taskUserCode` text NOT NULL,
  `createdAt` datetime DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `userId` (`userId`),
  KEY `taskId` (`taskId`),
  CONSTRAINT `quest_user_answers_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `quest_user_answers_ibfk_2` FOREIGN KEY (`taskId`) REFERENCES `quest_tasks` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=308 DEFAULT CHARSET=utf8;
