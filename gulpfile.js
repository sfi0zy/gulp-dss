'use strict'

var gulp = require('gulp')
var dss = require('./')

gulp.task('default', function() {

  return gulp.src('./example/*')
    .pipe(dss())
    .pipe(gulp.dest('./docs/'))

})

