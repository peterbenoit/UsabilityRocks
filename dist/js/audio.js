/**
 * @fileOverview Bootstrap 4 Audio Plugin
 * @version 0.3
 * @author Peter Benoit <idk1@cdc.gov> 
*/
;(function ( $, window, document, undefined ) {
	'use strict';
    var pluginName = "audioly",
        defaults = {
			element: ''
        };
	
    function CDCPlugin( element, options ) {
        this.element = element;
        this.options = $.extend( {}, defaults, options) ;
        this._defaults = defaults;
        this._name = pluginName;
	    this.init();
    }
	
    CDCPlugin.prototype = {
        init: function() {
			var defaults = this._defaults;
			
			defaults.this = this;
			defaults.element = this.element;
			
			defaults.status = 0;
			
			this.bindControls();
			
			$( '.progress' ).css( 'width', $( '.audio-player' ).width() + 'px' );
			
			
			defaults.element.addEventListener( 'timeupdate', function() {
				var currentTime = defaults.element.currentTime,
					duration = defaults.element.duration,
					percentage = ( currentTime + .25 ) / duration * 100;
				
				$( '.progress-bar' ).css( 'width', percentage + '%' ).attr( 'aria-valuenow', percentage );
				
				// $('.hp_range').stop(true,true).animate({'width':(currentTime +.25)/duration*100+'%'},250,'linear');
			} );

		},
		bindControls: function() {
			$( '.btn-play' ).on( 'click', function(){
				defaults.this.play();
			} );
			$( '.btn-stop' ).on( 'click', function() { 
				defaults.this.stop();
			} );
			$( '.btn-restart' ).on( 'click', function() { 
				defaults.this.goto( 0 );
			} );
			$( '.btn-back-5' ).on( 'click', function() { 
				defaults.this.goto( defaults.element.currentTime - 5 );
			} );
			$( '.btn-forward-5' ).on( 'click', function() { 
				defaults.this.goto( defaults.element.currentTime + 5 );
			} );
			$( '.btn-back-1' ).on( 'click', function() { 
				defaults.this.goto( defaults.element.currentTime - 1 );
			} );
			$( '.btn-forward-1' ).on( 'click', function() { 
				defaults.this.goto( defaults.element.currentTime + 1 );
			} );
			$( '.btn-volume-up' ).on( 'click', function() { 
				defaults.this.volume( 'up' );
			} );	
			$( '.btn-volume-down' ).on( 'click', function() { 
				defaults.this.volume( 'down' );
			} );
		},
		play: function(){
			if ( defaults.status == 0 || defaults.status == 2 ) {
				defaults.element.play();
				$( '.btn-play span' ).attr( 'class', 'fa fa-pause aligned' );
				defaults.status = 1;
			} else if ( defaults.status == 1 ) {
				defaults.element.pause();
				$( '.btn-play span' ).attr( 'class', 'fa fa-play aligned' );
				defaults.status = 2;
			}			
		},
		stop: function(){
			defaults.element.pause();
			defaults.this.goto( 0 );
			$( '.btn-play span' ).attr( 'class', 'fa fa-play aligned' );
			defaults.status = 0;			
		},
		goto: function( time ){
			defaults.element.currentTime = time;
		},
		volume: function( direction ){
			var volume = defaults.element.volume;
			if ( direction == 'up' ) {
				if ( Math.round( 10 * volume ) / 10 >= 1 ) {
					defaults.element.volume = 1;
				} else {
					defaults.element.volume += 0.1;					
				}
			} else {
				if ( Math.round( 10 * volume ) / 10 <= 0 ) {
					defaults.element.volume = 0;
				} else {
					defaults.element.volume -= 0.1;
				}
			}
		}
    };

	// don't let the plugin load multiple times
    $.fn[ pluginName ] = function( options ) {
    	return this.each( function() {
    		if ( !$.data( this, "plugin_" + pluginName ) ) {
    			$.data( this, "plugin_" + pluginName, new CDCPlugin( this, options ) );
    		}
    	} );
    };
})( jQuery, window, document );


if( jQuery().audioly ) {
	$( 'audio' ).audioly();
} else {
	if ( console.error ) {
		console.error( 'The Bootstrap 4 Audio plugin is required.' );	
	} else {
		console.log( 'The Bootstrap 4 Audio plugin is required.' );
	}
}



// function VolumeUp( music, id ) {
// 	var audio = $( '#' + id );
// 	var volume = $( '#' + id ).prop( 'volume' ) + 0.1;
// 	if ( volume > 1 ) volume = 1;
// 	$( '#' + id ).prop( 'volume', volume );
// }

// function VolumeDown( music, id ) {
// 	var audio = $( '#' + id );
// 	var volume = $( '#' + id ).prop( 'volume' ) - 0.1;
// 	if ( volume < 0 ) volume = 0;
// 	$( '#' + id ).prop( 'volume', volume );
// }
