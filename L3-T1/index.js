const functions = require('@google-cloud/functions-framework');
const { readFileFromGCS, validateCsvFile } = require("./tools");

// 此行使用 Functions Framework 注册了一个名为 helloPubSub 的 CloudEvent 回调函数。
// 当 Pub/Sub 触发器主题接收到消息时，将执行此函数。
functions.cloudEvent('helloPubSub', async (cloudEvent) => {
	let data = cloudEvent.data.message.data;
	//消息数据已经进行了 Base64 编码，所以需要解码成明文并赋于变量data
	data = Buffer.from(data, 'base64');
	//把data解析为一个JSON对象
	data = JSON.parse(data);
	//获取存储桶和文件的信息
	let bucket = data["bucket"];
	let fileName = data["name"];

	// 1. check if it is a csv file
	if (!fileName.endsWith(".csv")) {
		console.log(`1. The file ${fileName} is not a csv file.`);
		return;
	}

	//调用读取文件内容的方法
	let fileContent = await readFileFromGCS(bucket, fileName);

	// 2. get the number of lines in the file
	const lineCount = fileContent.toString().split('\n').length;
	console.log(`1. The file ${fileName} has ${lineCount} lines.`);

	// 3. check if the number of columns is correct
	let expectedColumns = process.env.EXPECTED_COLUMNS;
	expectedColumns = parseInt(expectedColumns);
	console.log("expectedColumns: " + expectedColumns);
	let isValid = validateCsvFile(fileContent, expectedColumns);
	console.log(`2. The file ${fileName} is ${isValid ? 'valid' : 'invalid'}.`);

});
