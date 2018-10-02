const gulp = require('gulp');
const dss  = require('./');


gulp.task('default', () => {
  return gulp.src('./example/*')
    .pipe(dss())
    .pipe(gulp.dest('./docs/'));
});

