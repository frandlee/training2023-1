const { BigQuery } = require('@google-cloud/bigquery'); //导入 BigQuery 类

module.exports = {
	DBAdd, DBDelete, DBUpdate, DBQuery
};

const projectId = 'boxwood-tree-383908'; //your-project-id
const datasetId = 'mydataset1'; //your-dataset-id
const tableId = 'employees'; //your-table-id

const fullBQPath = `${projectId}.${datasetId}.${tableId}`; //your-table-full-path
const bigquery = new BigQuery({ projectId }); //创建一个 BigQuery 实例

async function DBAdd(id, name, phoneNo, department) {
    
    //之前用到的查询语句
    const insert = `insert into ${fullBQPath} (id, name, phoneNo, department) values (${id}, '${name}', '${phoneNo}', '${department}')`;
    console.debug(`insert=${insert}`)

    //结果返回在一个数组中
    const result = await bigquery.query(insert);
    console.debug(`result=${result}`);
    return result;
}

async function DBDelete(id) {
    const delete_ = `delete from ${fullBQPath} where id=${id}`;
    console.debug(`delete=${delete_}`)

    const result = await bigquery.query(delete_);
    console.debug(`result=${result}`);
    return result;
}   

async function DBUpdate(id, name, phoneNo, department) {        
    const update = `update ${fullBQPath} set name='${name}', phoneNo='${phoneNo}', department='${department}' where id=${id}`;
    console.debug(`update=${update}`)

    const result = await bigquery.query(update);
    console.debug(`result=${result}`);
    return result;
}   

async function DBQuery(id) {    
    const query = `select * from ${fullBQPath} where id=${id}`;
    console.debug(`query=${query}`)

    const result = await bigquery.query(query);

    console.debug(`result=${result}`);

    return result;
}
