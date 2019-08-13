const fs = require('fs');
const path = require('path');

fs.readdirSync(__dirname)
    .filter(name => path.extname(name) === '.json')
    .forEach(name => {
        module.exports[name.substr(0, name.length - 5)] = require('./' + name)
    })
