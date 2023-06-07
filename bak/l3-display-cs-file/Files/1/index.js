const functions = require('@google-cloud/functions-framework');

//此行使用 Functions Framework 注册了一个名为 helloPubSub 的 CloudEvent 回调函数。
//当 Pub/Sub 触发器主题接收到消息时，将执行此函数。
functions.cloudEvent('L3-display-cs-file', async (cloudEvent) => {
	//先把cloudEvent.data.message.data输出到日志
	console.debug("cloudEvent.data.message.data.toString(): ")
	console.debug(cloudEvent.data.message.data.toString());
	//消息数据已经进行了 Base64 编码，所以需要解码成明文并赋于变量data
	let data = Buffer.from(cloudEvent.data.message.data, 'base64');
	console.debug("data.toString(): ");
	console.debug(data.toString());
});
