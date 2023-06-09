const functions = require('@google-cloud/functions-framework');
const { BigQuery } = require('@google-cloud/bigquery'); //导入 BigQuery 类

functions.http('helloHttp', async(req, res) => {
    let name = req.query.name;
    console.debug(`name=${name}`)

    if (!name) {
        res.status(400).send('Missing name!');//返回错误信息
        return;
    }

    let phoneNo = await queryTable(name);
    console.debug(`phoneNo=${phoneNo}`);
    if (!phoneNo) {
        res.status(404).send(`No phone number found for ${name}!`);//返回错误信息
        return;
    } else {
        res.send(`The phone number of ${name} is ${phoneNo}!`);//返回查询结果
    }
    
});

async function queryTable(name) {
    //eg., ambient-highway-388521.trainingDataset.employees
    const projectId = 'ambient-highway-388521'; //your-project-id
    const datasetId = 'trainingDataset'; //your-dataset-id
    const tableId = 'employees'; //your-table-id

    const fullTablePath = `${projectId}.${datasetId}.${tableId}`; 
    console.debug(`fullTablePath=${fullTablePath}`)

    const bigquery = new BigQuery({ projectId }); //创建一个 BigQuery 实例
    //之前用到的查询语句
    const query = `SELECT phoneNo FROM \`${fullTablePath}\` WHERE name = "${name}"`;
    console.debug(`query=${query}`)

    //结果返回在一个数组中
    const [rows] = await bigquery.query(query);
    console.log(`Rows returned: ${rows.length}`);//输出数组长度到日志中
    console.log(rows);//输出数组内容到日志中
    if (rows.length == 0) {
        return undefined;
    } else {
        return rows[0]["phoneNo"];
    }
}
