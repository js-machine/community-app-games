CREATE TABLE `quest_tasks_tests` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `taskId` int(10) unsigned NOT NULL,
  `paramInput` text NOT NULL,
  `paramOutput` text NOT NULL,
  `createdAt` datetime DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `taskId` (`taskId`),
  CONSTRAINT `quest_tasks_tests_ibfk_1` FOREIGN KEY (`taskId`) REFERENCES `quest_tasks` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=200 DEFAULT CHARSET=utf8;
