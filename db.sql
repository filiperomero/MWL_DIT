-- --------------------------------------------------------
-- Host:                         remote-mysql3.servage.net
-- Server version:               5.5.53-MariaDB-1~wheezy - mariadb.org binary distribution
-- Server OS:                    debian-linux-gnu
-- HeidiSQL Version:             9.4.0.5125
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;

-- Dumping structure for table filipe.keyboard
CREATE TABLE IF NOT EXISTS `keyboard` (
  `taskId` int(11) DEFAULT NULL,
  `timeStamp` int(11) DEFAULT NULL,
  `keyPressed` varchar(500) DEFAULT NULL
) ENGINE=Aria DEFAULT CHARSET=latin1 PAGE_CHECKSUM=1;

-- Data exporting was unselected.
-- Dumping structure for table filipe.mouse_clicks
CREATE TABLE IF NOT EXISTS `mouse_clicks` (
  `taskId` int(11) DEFAULT NULL,
  `timeStamp` int(11) DEFAULT NULL,
  `x` int(11) DEFAULT NULL,
  `y` int(11) DEFAULT NULL,
  `vizElement` varchar(500) DEFAULT NULL
) ENGINE=Aria DEFAULT CHARSET=latin1 PAGE_CHECKSUM=1;

-- Data exporting was unselected.
-- Dumping structure for table filipe.mouse_pos
CREATE TABLE IF NOT EXISTS `mouse_pos` (
  `taskId` int(11) DEFAULT NULL,
  `timeStamp` int(11) DEFAULT NULL,
  `x` int(11) DEFAULT NULL,
  `y` int(11) DEFAULT NULL,
  `height` int(11) DEFAULT NULL,
  `width` int(11) DEFAULT NULL
) ENGINE=Aria DEFAULT CHARSET=latin1 PAGE_CHECKSUM=1 COMMENT='mouse positions for each task';

-- Data exporting was unselected.
-- Dumping structure for table filipe.scrolling
CREATE TABLE IF NOT EXISTS `scrolling` (
  `taskId` int(11) DEFAULT NULL,
  `timeStamp` int(11) DEFAULT NULL,
  `scrollTop` int(11) DEFAULT NULL
) ENGINE=Aria DEFAULT CHARSET=latin1 PAGE_CHECKSUM=1;

-- Data exporting was unselected.
-- Dumping structure for table filipe.task
CREATE TABLE IF NOT EXISTS `task` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `tasktype` int(11) DEFAULT NULL,
  `interface` int(11) DEFAULT NULL,
  `start_time` datetime DEFAULT NULL,
  `end_time` datetime DEFAULT NULL,
  `email` varchar(500) DEFAULT NULL,
  `gender` varchar(500) DEFAULT NULL,
  `age` varchar(500) DEFAULT NULL,
  `nationality` varchar(500) DEFAULT NULL,
  `expertise` varchar(500) DEFAULT NULL,
  `education` varchar(500) DEFAULT NULL,
  `task1_survey_q1` varchar(4) DEFAULT NULL,
  `task1_survey_q2` varchar(4) DEFAULT NULL,
  `task2_survey_q1` varchar(4) DEFAULT NULL,
  `task2_survey_q2` varchar(4) DEFAULT NULL,
  `mwl_mental` varchar(4) DEFAULT NULL,
  `mwl_physical` varchar(4) DEFAULT NULL,
  `mwl_temporal` varchar(4) DEFAULT NULL,
  `mwl_performance` varchar(4) DEFAULT NULL,
  `mwl_effort` varchar(4) DEFAULT NULL,
  `mwl_frustration` varchar(4) DEFAULT NULL,
  `mwl_mwl` varchar(4) DEFAULT NULL,
  `mwl_parallelism` varchar(4) DEFAULT NULL,
  `mwl_manualact` varchar(4) DEFAULT NULL,
  `mwl_visualact` varchar(4) DEFAULT NULL,
  `mwl_solvedec` varchar(4) DEFAULT NULL,
  `mwl_context` varchar(4) DEFAULT NULL,
  `mwl_motivation` varchar(4) DEFAULT NULL,
  `mwl_skill` varchar(4) DEFAULT NULL,
  `mwl_knowledge` varchar(4) DEFAULT NULL,
  `mwl_alertness` varchar(4) DEFAULT NULL,
  `mwl_taskspace` varchar(4) DEFAULT NULL,
  `mwl_verbalmat` varchar(4) DEFAULT NULL,
  `mwl_auditoryatt` varchar(4) DEFAULT NULL,
  `mwl_speechresp` varchar(4) DEFAULT NULL,
  `mwl_responsesel` varchar(4) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=Aria AUTO_INCREMENT=230 DEFAULT CHARSET=latin1 PAGE_CHECKSUM=1;

-- Data exporting was unselected.
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
