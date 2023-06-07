const functions = require('@google-cloud/functions-framework');

functions.cloudEvent('helloGCS', async (cloudEvent) => {
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