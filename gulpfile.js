var gulp = require( 'gulp' ),
    nunjucks = require( 'gulp-nunjucks' ),
    sass = require( 'gulp-sass' ),
    sourcemaps = require( 'gulp-sourcemaps' ),
    minify = require( 'gulp-minify' ),
    watch = require( 'gulp-watch' );

var COMPILE = {
    ALL: 'src/**',
    SRC: 'src/**.html',
    DEST: 'dist',
    SASS: 'src/scss/*.scss',
    JS: 'src/js/*.js'
};

gulp.task( 'render', function() {
    return gulp.src( COMPILE.SRC )
    .pipe( nunjucks.compile() )
    .pipe( gulp.dest( COMPILE.DEST ) );
} );

gulp.task( 'sass', function() {
    return gulp.src( COMPILE.SASS )
    .pipe( sourcemaps.init() ) 
    .pipe( sass().on( 'error', sass.logError ) )
    .pipe( sourcemaps.write() )
    .pipe( gulp.dest( COMPILE.DEST + '/css' ) );
} );

gulp.task( 'minify', function() {
    return gulp.src( COMPILE.JS )
    .pipe( minify() ) 
    .pipe( gulp.dest( COMPILE.DEST + '/js' ) );
} );

gulp.task( 'stream', ['default'], function() {
    gulp.watch( COMPILE.ALL, ['default'] );
} );

gulp.task( 'copy', function() {
    gulp.src(['src/assets/**']).pipe(gulp.dest('dist/assets'));
} );


gulp.task( 'default', ['render', 'sass', 'minify', 'copy'] );