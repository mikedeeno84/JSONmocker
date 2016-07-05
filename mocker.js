var Chance = require('chance')
var chanceTypeMap = {
  number: 'floating',
  integer: 'integer',
  string: 'string'
};

// must account for array type and object type of schema


function mocker(schema, totalResults, options, seed) {
	if(!seed) seed = Math.random;
  var properties = Object.keys(schema.properties);
  var chance = new Chance(seed);
  var results = [];
  var currentResult;
  for (var i = 0; i < totalResults; i++) {
    currentResult = {};
    properties.forEach(createProp);
    results.push(currentResult);
  }

  return results;

  function createProp(prop) {
    var currentProperty = schema.properties[prop];
    currentResult[prop] = chance[chanceTypeMap[currentProperty.type]]();
  }

}
module.exports = mocker;

/* example options object,


var options = {
	set: {
		onlyRequired: true
	},
	property: {
		"firstName": {
			chanceTypeOverride: 'name',
		},
		"numKids": {
			chanceOptions : {
				min: 0,
				max: 5
			}
		}
	}
}

set options are options that apply to the entire set, property options apply only to each enumerated property
*/
