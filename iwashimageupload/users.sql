
CREATE TABLE IF NOT EXISTS `users_image` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT,
  `image` varchar(255) NOT NULL,
  `closet_id` int(11) NOT NULL,
  `item_id` int(11) NOT NULL,
  PRIMARY KEY (`user_id`)
) AUTO_INCREMENT=1 ;
