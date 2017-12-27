var path = window.location.pathname.split('/').pop();

$( '.nav a' ).each( function() {
	var href = $( this ).attr( 'href' );
	if ( path.substring( 0, href.length ) === href ) {
		$( this ).closest( 'li' ).addClass( 'active' );
	}
} );

$( '.buttons a' ).on( 'click', function() {
	var h = $(this).attr( 'href' );
	$( this ).parent().next( 'iframe' ).css( 'width', h );
	return false;
} );


$( function() {
	var nav = '';
	var el, title, link, name, val, curval = 0;
	// $( ':header:not(h1)' ).each( function( i, t ) {
	$( 'h2:not(.demo), h3:not(.demo)' ).each( function( i, t ) {
		el = $( this );
		title = el.text();
		link = '#' + el.attr( 'id' );
		name = el.prop( 'nodeName' ).toLowerCase();
		val = name.substr( name.length - 1 );
		nav += '<li class="toc-entry toc-' + name + '">' + '<a href=' + link + '>' + title + '</a>' + '</li>';
		curval = val;
	} );
	console.log( 'nav', nav );
	$( '#sectionnav ul' ).prepend( nav );
		
	// the hash is built into the page after page load, so run it after the section nav is built
	var hash = window.location.hash.substr(1);
	if( hash.length > 0 ) {
		document.getElementById( hash ).scrollIntoView();
	}
	
	$( 'iframe' ).each( function( i, t ) {
		var a = document.createElement( 'a' );
		a.text = " Demo ";
		a.href = t.src;
		a.target = "_blank";
		a.style = "padding: 10px";
		a.className += "rounded-top-right col";
		$( t ).prev().append( a );
	} );
	
	$( '.icon-grid img' ).each( function( i, t ) {
		$( t ).after( '<p>' + this.alt + '</p>' );
	} );

	// make the active menu item, the selected menu item
	var $dropdown = $( '.dropdown' ),
	activemenu = $dropdown.find( '.dropdown-menu .active' ),
	selectedrop = $dropdown.find( '[data-toggle="dropdown"]' );

	if ( activemenu.length ) {
		selectedrop.text( activemenu.text() );
	}	
	
	// 1
	// var client = algoliasearch( 'G2FUZ82WJ6', '6ed2ed9a83a0bd747f2986aa04722cb0' );
	// var index = client.initIndex( 'docs_search' );
	// var $input = $( '#search-input' );
	// $input.keyup( function() {
	// 		index.search( $input.val(), {
	// 			hitsPerPage: 10,
	// 			facets: '*'
	// 		}, searchCallback );
	// 	} )
	// 	.focus();
	
// 	var styles = '';
//     $( '.icon-grid img[src$=".svg"]' ).each( function( i ) {
//     	var $img = $( this ),
// 			imgURL = $img.attr( 'src' ),
// 			attributes = $img.prop( "attributes" );
		
//     	$.get( imgURL, function( data ) {
//     		// Get the SVG tag, ignore the rest
//     		var $svg = $( data ).find( 'svg' );
//     		// $svg.find( 'defs' ).remove();
			
// 			styles += $svg.find( 'style' ).text();
			
//     		// Remove any invalid XML tags
//     		$svg = $svg.removeAttr( 'xmlns:a' );
//     		// Loop through IMG attributes and apply on SVG
//     		$.each( attributes, function() {
//     			$svg.attr( this.name, this.value );
//     		} );
//     		// Replace IMG with SVG
//     		$img.replaceWith( $svg );
			
// 			console.log( styles )
			
//     	}, 'xml' );
//     } );
} );

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

// // 2
// var search = instantsearch({
//   appId: 'G2FUZ82WJ6',
//   apiKey: '6ed2ed9a83a0bd747f2986aa04722cb0',
//   indexName: 'docs_search',
//   searchFunction: function(helper) {
//     var searchResults = $('#search-results');
//     if (helper.state.query === '') {
//       searchResults.hide();
//       return;
//     }
//     helper.search();
//     searchResults.show();
//   }	
// });

// search.addWidget(instantsearch.widgets.hits({
//   container: document.querySelector('#search-results'),
//   templates: {
// 	  empty: 'No results',
//     	item: '<a href="{{page_url}}">{{{_highlightResult.page_name.value}}}</a>'
//   },
// 	hitsPerPage: 6
// }));

// search.addWidget(instantsearch.widgets.searchBox({
//   container: document.querySelector('#search-input'),
//   placeholder: 'Search for demo',
// }));

// search.start();


var client = algoliasearch("G2FUZ82WJ6", "6ed2ed9a83a0bd747f2986aa04722cb0")
var docs_search = client.initIndex('docs_search');
// var teams = client.initIndex('teams');

autocomplete('#aa-search-input', {}, [
    {
      source: autocomplete.sources.hits(docs_search, { hitsPerPage: 3 }),
      displayKey: 'page_name',
      templates: {
        header: '<div class="aa-suggestions-category">Pages</div>',
        suggestion: function(suggestion) {
          return '<span><a href="' + suggestion.page_url + '">' +
            suggestion._highlightResult.page_name.value + '</a></span>';
        }
      }
    }
]);




//bootstrap
// docsearch({
// apiKey: '6ed2ed9a83a0bd747f2986aa04722cb0',
// indexName: 'docs_search',
// inputSelector: '#search-input',
// handleSelected: function (input, event, suggestion) {
//   var url = suggestion.url;
//   url = suggestion.isLvl1 ? url.split('#')[0]: url;
//   // If it's a title we remove the anchor so it does not jump.
//   window.location.href = url;
// },
// // transformData: function (hits) {
// //   return hits.map(function (hit) {
// // 	hit.url = hit.url.replace('https://v4-alpha.getbootstrap.com', '/docs/4.0');
// // 	return hit;
// //   });
// // },
// debug: true // Set debug to true if you want to inspect the dropdown
// });


function searchCallback( err, content ) {
	if ( err ) {
		console.error( err );
		return;
	}
	var retval = '';
	for( i=0; i<content.hits.length; i++ ) {
		retval += '<li><a href="' + content.hits[i].page_url + '">' + content.hits[i].page_name + '</a></li>';
	}
	$('#search-results').html( retval );
};


var sortdir = 'desc';
function iconsort() {
	var mylist = $( '.icon-grid' ),
		listitems = mylist.children( 'div' ).children( 'img' ).get();
	
	if ( sortdir === 'asc' ) {
		listitems.sort( function( a, b ) {
			return $( b ).attr( 'alt' ).toUpperCase().localeCompare( $( a ).attr( 'alt' ).toUpperCase() );
		} );
		sortdir = 'desc';
	} else {
		listitems.sort( function( a, b ) {
			return $( a ).attr( 'alt' ).toUpperCase().localeCompare( $( b ).attr( 'alt' ).toUpperCase() );
		} );
		sortdir = 'asc';
	}

	mylist.empty();
	$.each( listitems, function( idx, item ) {
		mylist.append( item );
	} );
	$( '.icon-grid img' ).each( function( i, t ) {
		$( t ).wrap( '<div>' ).after( '<p>' + this.alt + '</p>' );
	} );
}

var iconwidth = 80;

function iconsize( dir ) {
	var size;
	if( dir === 'plus' ) {
		size = (iconwidth += 2) + 'px';	
	} else if( dir === 'minus' ) {
		size = (iconwidth -= 2) + 'px';
	} else {
		iconwidth = 80;
		size = '80px';
	}

	$( '.icon-grid img, .icon-grid svg' ).css( {
		'width': size,
		'height': size
	} );
}





