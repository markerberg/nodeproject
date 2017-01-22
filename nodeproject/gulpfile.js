var gulp = require('gulp');
var jshint = require('gulp-jshint');
var nodemon = require('gulp-nodemon');

var jsFiles = ['*.js', 'src/**/*.js'];//loof for all js files, in src and all ending with .js

gulp.task('style', function(){
    return gulp.src(jsFiles)
        .pipe(jshint());
});

gulp.task('inject', function(){
   var wiredep = require('wiredep').stream;
   var inject = require('gulp-inject');
   
   //tell inject where to find files, we use an array to look for all css and js files inside public dir
   var injectSrc = gulp.src(['./public/css/*.css','./public/js/*.js']);
   
   //similar to options below, we just need an ignorepath
   var injectOptions = {
       ignorePath: '/public'
   };
   
   var options = { //this is what we pass to wiredep so it knows what to do
        bowerJson: require('./bower.json'),//it looks for our bower file, so we give it its path
        directory: './bower_components',//we must tell wiredep where dependencies are after it reads our bower.json to look for it
        ignorePath: '../../bower_components'//tells wiredep that this index.html prefix needs to go away, under bower:css
    }
   
   return gulp.src('./src/views/*.html')//target all html file
        .pipe(wiredep(options))//pipe to wiredep with options
        .pipe(inject(injectSrc, injectOptions))
        .pipe(gulp.dest('./src/views'));//then pipe it back into views
});

//the array will hold the other tasks to be run before we 'serve' and server runs
gulp.task('serve', ['style', 'inject'], function(){
    var options = {
        script: 'app.js', //which script to run when server starts
        delayTime: 1, //1 second delay
        watch: jsFiles//all js files to be watched, and server restarts if any change
    }
    return nodemon(options) //we execute options, to restart
    .on('restart', function(env){//event listener .on for restart
        console.log('We restarted...')//when restart is fired, we just log to console
    })
});