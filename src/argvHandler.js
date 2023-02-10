let data = require('../data').data;

function filterAnimals(data, filter) {
	return data.filter(country => {
		country.people = country.people.filter(onePerson => {
			onePerson.animals = onePerson.animals.filter(animal => animal.name.includes(filter));

			return onePerson.animals.length > 0;
		});

		return country.people.length > 0;
	});
}

function countAnimals(data) {
	return data.map(({ name, people }) => ({
    name: `${name} [${people.length}]`,
    people: people.map(({ name, animals }) => ({ name: `${name} [${animals.length}]`, animals}))
}));
}

function argvProcess(argv) {
	let dataResponse = structuredClone(data);

	if (!argv.startsWith('--filter=') && argv !== '--count') throw 'Wrong parameter';

	if (argv.startsWith('--filter=')) {
		const filter = argv.split('=')[1];
		dataResponse = filterAnimals(dataResponse, filter);

		return dataResponse.length > 0 ? JSON.stringify(dataResponse, null, 2) : 'Nothing found';
	}
	
	dataResponse = countAnimals(dataResponse);

	return JSON.stringify(dataResponse, null, 2);
};

module.exports.argvHandler = { filterAnimals, countAnimals, argvProcess }