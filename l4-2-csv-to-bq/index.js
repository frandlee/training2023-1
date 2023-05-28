const functions = require('@google-cloud/functions-framework');

const { loadFileFromGCSToBQ } = require("./tools");


// 此行使用 Functions Framework 注册了一个名为 helloPubSub 的 CloudEvent 回调函数。
// 当 Pub/Sub 触发器主题接收到消息时，将执行此函数。
functions.cloudEvent('loadCsvIntoBQ', async (cloudEvent) => {
  let data = cloudEvent.data.message.data;
  //消息数据已经进行了 Base64 编码，所以需要解码成明文并赋于变量data
  data = Buffer.from(data, 'base64');
  //把data解析为一个JSON对象
  data = JSON.parse(data);

  //获取存储桶和文件的信息
  let bucket = data["bucket"];
  let fileName = data["name"];
  console.log(`bucket:${bucket}, fileName:${fileName}`);

  // load file from GCP to BQ
  await loadFileFromGCSToBQ(bucket, fileName);

});


