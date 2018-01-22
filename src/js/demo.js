$( function() { 
    $( '.dot' ).each( function( i ) {
        $( this ).text( i + 1 ).parent().addClass( 'borderriffic' );
    } );    
} );

$( window ).on( "load resize", _.throttle( function( e ) {
    $( '.grid-demo div[class^="col"]' ).each( function() { 
        var t = $( this );
        t.text ( t.width() );
    } );
}, 100 ) );