var express = require('express');
var path = require('path');
var app = express();
var merge = require('./merge.js');
var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use('/static', express.static(path.join(__dirname, 'public')))

app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'index.html')));

app.post('/', (req, res) => {
    var mergedContacts = merge.processData(req.body.data.trim())
    /* Format contacts into appropriate json for the list view */
    var tree = formatData(mergedContacts);
    res.send(tree);
});

formatData = (mergedContacts) => {
    var tree = [];
    mergedContacts.forEach(function (element) {
        console.log(element)
        var node = {
            text: element[0][0],
            nodes: [],
            state: {
                checked: false,
                expanded: false,
                selected: false
            },
            tags: [element.length],
        };
        element.forEach(function (childElement) {
            var childNode = {
                icon: "glyphicon glyphicon-user",
                text: childElement[0] + '  [' + childElement[1] + ']'
            }
            node.nodes.push(childNode);
        });
        tree.push(node);
    });
    return tree;
}

module.exports.listen = () => app.listen(3000, () => console.log('app is listening on port 3000!'));