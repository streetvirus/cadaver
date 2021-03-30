import $ from 'jquery';
import { throttle } from 'throttle-debounce';

/**
 * Breakpoint Helper Functions / constants
 * -----------------------------------------------------------------------------
 * A collection of functions that help with dealing with site breakpoints in JS
 * All breakpoint properties should be defined here
 *
 */

const $window = $(window);
let cachedWindowWidth = $window.width();

// Match those set in variables.scss
const breakpointMinWidths = {
  xs: 0,
  sm: 576,
  md: 768,
  lg: 1024,
  xl: 1200,
  xxl: 1480,
  xxxl: 1800,
};

const events = {
  BREAKPOINT_CHANGE: 'breakpointChange',
};

/**
 * Get one of the widths stored in the variable defined above
 *
 * @param {string} key - string matching one of the key names
 * @return {int} - pixel width
 */
export function getBreakpointMinWidth(key) {
  let w;

  if (breakpointMinWidths.hasOwnProperty(key)) {
    w = breakpointMinWidths[key];
  }

  return w;
}

/**
 * Gets the key for one of the breakpoint widths, whichever is closest but smaller to the passed in width
 * So if we pass in a width between 'sm' and 'md', this will return 'sm'
 *
 * @param {int} w - width to search for
 * @return {undefined|string} foundKey
 */
export function getBreakpointMinWidthKeyForWidth(w) {
  const width = w || $window.width();
  
  let foundKey;

  $.each(breakpointMinWidths, (k, bpMinWidth) => {
    if (width >= bpMinWidth) {
      foundKey = k;
    }
  });

  return foundKey;
}

/**
 * Triggers a window event when a breakpoint is crossed, passing the new minimum breakpoint width key as an event parameter
 *
 */
export function onResize() {
  const newWindowWidth = $window.width();

  $.each(breakpointMinWidths, (k, bpMinWidth) => { // eslint-disable-line consistent-return
    if ((newWindowWidth >= bpMinWidth && cachedWindowWidth < bpMinWidth) || (cachedWindowWidth >= bpMinWidth && newWindowWidth < bpMinWidth)) {
      const bpMinWidthKey = getBreakpointMinWidthKeyForWidth(newWindowWidth);
      const e = $.Event(events.BREAKPOINT_CHANGE, { bpMinWidthKey });
      $window.trigger(e);
      return false;
    }
  });

  cachedWindowWidth = $window.width();
}

export function initialize() {
  $window.on('resize', throttle(20, onResize));
}
