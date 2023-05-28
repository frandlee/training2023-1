const functions = require('@google-cloud/functions-framework');
//const { Storage } = require('@google-cloud/storage'); //导入Storage类
// 此行使用 Functions Framework 注册了一个名为 helloPubSub 的 CloudEvent 回调函数。
// 当 Pub/Sub 触发器主题接收到消息时，将执行此函数。

functions.cloudEvent('cs-all-events', async (cloudEvent) => {
  let message = cloudEvent.data.message;

  let attributes = message.attributes;
  console.log(`attributes: \n${JSON.stringify(attributes)}`);

  let eventType = attributes.eventType;
  console.log(`eventType: ${eventType}`);

  let data = message.data;
  //消息数据已经进行了 Base64 编码，所以需要解码成明文并赋于变量data
  data = Buffer.from(data, 'base64');
  //把data解析为一个JSON对象
  data = JSON.parse(data);
  console.debug(`data: \n${JSON.stringify(data)}`);

  displayEventInfo(eventType, data);

  //调用读取文件内容的方法
  //await readFileFromGCS(bucket, fileName);
});

function displayEventInfo(eventType, data) {
  console.log(`eventType: ${eventType}`);
  console.log(`data: \n${JSON.stringify(data)}`);
  //获取存储桶和文件的信息
  let bucket = data["bucket"];
  console.log(`bucket: ${bucket}`);
  let fileName = data["name"];
  console.log(`fileName: ${fileName}`);
}
/*
//此方法用于从GCS中读取一个文件的内容
async function readFileFromGCS(bucket, fileName) {
  const storage = new Storage(); //实例化Storage类，生成一个对象
  //设置文件信息
  const file = storage.bucket(bucket).file(fileName); //使用用storage对象的方法
  //读取文件内容
  const contents = await file.download();
  //将文件内容输出到日志
  console.log(contents.toString());
}
*/
