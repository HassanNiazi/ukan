var merge = require('./merge.js');
var fs = require('fs');

//Print result of algorithm in the desired format
print = (resultSet) => {
    for (var index = 0; index < resultSet.length; index++) {
        var output = 'Merged​ ​Set ' + index + ':';
        resultSet[index].forEach(element => {
            output += '[' + element + ']';
        });
        console.log(output);
    }
}

module.exports.processFile = (path) => fs.readFile(path, 'utf8', (err, fileData) => {
    if (err) console.log(err);
    var mergedContacts = merge.processData(fileData.trim())
    print(mergedContacts);
});