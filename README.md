# gulp-dss

A gulp plugin to build UI documentation with the DSS parser + handlebars.

## Installation

```sh
$ npm i --save-dev git+https://github.com/sfi0zy/gulp-dss.git
```

## Usage

```javascript
var gulp = require('gulp'),
    dss  = require('gulp-dss'),

    parsers = {
        link: function( i, line, block ) {
            var exp = /(b(https?|ftp|file)://[-A-Z0-9+&@#/%?=~_|!:,.;]*[-A-Z0-9+&@#/%=~_|])/ig;
            line.replace(exp, "<a href='$1'>$1</a>");
            return line;
        }
    };


gulp.task('dss', function() {
    return gulp.src('./src/**/*.css')
        .pipe(dss({
            // index.handlebars will be used as template
            template: './src/dss',
            parsers: parsers,
            outputPath: './docs'
        }))
        .pipe(gulp.dest('./docs/'));
});
```

**DSS** Supports CSS, LESS, STYLUS, SASS and SCSS comment block syntax.

