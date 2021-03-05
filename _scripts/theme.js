import $ from 'jquery'
import { throttle } from 'throttle-debounce'

// Core
import {
  userAgentBodyClass,
  isThemeEditor,
  isExternal
} from './core/utils'
import { pageLinkFocus } from './core/a11y'
import AppController     from './core/appController'

// Views
import ProductView from './views/product'
import CollectionView from './views/collection'
import PageView from './views/page'
import IndexView from './views/index'

// Sections
import SectionManager from './core/sectionManager'
import Header from './sections/header'
import AJAXCart from './sections/ajaxCart'

const setViewportHeightProperty = () => {
  // If mobile / tablet, set var to window height. This fixes the 100vh iOS bug/feature.
  const v = window.innerWidth <= 1024 ? `${window.innerHeight}px` : '100vh';
  document.documentElement.style.setProperty('--viewport-height', v);
};

(() => {
  const $body = $(document.body);

  const sectionManager = new SectionManager()

  sectionManager.register('header', Header)
  sectionManager.register('ajax-cart', AJAXCart)

  const appController = new AppController({
    viewConstructors: {
      product: ProductView,
      collection: CollectionView,
      page: PageView,
      index: IndexView
    },
    onSameRoute: (url, currentView) => {
      
    },
    onInitialViewReady: (view) => {
      console.log('onInitialViewReady')
    },
    onBeforeRouteStart: (deferred) => {
      console.log('onBeforeRouteStart')
      // sections.ajaxCart.close();
      deferred.resolve();
    },
    onRouteStart: (url) => {
      console.log('onRouteStart');
    },
    onViewChangeStart: (url, newView) => {
      console.log('onViewChangeStart')
    },
    onViewTransitionOutDone: (url, deferred) => {
      console.log('onViewTransitionOutDone')
      window.scrollTo && window.scrollTo(0, 0)
      deferred.resolve()
    },
    onViewChangeComplete: (newView) => {
      console.log('onViewChangeComplete')
    },
    onViewReady: (view) => {
      console.log('onViewReady')
      // console.log(view);

      if (view.type === 'index') {
        //
      }
      else if (view.type === 'cart') {
        // sections.ajaxCart.open();
      }
    }    
  })

  appController.start()

  $('.in-page-link').on('click', evt => pageLinkFocus($(evt.currentTarget.hash)));

  // Common a11y fixes
  pageLinkFocus($(window.location.hash));

  userAgentBodyClass();  

  window.addEventListener('resize', throttle(100, setViewportHeightProperty));
  document.addEventListener('scroll', throttle(100, () => {
    if (window.innerWidth > 1024) return;
    setViewportHeightProperty();
  }));

  setViewportHeightProperty();

  $body.addClass('is-loaded');

  // Stop here...no AJAX navigation inside the theme editor
  // eslint-disable-next-line no-undef
  if (isThemeEditor()) {
    return;
  }

  if (window.history && window.history.pushState) {
    $body.on('click', 'a', (e) => {
      if (e.isDefaultPrevented()) return true;

      const url = $(e.currentTarget).attr('href');

      if (isExternal(url) || url === '#' || url.indexOf('/checkout') > -1) return true;

      if (appController.isTransitioning) return false;

      e.preventDefault();
      appController.navigate(url);

      return true;
    });

    // Prevents browser from restoring scroll position when hitting the back button
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
  }  
})()