$( function() {
	$( document.body ).toggleClass( 'no-js js' ); 
} );

window.onresize = handleOnEvents;
window.onload = handleOnEvents;

var vps = ['xs','sm','md','lg','xl','xxl'],
	vp = '',
	idx = 0;

function handleOnEvents() {
	vp = getViewport( 'body', 'before' );
	idx = vps.indexOf( vp );
	
	// VP by index
	if( idx < 3 ) {
		
	}
		
	// or VP by name
// 	if ( vp === 'xs' ) {
	
// 	} else if ( vp === 'sm' ) {
	
// 	} else if ( vp === 'md' ) {
	
// 	} else if ( vp === 'lg' ) {
	
// 	} else if ( vp === 'xl' ) {
	
// 	} else if ( vp === 'xxl' ) {
		
// 	} else {
	
// 	}
}


function getViewport( element, pseudo ) {
	return window
		.getComputedStyle( document.querySelector( element ), ':' + pseudo )
		.getPropertyValue( 'content' )
		.replace( /\"/g, '' )
		.replace( /\'/g, '' );
}