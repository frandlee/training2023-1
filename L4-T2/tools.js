const { BigQuery } = require('@google-cloud/bigquery'); //导入 BigQuery 类
const { Storage } = require('@google-cloud/storage'); //导入Storage类

module.exports = {
	loadFileFromGCSToBQ
};

function getTableId(fileName) {
	let tmparr = fileName.split("/");
	let folder;
	if (tmparr.length > 1) {
	  folder = tmparr[0];
	  console.log(`folder:${folder}`);
	} else {
	  console.error("Bypassed! File should be uploaded into folder. ");
	}

	return folder;
}

function getFileFormat(fileName) {
	tmparr = fileName.split(".");
	let fileExtension;
	if (tmparr.length > 1) {
	  fileExtension = tmparr[1].toLowerCase();
	  console.log(`fileExtension:${fileExtension}`);
	}
	else {
	  console.error("Bypassed! File should have extension.");
	}

	return fileExtension;
}

async function loadFileFromGCSToBQ(bucket, fileName) {
	// Get tableId based on the folder name
	let tableId = getTableId(fileName);
	if (!tableId) {
	  console.error(`Bypassed! TableId is not found. FileName:${fileName}`);
	  return;
	}
  
	// Get fileFormat based on the file extension
	let fileFormat = getFileFormat(fileName);
	if (!fileFormat) {
	  console.error(`Bypassed! FileFormat is not found. FileName:${fileName}`);
	  return;
	}
  
	//Read from ENV
	let location = process.env.LOCATION;
	let datasetId = process.env.DATASET_ID;
  
	console.log(`location:${location}, datasetId:${datasetId}, tableId:${tableId}, fileFormat:${fileFormat}`);
	
	if (fileFormat === "csv") {
	  await loadCSVFromGCS(bucket, fileName, datasetId, tableId, location);
	  return;
	} else if (fileFormat === "json") {
	  await loadJsonFromGCS(bucket, fileName, datasetId, tableId, location);
	  return;
	} else {
	  console.error(`Bypassed! ${fileExtension} is not supported. File should be in csv or json format. \nFileName:${fileName}`);
	  return;
	}
}

async function loadCSVFromGCS(bucket, fileName, datasetId, tableId, location) {
	// Instantiate clients
	const bigquery = new BigQuery();
	const storage = new Storage();
  
	const metadata = {
	  sourceFormat: 'CSV',
	  skipLeadingRows: 1,
	  location: location,
	  wirteDisposition: "WRITE_APPEND"
	};
  
	// Load data from a Google Cloud Storage file into the table
	const [job] = await bigquery
	  .dataset(datasetId)
	  .table(tableId)
	  .load(storage.bucket(bucket).file(fileName), metadata);
  
	// load() waits for the job to finish
	console.log(`Job ${job.id} completed.`);
  
	// Check the job's status for errors
	const errors = job.status.errors;
	if (errors && errors.length > 0) {
	  throw errors;
	}
}

async function loadJsonFromGCS(bucket, fileName, datasetId, tableId, location) {
	// Instantiate clients
	const bigquery = new BigQuery();
	const storage = new Storage();
  
	const metadata = {
	  sourceFormat: "NEWLINE_DELIMITED_JSON",
	  location: location,
	  wirteDisposition: "WRITE_APPEND"
	};
  
	// Load data from a Google Cloud Storage file into the table
	const [job] = await bigquery
	  .dataset(datasetId)
	  .table(tableId)
	  .load(storage.bucket(bucket).file(fileName), metadata);
  
	// load() waits for the job to finish
	console.log(`Job ${job.id} completed.`);
  
	// Check the job's status for errors
	const errors = job.status.errors;
	if (errors && errors.length > 0) {
	  throw errors;
	}
}