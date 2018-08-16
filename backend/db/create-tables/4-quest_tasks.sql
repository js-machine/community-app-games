CREATE TABLE `quest_tasks` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `categoryId` int(10) unsigned NOT NULL,
  `taskQuestion` text NOT NULL,
  `taskHeader` varchar(100) NOT NULL,
  `taskFooter` varchar(50) NOT NULL,
  `taskPoints` int(11) NOT NULL,
  `createdAt` datetime DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `categoryId` (`categoryId`),
  CONSTRAINT `quest_tasks_ibfk_1` FOREIGN KEY (`categoryId`) REFERENCES `quest_categories` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=57 DEFAULT CHARSET=utf8;
