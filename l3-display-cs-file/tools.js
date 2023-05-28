const { Storage } = require('@google-cloud/storage'); //导入Storage类

module.exports = {
	readFileFromGCS, validateCsvFile
};

//此方法用于从GCS中读取一个文件的内容
async function readFileFromGCS(bucket, fileName) {
	const storage = new Storage(); //实例化Storage类，生成一个对象
	//设置文件信息
	const file = storage.bucket(bucket).file(fileName); //使用用storage对象的方法
	//读取文件内容
	const contents = await file.download();
	//将文件内容输出到日志
	console.log(contents.toString());

	return contents;
}

function validateCsvFile(contents, expectedColumns) {
	const lines = contents.toString().split('\n');
    const lineCount = lines.length;

    let isValid = true;
    for (let i = 0; i < lineCount; i++) {
      const columns = lines[i].split(',');

      if (columns.length !== expectedColumns) {
        console.error(`Line ${i + 1} does not have ${expectedColumns} columns.`);
        isValid = false;
		break;
      }
    }

    return isValid;

}