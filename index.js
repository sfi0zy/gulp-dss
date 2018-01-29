var dss        = require('dss'),
    fs         = require('fs'),
    path       = require('path'),
    copydir    = require('copy-dir'),
    File       = require('gulp-util').File,
    through    = require('through'),
    handlebars = require('handlebars');


module.exports = function(options) {
    options = options || {};

    var styleguide    = [],
        templateIndex = 'index.handlebars',
        templatePath  = options.templatePath || './template',
        template      = fs.readFileSync(templatePath + '/' + templateIndex, 'utf-8'),
        outputPath    = options.outputPath || './docs';


    for(key in options.parsers) {
        dss.parser(key, options.parsers[key]);
    }


    function process(file) {
        dss.parse(file.contents.toString(), {}, function (parsed) {
            parsed.file = path.relative('.', file.path);
            styleguide.push(parsed);
        });
    }


    function end() {
        var html = handlebars.compile(template)({
            project: JSON.parse(fs.readFileSync('./package.json')),
            files: styleguide
        });

        this.emit('data', new File({
            path: 'index.html',
            contents: new Buffer(html)
        }));

        var assetsDir = templatePath + '/assets';

        if (fs.existsSync(assetsDir)) {
            copydir.sync(assetsDir, outputPath + '/assets');
        }

        this.emit('end');
    }


    return through(process, end);
};

