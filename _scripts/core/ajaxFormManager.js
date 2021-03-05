import $ from 'jquery';
import { getPropByString } from './utils';
import { addItemFromForm } from './cartAPI';

const selectors = {
  form: 'form[action^="/cart/add"]',
  submit: '[type="submit"]'
};

const $window = $(window);
const $body   = $(document.body);

export const events = {
  ADD_START: 'addStart.ajaxFormManager',
  ADD_DONE: 'addDone.ajaxFormManager',
  ADD_SUCCESS: 'addSuccess.ajaxFormManager',
  ADD_FAIL: 'addFail.ajaxFormManager',
}

export default class AJAXFormManager {
  constructor() {
    let requestInProgress = false;

    $body.on('submit', selectors.form, (e) => {
      e.preventDefault();

      if (requestInProgress) return;

      const $form = $(e.currentTarget);
      const $submit = $form.find(selectors.submit);

      const startEvent = $.Event(events.ADD_START, { relatedTarget: $form });
      $window.trigger(startEvent);

      // Disable the button so the user knows the form is being submitted
      $submit.prop('disabled', true);

      requestInProgress = true;

      addItemFromForm($form)
        // Always needs to go before then / fail because the window event callbacks can cause a change to the disabled state of the button
        .always(() => {
          $submit.prop('disabled', false);
          requestInProgress = false;

          const event = $.Event(events.ADD_DONE, { relatedTarget: $form });
          $window.trigger(event);          
        })      
        .then((data) => {
          const event = $.Event(events.ADD_SUCCESS, { cart: data, relatedTarget: $form });
          $window.trigger(event);
        })
        .fail((data) => {
          const event = $.Event(events.ADD_FAIL, {
            message: data.message,
            description: data.description,
            relatedTarget: $form
          });
          
          $window.trigger(event);
        });
    });
  }
}
