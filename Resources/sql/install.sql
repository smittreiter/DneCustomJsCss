CREATE TABLE IF NOT EXISTS `dne_custom_js_css` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `js` longtext NULL,
  `css` longtext NULL,
  `active` BOOLEAN DEFAULT '0',
  `shopIds` varchar(255) NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;