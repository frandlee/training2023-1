const functions = require('@google-cloud/functions-framework');
const { BigQuery } = require('@google-cloud/bigquery'); //导入 BigQuery 类

functions.http('helloHttp', async(req, res) => {
    let name = req.query.employeeName;
    console.debug(`name=${name}`)

    let phoneNo = await queryTable(name);
    res.send(`The phone number of ${name} is ${phoneNo}!`);//返回查询结果
});

async function queryTable(name) {
    const projectId = 'boxwood-tree-383908'; //your-project-id
    const bigquery = new BigQuery({ projectId }); //创建一个 BigQuery 实例
    //之前用到的查询语句
    const query = `SELECT phoneNo FROM \`boxwood-tree-383908.mydataset1.employees\` WHERE name = "${name}"`;
    console.debug(`query=${query}`)

    //结果返回在一个数组中
    const [rows] = await bigquery.query(query);
    console.log(`Rows returned: ${rows.length}`);//输出数组长度到日志中
    console.log(rows);//输出数组内容到日志中
    return rows[0]["phoneNo"];
}
