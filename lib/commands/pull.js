var path = require('path');
var shell = require('../shell-utils');
var repeater = require('../repeater');

module.exports = function(args, callback){
    callback = callback || function(){};

    var command = function(moduleName, moduleRepo, done){
        var isModule = !!moduleName;
        moduleName = moduleName || 'main';
        var moduleLocation = isModule? path.join('modules/', moduleName) : '.';

        console.info(('pulling from module: ' + moduleName).action);

        isModule && cd('modules/'+moduleName);

        var errors = shell.run('git pull');

        if(errors.legth > 0){
            console.error('something nasty went wrong here'.error);
            process.exit(1);
        }

        isModule && cd('../..');
        console.info(('pulled latest changes for ' + moduleName).success);
        done();
    };

    repeater(command, callback);
};

