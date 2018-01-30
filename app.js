// node app.js

var express = require( 'express' ) ;
var nunjucks = require( 'nunjucks' ) ;
var app = express() ;

app.use( express.static( __dirname + '/dist' ) );

var PATH_TO_TEMPLATES = './dist' ;
nunjucks.configure( PATH_TO_TEMPLATES, {
    autoescape: true,
    express: app
} ) ;

app.get( '/', function( req, res ) {
    return res.render( 'index.html' ) ;
} ) ;
app.listen( 3000 ) ;