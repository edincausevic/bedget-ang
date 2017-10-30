var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    sass = require('gulp-sass'),
    plumber = require('gulp-plumber'), // error will not stop watch
    connect = require('gulp-connect'), // livereload
    prefix = require('gulp-autoprefixer'), // prefix css
	concat = require('gulp-concat');

// Styles Task - SASS/SCSS
// Uglifies
gulp.task('styles', function(){

  gulp.src('app/styles/styles.scss')
      .pipe(plumber())
      .pipe(sass({outputStyle: 'compressed'})) 
      .pipe(prefix('last 2 versions')) 
      .pipe(gulp.dest('app/css'))
      .pipe(connect.reload());
});

// Script task
gulp.task('scripts', function(){
	
	gulp.src(['node_modules/angular/angular.js', 'app/app.js', 'app/scripts/**/*.js'])
		.pipe(plumber())
		.pipe(concat('app.min.js'))
		//.pipe(uglify())
    	.pipe(gulp.dest('app/js'))
		.pipe(connect.reload());
});

// page change
gulp.task('pageChange', function(){
	gulp.src('app/*.html')
	    .pipe(connect.reload());
});

// livereload
// to see page go to: http://localhost:8080/
gulp.task('connect', function() {
    connect.server({
        livereload: true
    });
});

// Watch Task
// Watches JS
gulp.task('watch', function(){

  gulp.watch('app/index.html', ['pageChange']);
  gulp.watch('app/scripts/**/*.js', ['scripts']);
  gulp.watch('app/styles/**/*.scss', ['styles']);
});

// run by typing: gulp
gulp.task('default', ['styles', 'scripts', 'pageChange', 'watch', 'connect']);





