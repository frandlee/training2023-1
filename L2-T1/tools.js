const { BigQuery } = require('@google-cloud/bigquery'); //导入 BigQuery 类

module.exports = {
    DBAdd, DBDelete, DBUpdate, DBQuery
};

//eg., ambient-highway-388521.trainingDataset.employees
const projectId = 'ambient-highway-388521'; //your-project-id
const datasetId = 'trainingDataset'; //your-dataset-id
const tableId = 'employees'; //your-table-id
const fullBQPath = `${projectId}.${datasetId}.${tableId}`; //your-table-full-path
console.debug(`fullBQPath=${fullBQPath}`)

const bigquery = new BigQuery({ projectId }); //创建一个 BigQuery 实例

async function DBAdd(id, name, phoneNo, department) {
    //之前用到的查询语句
    const insert = `insert into ${fullBQPath} (id, name, phoneNo, department) values (${id}, '${name}', '${phoneNo}', '${department}')`;
    console.debug(`insert=${insert}`)

    //结果返回在一个数组中
    try {
        const result = await bigquery.query(insert);
        console.debug(`result=${result}`);
        return "Insert Success!";
    } catch (err) {
        return err;
    }
}

async function DBDelete(id) {
    const delete_ = `delete from ${fullBQPath} where id=${id}`;
    console.debug(`delete=${delete_}`)

    try {
        const result = await bigquery.query(delete_);
        console.debug(`result=${result}`);
        return "Delete Success!";
    } catch (err) {
        return err;
    }
}

async function DBUpdate(id, name, phoneNo, department) {
    const update = `update ${fullBQPath} set name='${name}', phoneNo='${phoneNo}', department='${department}' where id=${id}`;
    console.debug(`update=${update}`)
    try {
        const result = await bigquery.query(update);
        console.debug(`result=${result}`);
        return "Update Success!";
    } catch (err) {
        return err;
    }
}

async function DBQuery(id) {
    const query = `select * from ${fullBQPath} where id=${id}`;
    console.debug(`query=${query}`)

    try {
        const result = await bigquery.query(query);
        console.debug(`result=${result}`);

        if (result.length > 0) {
            return JSON.stringify(result)
        } else {
            return "Not Found!";
        }
    } catch (err) {
        return err;
    }
}
