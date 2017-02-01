// Start Product Page
;(function($, Modernizr, Shopify, ProductPageConfig, undefined){

  /*============================*/
  /* Update main product image. */
  /*============================*/
  var switchImage = function(newImageSrc, newImage, mainImageDomEl) {
    // newImageSrc is the path of the new image in the same size as originalImage is sized.
    // newImage is Shopify's object representation of the new image, with various attributes, such as scr, id, position.
    // mainImageDomEl is the passed domElement, which has not yet been manipulated. Let's manipulate it now.
    $(mainImageDomEl).parents('a').attr('href', newImageSrc.replace('_grande', '_1024x1024'));
    $(mainImageDomEl).attr('src', newImageSrc);  
  };

  var onVariantSelected = function(variant, selector) {
    var $add = $('#add');
    var $price = $('#product-price');
    var $backorder = $('#backorder');
    var $backorderVariant = $('#backorder-selected-variant');

    if (variant) {
      
      // Swap image.
      if (variant.featured_image) {
        var newImage = variant.featured_image; // New image object.
        // ~~ Swap image logic goes here ~~
      }

      // Selected a valid variant that is available.
      if (variant.available) {
        
        $add.val(ProductPageConfig.msg.addToCart).removeClass('disabled').prop('disabled', false);
        
        // If item is backordered yet can still be ordered, we'll show special message.
        if (variant.inventory_management && variant.inventory_quantity <= 0) {
          var variantTitle = ProductPageConfig.product.title + (ProductPageConfig.hideDefaultTitle ? '' : (' - ' + variant.title));
          $backorderVariant.html( variantTitle );
          $backorder.removeClass("hidden");
        } else {
          $backorder.addClass("hidden");
        }

      } else {
        $backorder.addClass("hidden");
        $add.val(ProductPageConfig.msg.soldOut).addClass('disabled').prop('disabled', true);       
      }

      // Whether the variant is in stock or not, we can update the price and compare at price.
      if ( variant.compare_at_price > variant.price ) {
        $price.html('<span class="product-price on-sale">'+ Shopify.formatMoney(variant.price, ProductPageConfig.moneyFormat) +'</span>'+'&nbsp;<s class="product-compare-price">'+Shopify.formatMoney(variant.compare_at_price, ProductPageConfig.moneyFormat)+ '</s>');
      } else {
        $price.html('<span class="product-price">'+ Shopify.formatMoney(variant.price, ProductPageConfig.moneyFormat) + '</span>' );
      }      

    } else { // variant doesn't exist.
      $price.empty();
      $backorder.addClass("hidden");
      $add.val(ProductPageConfig.msg.unavailable).addClass('disabled').prop('disabled', true);
    }

  };

  // Pre-Dom Ready
  Shopify.Image.preload(ProductPageConfig.product.images, 'grande');
  Shopify.Image.preload(ProductPageConfig.product.images, '1024x1024');

  // Dom Ready
  $(function(){

    var product = ProductPageConfig.product;

    new Shopify.OptionSelectors('product-select', {
      product: product, 
      onVariantSelected: onVariantSelected, 
      enableHistoryState: true
    });

    $('.single-option-selector').addClass('form-control');

    // Add label if only one product option and it isn't 'Title'.
    if(product.options.length == 1 && product.options[0] !== "Title") {  
      $('.selector-wrapper').first().prepend('<label>' + product.options[0] + '</label>');
    }

    // Hide selectors if we only have 1 variant and its title contains 'Default'.
    if(product.variants.length == 1 && product.variants[0].title.indexOf("Default") !== -1){  
      $('#product-variants').hide();
    }

    /* Update main product image when a thumbnail is clicked. */
    /*==========================*/
    $('.product-photo-thumb a').on('click', function(e) { 
      e.preventDefault();
      switchImage($(this).attr('href'), null, $('.product-photo-container img')[0]);
    } );

  });

})(jQuery, Modernizr, Shopify, ProductPageConfig);