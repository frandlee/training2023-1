const functions = require("@google-cloud/functions-framework");
const {DBAdd, DBDelete, DBUpdate, DBQuery} = require("./tools");

functions.http("helloHttp", async (req, res) => {
	let id = req.query.id;
	let name = req.query.name;
	let phoneNo = req.query.phoneNo;
	let department = req.query.department;
	console.debug(
		`id=${id}, name=${name}, phoneNo=${phoneNo}, department=${department}`
	);

	const path = req.path;
	console.debug(`path=${path}`);

	// process services based on path
	let result;
	switch (path) {
		case "/add":
            if ( !id || !name || !phoneNo || !department ) {
                res.send('Please provide all the information!');
                return;
            }

            result = await DBAdd(id, name, phoneNo, department);
			break;
		case "/delete":
            if ( !id) {
                res.send('Please provide the information!');
                return;
            } 
			result = await DBDelete(id);
			break;
		case "/update":
            if ( !id || !name || !phoneNo || !department ) {
                res.send('Please provide all the information!');
                return;
            }
			result = await DBUpdate(id, name, phoneNo, department);
			break;
		case "/query":
            if ( !id ) {   
                res.send('Please provide the information!');
                return;
            }
			result = await DBQuery(id);
			break;
		default:
			break;
	}

	res.send(`BQ Operstion result: ${result.toString()}`); //返回查询结果
});
