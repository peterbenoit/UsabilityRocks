var gulp = require( 'gulp' ),
    nunjucks = require( 'gulp-nunjucks' ),
    sass = require( 'gulp-sass' ),
    sourcemaps = require( 'gulp-sourcemaps' ),
    minify = require( 'gulp-minify' ),
    jshint = require('jshint'),
    livereload = require('gulp-livereload'),
    watch = require( 'gulp-watch' ),
    nodemon = require('gulp-nodemon'),
    htmlbeautify = require('gulp-html-beautify'),
    trimlines = require('gulp-trimlines');

var COMPILE = {
    ALL: 'src/**',
    SRC: 'src/**/*.html',
    DEST: 'dist',
    SASS: 'src/scss/*.scss',
    JS: 'src/js/*.js'
};

gulp.task( 'trim', function() {
    return gulp.src( 'src/**/*.njk' )
      .pipe(trimlines({leading: false}))
      .pipe(gulp.dest( './src/' ));
} );

gulp.task( 'render', function() {
    return gulp.src( COMPILE.SRC )
    .pipe( nunjucks.compile() )
    .pipe( gulp.dest( COMPILE.DEST ) )
    .pipe( livereload() );
} );

gulp.task( 'sass', function() {
    return gulp.src( COMPILE.SASS )
    .pipe( sourcemaps.init() )
    .pipe( sass().on( 'error', sass.logError ) )
    .pipe( sourcemaps.write() )
    .pipe( gulp.dest( COMPILE.DEST + '/css' ) )
    .pipe( livereload() );
} );

gulp.task( 'minify', function() {
    return gulp.src( COMPILE.JS )
    .pipe( minify() )
    .pipe( gulp.dest( COMPILE.DEST + '/js' ) )
    .pipe( livereload() );
} );

gulp.task( 'watch', ['default'], function() {
    livereload.listen();
    gulp.watch( COMPILE.ALL, ['default'] );
} );

gulp.task( 'copy', function() {
    gulp.src( ['src/assets/**'] )
    .pipe( gulp.dest('dist/assets') );
    gulp.src( ['src/contrib/**'] )
    .pipe( gulp.dest('dist/contrib') );
    gulp.src( ['src/demos/**'] )
    .pipe( gulp.dest('dist/demos') );
} );

gulp.task('beautify', function() {
    var options = {
        "indent_with_tabs": true,
        "brace_style": "expand",
        "break_chained_methods": true,
        "indent_size": 4,
        "indent_char": " ",
        "eol": "\n",
        "indent_level": 0,
    };
    gulp.src( './src/**/*.html' )
      .pipe( htmlbeautify( options ) )
      .pipe( gulp.dest( './src/' ) );
} );

gulp.task('server',function(){
    nodemon({
        'script': 'app.js',
        'ignore': 'dist/js/*.js'
    });
});

gulp.task( 'serve', ['server','watch'] );

gulp.task( 'default', ['render', 'sass', 'minify', 'copy'] );