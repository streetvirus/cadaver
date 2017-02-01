;(function($, Modernizr, undefined){

  var supportsSVG = function() {
    return document.implementation.hasFeature('http://www.w3.org/TR/SVG11/feature#Image', '1.1');
  };

  $(function(){

    /* Remove SVG images to avoid broken images in all browsers that don't support SVG. */
    /*==========================*/
    if (!supportsSVG()) {
      $('img[src*=".svg"]').remove();
    }
    
    /* Prepare to have floated images fill the width of the design on blog pages on small devices. */
    /*==========================*/ 
    var images = $('.article img').load(function() {
      var src = $(this).attr('src').replace(/_grande\.|_large\.|_medium\.|_small\./, '.');
      var width = $(this).width();
      $(this).attr('src', src).attr('width', width).removeAttr('height');
    });

  });

})(jQuery, Modernizr);