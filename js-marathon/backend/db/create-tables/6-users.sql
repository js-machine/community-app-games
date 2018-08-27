CREATE TABLE `users` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `password` varchar(60) NOT NULL,
  `isActive` tinyint(1) NOT NULL DEFAULT '0',
  `userIcon` varchar(50) NOT NULL DEFAULT 'fa-user',
  `userColor` varchar(50) NOT NULL DEFAULT 'gray',
  `createdAt` datetime DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=66 DEFAULT CHARSET=utf8;
