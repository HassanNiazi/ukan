var commader = require('commander');
var webApp = require('./web-app.js');
const cmd = require('./cmd.js');

//commander specifications
commader.version('1.0.0')
    .description('Test app for ukan');

commader.command('readFile <path>')
    .alias('rf')
    .description('Read a file from command line')
    .action((path) => cmd.processFile(path));

commader.command('wa')
    .description('run the web app')
    .action(() => webApp.listen());

commader.command('rb')
    .description('run both web and console application for demo purposes')
    .action(() => {
        cmd.processFile('./data/sample_data.txt');
        webApp.listen();
    });

commader.parse(process.argv)