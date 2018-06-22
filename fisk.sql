SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";

CREATE TABLE `fisk` (
  `fisk_id` int(11) NOT NULL,
  `fisk_navn` varchar(32) NOT NULL,
  `fisk_farve` varchar(32) NOT NULL,
  `fisk_koen` varchar(8) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `fisk` (`fisk_id`, `fisk_navn`, `fisk_farve`, `fisk_koen`) VALUES
(1, 'Gubbi', 'Sort', 'han'),
(2, 'Snubbi', 'Rød', 'hun');

ALTER TABLE `fisk` ADD PRIMARY KEY (`fisk_id`);
ALTER TABLE `fisk` MODIFY `fisk_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;COMMIT;
