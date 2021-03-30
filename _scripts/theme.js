import $ from 'jquery';
import Highway from '@dogstudio/highway';
import { throttle } from 'throttle-debounce';

// Core
import {
  userAgentBodyClass,
  isThemeEditor,
  isExternal
} from './core/utils'
import { pageLinkFocus } from './core/a11y'
import { initialize as initializeAnimations }  from './core/animations'
import { initialize as initializeBreakpoints } from './core/breakpoints'

// Renderers
import IndexRenderer from './renderers/index';
import ProductRenderer from './renderers/product';
import CollectionRenderer from './renderers/collection';
import PageRenderer from './renderers/page';
import PageCustomRenderer from './renderers/pageCustom';

// Transitions
import FadeTransition from './transitions/fadeTransition';

// Sections
import SectionManager from './core/sectionManager'
import Header from './sections/header'
import AJAXCart from './sections/ajaxCart'

const setViewportHeightProperty = () => {
  // If mobile / tablet, set var to window height. This fixes the 100vh iOS bug/feature.
  const v = window.innerWidth <= 1024 ? `${window.innerHeight}px` : '100vh';
  document.documentElement.style.setProperty('--viewport-height', v);
};

const $body = $(document.body);
const TEMPLATE_REGEX = /(^|\s)template-\S+/g;

initializeAnimations();
initializeBreakpoints();

(() => {
  const sectionManager = new SectionManager();

  sectionManager.register('header', Header);
  sectionManager.register('ajax-cart', AJAXCart);

  // Get back the instances for use in callbacks
  const header = sectionManager.getSingleInstance('header');
  const ajaxCart = sectionManager.getSingleInstance('ajax-cart');  

  // START Highway
  const highway = new Highway.Core({
    renderers: {
      index: IndexRenderer,
      collection: CollectionRenderer,
      product: ProductRenderer,
      page: PageRenderer,
      'page-custom': PageCustomRenderer
    },
    transitions: {
      default: FadeTransition
    }
  });

  // Prevent highway js from running inside the theme editor
  if (isThemeEditor()) {
    highway.detach(document.querySelectorAll('a'))
  }  

  // Listen the `NAVIGATE_IN` event
  // This event is sent everytime a `data-router-view` is added to the DOM Tree
  highway.on('NAVIGATE_IN', ({ to, trigger, location }) => {
    $body.removeClass((i, currentClasses) => {
      return currentClasses.split(' ').map(c => c.match(TEMPLATE_REGEX)).join(' ');
    });

    $body.addClass(() => {
      return to.page.body.classList.value.split(' ').map(c => c.match(TEMPLATE_REGEX)).join(' ');
    });
  });

  // Listen the `NAVIGATE_OUT` event
  // This event is sent everytime the `out()` method of a transition is run to hide a `data-router-view`
  highway.on('NAVIGATE_OUT', ({ from, trigger, location }) => {
    window.scrollTo && window.scrollTo(0, 0);
    ajaxCart.close();
  });

  // Listen the `NAVIGATE_END` event
  // This event is sent everytime the `done()` method is called in the `in()` method of a transition
  highway.on('NAVIGATE_END', ({ to, from, trigger, location }) => {
    const view = to.view.dataset.routerView

    if (view === 'cart') {
      ajaxCart.open();
    }
  });
  // END Highway

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

  if (window.history && window.history.scrollRestoration) {
    // Prevents browser from restoring scroll position when hitting the back button
    window.history.scrollRestoration = 'manual';
  }  

  $body.addClass('is-loaded');  
})()