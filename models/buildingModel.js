const buildingModel = {};
const config = require('../config/dbConfig.js');
const pgp = require('pg-promise')();
const db = pgp(config);

buildingModel.insertBuildInfo = function(json) {
	console.log('attempting to send to database...')
	console.log('json is: '+json)

	return db.one(`INSERT INTO buildingInfo (borough, zipcode, address, numViolations, numComplaints, complaints, propertyId, floodZone) 
					VALUES ($[borough], $[zipcode], $[address], $[numViolations], $[numComplaints], $[complaints], $[propertyId], $[floodZone])`, json);
};	

buildingModel.insertComplaintInfo = function(complaintJson) {
	console.log('attempting to send to database as well...')
	console.log('complaintJson is: '+complaintJson)

	return db.one(`INSERT INTO complaintInfo (address, propertyId, complaintId, complaint, comment, timeDate, status, categoryCode, priority) 
					VALUES ($[address], $[propertyId], $[complaintId], $[complaint], $[comment], $[timeDate], $[status], $[categoryCode], $[priority])`, complaintJson);
};

buildingModel.findAll = () => 
	db.query('SELECT DISTINCT address, borough, zipcode , propertyId FROM buildingInfo');

buildingModel.findOne = () => 
	db.query('SELECT address, borough, zipcode, numViolations, numComplaints, propertyId FROM buildingInfo ORDER BY ID DESC LIMIT 1');

buildingModel.seeComplaints = (id) => 
	db.query(`SELECT address, timeDate, complaint , comment, propertyId, status, categoryCode, priority FROM complaintInfo WHERE propertyId=$1`, id);

buildingModel.seeViolations = (id) =>
	db.query(`SELECT address, propertyId, numComplaints FROM buildingInfo WHERE propertyId=$1`, id);

buildingModel.destroy = (id) =>
	db.none(`BEGIN;
			DELETE FROM buildingInfo WHERE propertyId = $1;
  			DELETE FROM complaintInfo WHERE propertyId = $1;
			COMMIT`, id)
	// db.none('DELETE FROM buildingInfo WHERE buildingInfo.propertyId =$1', id)


module.exports = buildingModel