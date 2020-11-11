
/* Table structure for table 'Vehicles'*/
DROP TABLE IF EXISTS `vehicles`;
CREATE TABLE `vehicles`(
	`licensePlate` varchar(255) NOT NULL,
	`make` varchar(255) NOT NULL,
	`model` varchar(255) NOT NULL,
	`color` varchar(255) NOT NULL,
	PRIMARY KEY (`licensePlate`)
)ENGINE=InnoDB DEFAULT CHARSET=latin1;


/*Insert values into 'vehicles'*/
LOCK TABLES `vehicles` WRITE;
INSERT INTO `vehicles` (`licensePlate`, `make`, `model`, `color`) VALUES
('ZPQ746', 'Toyota', 'Corolla', 'blue'),
('LWZ837', 'Dodge', 'Challenger', 'red'),
('PWV264', 'Subaru', 'WRX', 'red'),
('WBL333', 'Subaru', 'Forester', 'green'),
('WBR111', 'Volvo', 'XC60', 'red'),
('WBX222', 'Subaru', 'Crosstrek', 'blue');

UNLOCK TABLES;


/*Table structure for table 'orders'*/
DROP TABLE IF EXISTS `incidents`;
CREATE TABLE `incidents`(
	`incidentID` int(11) AUTO_INCREMENT NOT NULL,
    `city` varchar(255) NOT NULL,
    `state` varchar(255) NOT NULL,
	`date` date NOT NULL,
    `licensePlate` varchar(255) NOT NULL,
	PRIMARY KEY (`incidentID`),
	FOREIGN KEY (`licensePlate`) REFERENCES `vehicles`(`licensePlate`) 
)ENGINE=InnoDB DEFAULT CHARSET=latin1;


/*Insert values into 'incidents'*/
LOCK TABLES `incidents` WRITE;
INSERT INTO `incidents` (`city`, `state`, `date`, `licensePlate`) VALUES
('Portland', 'Oregon', '2019-07-14','ZPQ746'),
('Miami', 'Florida', '2020-01-11','LWZ837'),
('Portland', 'Oregon', '2020-01-23','ZPQ746'),
('Bend', 'Oregon', '2020-02-05','PWV264'),
('Portland', 'Oregon', '2020-01-01', 'WBL333'),
('Portland', 'Oregon', '2020-01-08', 'WBR111'),
('Portland', 'Oregon', '2020-01-14', 'WBX222');
UNLOCK TABLES;


/*Table structure for table 'offenses'*/
DROP TABLE IF EXISTS `offenses`;
CREATE TABLE `offenses`(
	`offenseID` int(11) AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	PRIMARY KEY (`offenseID`)
)ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Insert values into 'offenses'*/
LOCK TABLES `offenses` WRITE;
INSERT INTO `offenses` (`name`) VALUES
('DUI'),
('Speeding'),
('Running a Red/Stop Sign'),
('Reckless Driving'),
('Road Rage'),
('Littering'),
('Illegal Parking');
UNLOCK TABLES;



/*Table structure for table 'incidentsOffenses'*/
DROP TABLE IF EXISTS `incidentsOffenses`;
CREATE TABLE `incidentsOffenses`(
	`incidentID` int(11) NOT NULL,
	`offenseID` int(11) NOT NULL,
	PRIMARY KEY (`incidentID`,`offenseID`),
	FOREIGN KEY (`incidentID`) REFERENCES `incidents`(`incidentID`),
	FOREIGN KEY (`offenseID`) REFERENCES `offenses`(`offenseID`)
)ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Insert values into 'incidentsOffenses'*/
LOCK TABLES `incidentsOffenses` WRITE;
INSERT INTO `incidentsOffenses` (`incidentID`, `offenseID`) VALUES
(1,1),
(1,2),
(1,3),
(2,5),
(2,6),
(3,7),
(4,1),
(4,2),
(5,1),
(5,2),
(6,2),
(7,2);
UNLOCK TABLES;


/*Table structure for table 'evidence'*/
DROP TABLE IF EXISTS `evidence`;
CREATE TABLE `evidence`(
	`evidenceID` int(11) AUTO_INCREMENT NOT NULL,
	`description` varchar(255) NOT NULL,
	`incidentID` int(11) NOT NULL,
	PRIMARY KEY (`evidenceID`),
    FOREIGN KEY (`incidentID`) REFERENCES `incidents`(`incidentID`)
)ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Insert values into 'evidence'*/
LOCK TABLES `evidence` WRITE;
INSERT INTO `evidence` (`description`, `incidentID`) VALUES
('This crazy guy was swirving on the road, goinng 90mph, and ran a red!', 1),
('A woman was yelling and cursing at me while driving and threw her soda cup at my car', 2),
('This car was parked on two parking and the meter was expired over an hour ago!', 3),
('I saw this person drinking while driving as he zoomed past me over the limit!', 4),
('This woman must have been going 100mph on a 60mph speed limit! I saw beer cans all over her dashboard!',5),
('That car came like a bat out of hell, couldve killed someone!',6),
('Going 50mph in a school zone!',7);
UNLOCK TABLES;


/* Constraints for table 'orders' */
ALTER TABLE `incidents`
	ADD CONSTRAINT `incidents_ibfk_1` FOREIGN KEY (`licensePlate`) REFERENCES `vehicles`(`licensePlate`) ON DELETE CASCADE ON UPDATE CASCADE;


/* Constraints for table 'orderProducts' */
ALTER TABLE `evidence`
	ADD CONSTRAINT `evidence_ibfk_1` FOREIGN KEY (`incidentID`) REFERENCES `incidents`(`incidentID`) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE `incidentsOffenses`
	ADD CONSTRAINT `incidentsOffenses_ibfk_1` FOREIGN KEY (`incidentID`) REFERENCES `incidents`(`incidentID`) ON DELETE CASCADE ON UPDATE CASCADE,
	ADD CONSTRAINT `incidentsOffenses_ibfk_2` FOREIGN KEY (`offenseID`) REFERENCES `offenses`(`offenseID`) ON DELETE CASCADE ON UPDATE CASCADE;

	


UPDATE `vehicles` SET `make`="Toyota",`model`="Venza",`color`="Red" WHERE `licensePlate`="9999"