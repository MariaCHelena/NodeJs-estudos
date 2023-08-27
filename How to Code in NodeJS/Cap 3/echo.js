const args = process.argv.slice(2);
let variables = [];
for (const arg of args) {
	let envVar = process.env[arg];
	if (envVar === undefined){
		console.error(`Could not find "${arg}" in environment`);
		break;
	} else {
		variables.push(envVar);
	}
};
if (args.length == variables.length){
	for (const variable of variables) {
		console.log(variable);
	}
}
