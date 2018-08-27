CREATE TABLE `quest_settings` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `timeForQuest` int(11) NOT NULL,
  `createdAt` datetime DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
