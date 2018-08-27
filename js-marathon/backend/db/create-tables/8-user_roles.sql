CREATE TABLE `user_roles` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `userId` int(10) unsigned NOT NULL,
  `roleId` int(10) unsigned NOT NULL,
  `createdAt` datetime DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `userId` (`userId`),
  KEY `roleId` (`roleId`),
  CONSTRAINT `user_roles_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `user_roles_ibfk_2` FOREIGN KEY (`roleId`) REFERENCES `roles` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=66 DEFAULT CHARSET=utf8;
