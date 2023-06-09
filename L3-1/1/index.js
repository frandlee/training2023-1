const functions = require('@google-cloud/functions-framework');

// 此行使用 Functions Framework 注册了一个名为 helloGCS 的 CloudEvent 回调函数。
// 当有文件上传到Cloud Storage时，将执行此函数。
functions.cloudEvent('helloGCS', cloudEvent => {
  console.log(`Event ID: ${cloudEvent.id}`);
  console.log(`Event Type: ${cloudEvent.type}`);

  const file = cloudEvent.data;
  console.log(`Bucket: ${file.bucket}`);
  console.log(`File: ${file.name}`);
  console.log(`Metageneration: ${file.metageneration}`);
  console.log(`Created: ${file.timeCreated}`);
  console.log(`Updated: ${file.updated}`);
});

