/*
 * Application Code
 *
 * Dependencies: 
 *   - jQuery
 *   - Modernizr
 *
 */
;(function($, Modernizr, undefined){

  var supportsSVG = function() {
    return document.implementation.hasFeature('http://www.w3.org/TR/SVG11/feature#Image', '1.1');
  };

  /*
   * Sections
   * =============
   *
   * Borrowed from Slate.  This code is needed to register Shopify theme sections in order to interact with the theme editor
   */
  var SectionManager = function() {
    this.constructors = {};
    this.instances = [];

    $(document)
      .on('shopify:section:load',     this._onSectionLoad.bind(this))
      .on('shopify:section:unload',   this._onSectionUnload.bind(this))
      .on('shopify:section:select',   this._onSelect.bind(this))
      .on('shopify:section:deselect', this._onDeselect.bind(this))
      .on('shopify:block:select',     this._onBlockSelect.bind(this))
      .on('shopify:block:deselect',   this._onBlockDeselect.bind(this));
  };

  SectionManager.prototype = {
    _createInstance: function(container, constructor) {
      var $container = $(container);
      var id         = $container.attr('data-section-id');
      var type       = $container.attr('data-section-type');

      constructor = constructor || this.constructors[type];

      if (constructor === undefined) {
        return;
      }

      var instance = new constructor(container);

      instance.id        = id;
      instance.type      = type;
      instance.container = container;

      this.instances.push(instance);
    },

    _getInstanceById: function(id){
  
      for (var i = this.instances.length - 1; i >= 0; i--) {
        var instance = this.instances[i];
        if(instance.id === id){
          return instance;
        }
      }

    },

    _onSectionLoad: function(evt) {
      var container = $('[data-section-id]', evt.target)[0];
      if (container) {
        this._createInstance(container);
      }
    },

    _onSectionUnload: function(evt) {

      for (var i = this.instances.length - 1; i >= 0; i--) {
        var instance = this.instances[i];

        if(instance.id === evt.detail.sectionId){
          if(typeof instance.onUnload == "function"){
            instance.onUnload(evt);
          }

          this.instances.splice(i, 1); // remove the instance from our cache
        }
      }

    },

    _onSelect: function(e) {
      var instance = this._getInstanceById(e.detail.sectionId);

      if (instance !== undefined && typeof instance.onSelect == "function") {
        instance.onSelect(evt);
      }
    },

    _onDeselect: function(e) {
      var instance = this._getInstanceById(e.detail.sectionId);

      if (instance !== undefined && typeof instance.onDeselect == "function") {
        instance.onDeselect(evt);
      }
    },

    _onBlockSelect: function(e) {
      var instance = this._getInstanceById(e.detail.sectionId);

      if (instance !== undefined && typeof instance.onBlockSelect == "function") {
        instance.onBlockSelect(evt);
      }
    },

    _onBlockDeselect: function(e) {
      var instance = this._getInstanceById(e.detail.sectionId);

      if (instance !== undefined && typeof instance.onBlockDeselect == "function") {
        instance.onBlockDeselect(evt);
      }
    },

    register: function(type, constructor) {
      this.constructors[type] = constructor;

      $('[data-section-type=' + type + ']').each(function(index, container) {
        this._createInstance(container, constructor);
      }.bind(this));
    }
  };

  var Header = function() {
    this.init();
  };

  Header.prototype = {
    init: function(){
      console.log('Header is initialized!');
      return this;
    },
    onSelect: function(){
      console.log('Header onSelect');
    },
    onLoad: function(){
      console.log('Header onLoad');
    },
    onUnload: function() {
      console.log('Header onUnload');
    },
  };

  var Footer = function() {
    this.init();
  };

  Footer.prototype.init = function(){};

  // Different patterns you can use to create sections
  // You *must* return the constructor

  var BoilerplateSection = (function() {
    function BoilerplateSection() {
      this.init();
    }
    
    BoilerplateSection.prototype = {
      init: function() {},
      onLoad: function(){
        console.log('Boilerplate onLoad');
      },
      onUnload: function(){
        console.log('Boilerplate onUnload');
      }
    };
    
    return BoilerplateSection;
  })();

  // DOM Ready
  $(function(){

    /* Initialize sections */
    /*==========================*/
    window.sectionManager = new SectionManager();

    sectionManager.register('header-section', Header);
    sectionManager.register('footer-section', Footer);
    sectionManager.register('boilerplate-section', BoilerplateSection);

    /* Remove SVG images to avoid broken images in all browsers that don't support SVG. */
    /*==========================*/
    if (!supportsSVG()) {
      $('img[src*=".svg"]').remove();
    }
    
    /* Prepare to have floated images fill the width of the design on blog pages on small devices. */
    /*==========================*/ 
    (function(){
      $('.article img').load(function() {
        var src = $(this).attr('src').replace(/_grande\.|_large\.|_medium\.|_small\./, '.');
        var width = $(this).width();
        $(this).attr('src', src).attr('width', width).removeAttr('height');
      });
    })();

    /* Fix external links by opening them in a new window */
    /*==========================*/
    (function(){
      $('a').not('[href*="mailto:"]').each(function () {
        var isInternalLink = new RegExp('/' + window.location.host + '/');
        if ( !isInternalLink.test(this.href) ) {
          $(this).attr('target', '_blank');
        }
      });
    })();
  });

})(jQuery, Modernizr);