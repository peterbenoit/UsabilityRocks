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
    SASS: 'src/scss/',
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

gulp.task( 'compilesass', function() {
    return gulp.src( COMPILE.SASS )
    // .pipe( sourcemaps.init() )
    // .pipe( sass({outputStyle: 'compressed'})
    .pipe( sass({outputStyle: 'expanded'})
    .on( 'error', sass.logError ) )
    // .pipe( sourcemaps.write() )
    .pipe(gulp.dest('./src/css'))
    .pipe( livereload() );
} );

gulp.task( 'app', function() {
    return gulp.src( COMPILE.SASS + 'app.scss' )
    // .pipe( sourcemaps.init() )
    // .pipe( sass({outputStyle: 'compressed'})
    .pipe( sass({outputStyle: 'expanded'})
    .on( 'error', sass.logError ) )
    // .pipe( sourcemaps.write() )
    .pipe(gulp.dest('./src/css'))
    .pipe( livereload() );
} );

gulp.task( 'docs', function() {
    return gulp.src( COMPILE.SASS + 'docs.scss' )
    // .pipe( sourcemaps.init() )
    // .pipe( sass({outputStyle: 'compressed'})
    .pipe( sass({outputStyle: 'expanded'})
    .on( 'error', sass.logError ) )
    // .pipe( sourcemaps.write() )
    .pipe(gulp.dest('./src/css'))
    .pipe( livereload() );
} );

gulp.task( 'autoprefixer', ['app', 'docs'], function () {
    var postcss      = require('gulp-postcss');
    var autoprefixer = require('autoprefixer');

    return gulp.src('./src/css/*.css')
        .pipe(sourcemaps.init())
        .pipe(postcss([ autoprefixer() ]))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('./dist/css'));
} );

gulp.task( 'sass', ['app','docs','autoprefixer'] );

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