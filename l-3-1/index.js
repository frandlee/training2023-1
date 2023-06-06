const functions = require('@google-cloud/functions-framework');
const { Storage } = require('@google-cloud/storage'); //导入Storage类

// 此行使用 Functions Framework 注册了一个名为 helloPubSub 的 CloudEvent 回调函数。
// 当 Pub/Sub 触发器主题接收到消息时，将执行此函数。
functions.cloudEvent('helloGCS', async (cloudEvent) => {
	console.log(`Event ID: ${cloudEvent.id}`);
	console.log(`Event Type: ${cloudEvent.type}`);

	const file = cloudEvent.data;
	console.log(`Bucket: ${file.bucket}`);
	console.log(`File: ${file.name}`);
	//调用读取文件内容的方法
	await readFileFromGCS(file.bucket, file.name);
});

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
