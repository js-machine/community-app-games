CREATE TABLE `quest_categories` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `categoryDifficulty` int(11) NOT NULL,
  `categoryName` varchar(50) NOT NULL,
  `createdAt` datetime DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;
