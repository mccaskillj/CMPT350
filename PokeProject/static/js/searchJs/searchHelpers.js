/**
 * Created by carmichael on 2017-03-13.
 */


// Weight Slider
$( function() {
    $( '#slider-range' ).slider({
      range: true,
      min: 0,
      max: 952,
      values: [ 0, 952 ],
      slide: function( event, ui ) {
        $( '#amountW' ).val(ui.values[ 0 ] + ' - ' + ui.values[ 1 ] );
      }
    });
    $( '#amountW' ).val( $( '#slider-range' ).slider( 'values', 0 ) +
      ' - ' + $( '#slider-range' ).slider( 'values', 1 ) );
} );

// Weight Slider
$( function() {
    $('#slider-range2' ).slider({
      range: true,
      min: 0,
      max: 14.5,
      values: [ 0, 14.5 ],
      slide: function( event, ui ) {
        $( '#amountH' ).val(ui.values[ 0 ] + ' - ' + ui.values[ 1 ] );
      }
    });
    $( '#amountH' ).val( $('#slider-range2' ).slider( 'values', 0 ) +
      ' - ' + $( '#slider-range2' ).slider( 'values', 1 ) );
} );

// HP Slider
$( function() {
    $('#slider-range3' ).slider({
      range: true,
      min: 0,
      max: 255,
      values: [ 0, 255 ],
      slide: function( event, ui ) {
        $( '#amountHP' ).val(ui.values[ 0 ] + ' - ' + ui.values[ 1 ] );
      }
    });
    $( '#amountHP' ).val( $('#slider-range3' ).slider( 'values', 0 ) +
      ' - ' + $( '#slider-range3' ).slider( 'values', 1 ) );
} );

// Attack Slider
$( function() {
    $('#slider-range4' ).slider({
      range: true,
      min: 0,
      max: 165,
      values: [ 0, 165 ],
      slide: function( event, ui ) {
        $( '#amountA' ).val(ui.values[ 0 ] + ' - ' + ui.values[ 1 ] );
      }
    });
    $( '#amountA' ).val( $('#slider-range4' ).slider( 'values', 0 ) +
      ' - ' + $( '#slider-range4' ).slider( 'values', 1 ) );
} );

// Defense Slider
$( function() {
    $('#slider-range5' ).slider({
      range: true,
      min: 0,
      max: 230,
      values: [ 0, 230 ],
      slide: function( event, ui ) {
        $( '#amountD' ).val(ui.values[ 0 ] + ' - ' + ui.values[ 1 ] );
      }
    });
    $( '#amountD' ).val( $('#slider-range5' ).slider( 'values', 0 ) +
      ' - ' + $( '#slider-range5' ).slider( 'values', 1 ) );
} );

// Sp. Attack Slider
$( function() {
    $('#slider-range6' ).slider({
      range: true,
      min: 0,
      max: 154,
      values: [ 0, 154 ],
      slide: function( event, ui ) {
        $( '#amountSA' ).val(ui.values[ 0 ] + ' - ' + ui.values[ 1 ] );
      }
    });
    $( '#amountSA' ).val( $('#slider-range6' ).slider( 'values', 0 ) +
      ' - ' + $( '#slider-range6' ).slider( 'values', 1 ) );
} );

// Sp. Defense Slider
$( function() {
    $('#slider-range7' ).slider({
      range: true,
      min: 0,
      max: 230,
      values: [ 0, 230 ],
      slide: function( event, ui ) {
        $( '#amountSD' ).val(ui.values[ 0 ] + ' - ' + ui.values[ 1 ] );
      }
    });
    $( '#amountSD' ).val( $('#slider-range7' ).slider( 'values', 0 ) +
      ' - ' + $( '#slider-range7' ).slider( 'values', 1 ) );
} );

// Speed Slider
$( function() {
    $('#slider-range8' ).slider({
      range: true,
      min: 0,
      max: 160,
      values: [ 0, 160 ],
      slide: function( event, ui ) {
        $( '#amountSP' ).val(ui.values[ 0 ] + ' - ' + ui.values[ 1 ] );
      }
    });
    $( '#amountSP' ).val( $('#slider-range8' ).slider( 'values', 0 ) +
      ' - ' + $( '#slider-range8' ).slider( 'values', 1 ) );
} );



// $('.selectpicker').selectpicker({
//   style: 'btn-info',
//   size: 4
// });