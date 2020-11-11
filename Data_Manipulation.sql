/*Search Incidents by vehicle licensePlate*/
SELECT incidents.state, vehicles.licensePlate , count(incidents.incidentID) AS 'Total'
FROM vehicles
INNER JOIN incidents ON vehicles.licensePlate = incidents.licensePlate 
WHERE vehicles.licensePlate='ZPQ746'/*chosen by user*/

/*Search Offenses YTD in city of user choice*/
SELECT COUNT(offenses.offenseID) FROM offenses
INNER JOIN incidentsOffenses ON offenses.offenseID = incidentsOffenses.offenseID
INNER JOIN incidents ON incidentsOffenses.incidentID = incidents.incidentID
WHERE incidents.city = "Portland"/*chosen by user*/



/* Search top offense in city of user choice */
SELECT totalOffenses.maxOffense AS 'Largest Offense', MAX(totalOffenses.mycount) AS 'Total' 
FROM 
(SELECT offenses.name maxOffense, count(offenses.offenseID) mycount FROM offenses
INNER JOIN incidentsOffenses ON offenses.offenseID = incidentsOffenses.offenseID
INNER JOIN incidents ON incidentsOffenses.incidentID = incidents.incidentID
WHERE incidents.city = "Portland" /*chosen by user*/
GROUP BY offenses.offenseID) as totalOffenses



/* Details of specific Indident Report after license Search */
/* 1. Search Incidents by vehicle licensePlate*/
SELECT incidents.state, incidents.state, incidents.month, incidents.day, incidents.year
FROM vehicles
INNER JOIN incidents ON vehicles.licensePlate = incidents.licensePlate 
WHERE vehicles.licensePlate='ZPQ746'/*chosen by user*/
/* 2: Once you have incidentID search for attributes involving that id*/
SELECT incidents.city, incidents.state, incidents.date, offenses.name, evidence.description
FROM incidents
INNER JOIN incidentsOffenses ON incidents.incidentID = incidentsOffenses.incidentID
INNER JOIN offenses ON incidentsOffenses.offenseID = offenses.offenseID
INNER JOIN evidence ON incidents.incidentID =  evidence.incidentID
WHERE incidents.incidentID = '3'/*incident id gotten from step 1*/




/*add a new incident report*/
INSERT INTO `vehicles` (`licensePlate`, `make`, `model`, `color`) VALUES
(:lpInput, :makeInput, :modelInput, :colorInput)

INSERT INTO `incidents` (`totalOffenses`, `city`, `state`, `date`, `licensePlate`) VALUES
(:autoInc, :cityInput, :stateInput, :dateInput,:licenseInput)

INSERT INTO `evidence` (`description`, `incidentID`) VALUES (:descriptionInput, :imageURL :videoURL)

INSERT INTO `incidentsOffenses` (`incidentID`, `offenseID`) VALUES
(:autoInputfromIncidentID,:inputFromDropdown)



