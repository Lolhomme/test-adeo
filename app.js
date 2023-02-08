const process = require('process');

const { argvProcess } = require('./src/argvHandler');
let data = require('./data').data;

if (process.argv.length === 2) {
	console.log(JSON.stringify(data, null, 2));
	process.exit();
}

if (process.argv.length >= 4) {
	console.log('Too much arguments');
	process.exit();
}

try {
	const response = argvProcess(process.argv[2]);
	console.log(response);

} catch (error) {
	console.log(error);
}
