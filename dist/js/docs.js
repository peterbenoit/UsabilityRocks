var path = window.location.pathname.split( '/' ).pop();

$( '.nav a' ).each( function() {
	var href = $( this ).attr( 'href' );
	if ( path.substring( 0, href.length ) === href ) {
		$( this ).closest( 'li' ).addClass( 'active' );
	}
} );

$( '.buttons a' ).on( 'click', function() {
	var h = $( this ).attr( 'href' );
	$( this ).parent().next( 'iframe' ).css( 'width', h );
	return false;
} );

$( function() {
	var nav = '';
	var el, title, link, name, val, curval = 0;

	$( 'h2:not(.demo), h3:not(.demo)' ).each( function( i, t ) {
		el = $( this );
		title = el.text();
		link = '#' + el.attr( 'id' );
		name = el.prop( 'nodeName' ).toLowerCase();
		val = name.substr( name.length - 1 );
		nav += '<li class="toc-entry toc-' + name + '">' + '<a href=' + link + '>' + title + '</a>' + '</li>';
		curval = val;
	} );

	$( '#sectionnav ul' ).prepend( nav );
	// the hash is built into the page after page load, so run it after the section nav is built
	var hash = window.location.hash.substr( 1 );
	if ( hash.length > 0 ) {
		document.getElementById( hash ).scrollIntoView();
	}

	$( 'iframe' ).each( function( i, t ) {
		var a = document.createElement( 'a' );
		a.text = " Full ";
		a.href = t.src;
		a.target = "_blank";
		a.style = "padding: 10px";
		a.className += "rounded-top-right col";
		$( t ).prev().append( a );
	} );

	$( '.dot' ).each( function( i ) {
		$( this ).text( i + 1 ).parent().addClass( 'borderriffic' );
	} );

	$( '.bd-example:not(.prism-ignore)' ).each( function() {
		var $t = $( this ),
			html = $t.html();

		if ( html.trim().length > 0 ) {
			$t.after( '<pre class="language-html"><code>' + $('<div/>').text( html ).html() + '</code></pre>' );
		}
	} );
	//-line-numbers
	$( '.bd-example' ).promise().done( function() {
		Prism.highlightAll();
	} );

	$( '.markup textarea' ).each( function(){
		var t = $(this);

		t.after( '<pre class="language-html"><code>' + $('<div/>').text( t.val() ).html() + '</code></pre>' ).hide();
	} );

	$( '.markup textarea' ).promise().done( function() {
		Prism.highlightAll();
	} );

	var i = 0;
	$( '.migration textarea' ).each( function(){
		var t = $(this);

		if ( i % 2 ) {
			t.after( '<div class="bd-example">' + t.val() + '</div>' );
		}

		t.after( '<pre class="language-html"><code>' + $('<div/>').text( t.val() ).html() + '</code></pre>' ).hide();
		i++;
	} );

	$( '.migration textarea' ).promise().done( function() {
		Prism.highlightAll();
	} );

	var url = window.location.pathname,
		target = $( "a[href='" + url.substring( url.lastIndexOf( '/' ) + 1 ) + "']" );

	if ( location.hostname === '127.0.0.1' || location.hostname === 'localhost' ) {}

	if ( target.length > 0 ) {
		target.closest( '.bd-toc-item' ).addClass( 'active' );
	}

	var $dropdown = $( '.dropdown' ),
		activemenu = $dropdown.find( '.dropdown-menu .active' ),
		selectedrop = $dropdown.find( '[data-toggle="dropdown"]' );
	if ( activemenu.length ) {
		selectedrop.text( activemenu.text() );
	}
	// makeSVG();
} );

function makeSVG() {
	var styles = '';
	$( '.icon-grid img[src$=".svg"]' ).each( function( i ) {
		var $img = $( this ),
			$parent = $img.parent(),
			imgURL = $img.attr( 'src' ),
			attributes = $img.prop( 'attributes' ),
			svg,
			title = $img.attr( 'alt' );
		$.get( {
			url: imgURL,
			cache: false
		} ).then( function( data ) {
			// Get the SVG tag, ignore the rest
			$svg = $( data ).find( 'svg' );
			// Remove any invalid XML tags
			$svg = $svg.removeAttr( 'xmlns:a' );
			// Loop through IMG attributes and apply on SVG
			// $.each( attributes, function() {
			// 	$svg.attr( this.name, this.value );
			// } );
			// Replace IMG with SVG
			$img.replaceWith( $svg );

			$parent.append('<p>'+title+'</p>');
		}, 'xml' );
	} );
	$( '#fg' ).show().spectrum( {
		showPaletteOnly: true,
		togglePaletteOnly: true,
		preferredFormat: "hex",
		color: "#005eaa",
		showPalette: true,
		palette: [ [ '#ffffff', '#000000', '#333', '#555', '#bdbdbd', '#e0e0e0', '#f0f0f0', '#f5f5f5', "#005eaa", "#88c3ea", "#c0e9ff", "#712177", '#b890bb', '#e3d3e4', '#00695c', '#4ebaaa', '#ceece7', '#bb4d00', '#ffad42', '#ffe97d' ] ],
		move: function( color ) {
			$( 'head' ).append( '<style type="text/css"></style>' );
			var ns1 = $( 'head' ).children( ':last' );
			ns1.html( '.fill-p{fill: ' + color.toHexString() + '!important; }' );
		}
	} );
	$( '#bg' ).show().spectrum( {
		showPaletteOnly: true,
		togglePaletteOnly: true,
		preferredFormat: "hex",
		color: "#f0f0f0",
		showPalette: true,
		palette: [ [ '#ffffff', '#000000', '#333', '#555', '#bdbdbd', '#e0e0e0', '#f0f0f0', '#f5f5f5', "#005eaa", "#88c3ea", "#c0e9ff", "#712177", '#b890bb', '#e3d3e4', '#00695c', '#4ebaaa', '#ceece7', '#bb4d00', '#ffad42', '#ffe97d' ] ],
		move: function( color ) {
			$( 'head' ).append( '<style type="text/css"></style>' );
			var ns2 = $( 'head' ).children( ':last' );
			ns2.html( '.icon-grid img, .icon-grid svg { background: ' + color.toHexString() + '!important; }' );
		}
	} );
}
$( window ).on( 'load resize scroll', function( e ) {
	var $std = $( '#standard' );
	if ( $std.length ) {
		var top = $std.offset().top,
			right = $std.outerWidth() + $std.offset().left;
		$( '.ctrl' ).css( {
			top: top,
			left: right
		} );
	}
} );

var client = algoliasearch( "G2FUZ82WJ6", "6ed2ed9a83a0bd747f2986aa04722cb0" );
var docs_search = client.initIndex( 'docs_search' );

autocomplete( '#aa-search-input', {}, [
	{
		source: autocomplete.sources.hits( docs_search, {
			hitsPerPage: 3
		} ),
		displayKey: 'page_name',
		templates: {
			header: '<div class="aa-suggestions-category">Pages</div>',
			suggestion: function( suggestion ) {
				return '<span><a href="' + suggestion.page_url + '">' + suggestion._highlightResult.page_name.value + '</a></span>';
			}
		}
    }
] );

function searchCallback( err, content ) {
	if ( err ) {
		console.error( err );
		return;
	}
	var retval = '';
	for ( i = 0; i < content.hits.length; i++ ) {
		retval += '<li><a href="' + content.hits[ i ].page_url + '">' + content.hits[ i ].page_name + '</a></li>';
	}
	$( '#search-results' ).html( retval );
}
var sortdir = 'desc';

function iconsort() {
	var mylist = $( '.icon-grid' ),
		listitems = mylist.children( 'div' ).children( 'svg' ).get();
	if ( sortdir === 'asc' ) {
		listitems.sort( function( a, b ) {
			return $( b ).find( 'title' ).text().trim().toUpperCase().localeCompare( $( a ).find( 'title' ).text().trim().toUpperCase() );
		} );
		sortdir = 'desc';
	} else {
		listitems.sort( function( a, b ) {
			return $( a ).find( 'title' ).text().trim().toUpperCase().localeCompare( $( b ).find( 'title' ).text().trim().toUpperCase() );
		} );
		sortdir = 'asc';
	}
	mylist.empty();
	$.each( listitems, function( idx, item ) {
		mylist.append( item );
	} );
	$( '.icon-grid svg' ).each( function( i, t ) {
		$( t ).wrap( '<div>' ).after( '<p>' + $( t ).find( 'title' ).text().trim() + '</p>' );
	} );
}
var iconwidth = 80;

function iconsize( dir ) {
	var size;
	if ( dir === 'plus' ) {
		size = ( iconwidth += 2 ) + 'px';
	} else if ( dir === 'minus' ) {
		size = ( iconwidth -= 2 ) + 'px';
	} else {
		iconwidth = 80;
		size = '80px';
	}
	$( '.icon-grid img, .icon-grid svg' ).css( {
		'width': size,
		'height': size
	} );
}