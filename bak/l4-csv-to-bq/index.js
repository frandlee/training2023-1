const functions = require('@google-cloud/functions-framework');
const { Storage } = require('@google-cloud/storage'); //导入Storage类
const { BigQuery } = require('@google-cloud/bigquery'); //导入 BigQuery 类

// 此行使用 Functions Framework 注册了一个名为 helloPubSub 的 CloudEvent 回调函数。
// 当 Pub/Sub 触发器主题接收到消息时，将执行此函数。
functions.cloudEvent('helloPubSub', async(cloudEvent) => {
  let data = cloudEvent.data.message.data;
  //消息数据已经进行了 Base64 编码，所以需要解码成明文并赋于变量data
  data = Buffer.from(data, 'base64');
  //把data解析为一个JSON对象
  data = JSON.parse(data);
  //获取存储桶和文件的信息
  let bucket = data["bucket"];
  let fileName = data["name"];

  //Read from ENV
  let datasetId = process.env.DATASET_ID;
  let tableId = process.env.TABLE_ID;
  let location = process.env.LOCATION;

  //调用读取文件内容的方法
  await loadCSVFromGCS(bucket, fileName, datasetId, tableId, location);
});

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
