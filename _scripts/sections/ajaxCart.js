import $ from 'jquery';
import BaseSection from './base';
import AJAXFormManager, { events } from '../core/ajaxFormManager'
import { getCart } from '../core/cartAPI'
import AJAXCart from '../components/ajaxCart'

const selectors = {
  ajaxCart: '[data-ajax-cart]'
}

const $window = $(window)

export default class AJAXCartSection extends BaseSection {
  constructor(container) {
    super(container, 'ajax-cart')

    this.ajaxCart = new AJAXCart($(selectors.ajaxCart, this.$container).first())
    this.ajaxFormManager = new AJAXFormManager()

    // Store callbacks so we can remove them later
    this.callbacks = {
      changeSuccess: e => this.ajaxCart.onChangeSuccess(e.cart),
      changeFail: e => this.ajaxCart.onChangeFail(e.description)
    };

    $window.on(events.ADD_SUCCESS, this.callbacks.changeSuccess);
    $window.on(events.ADD_FAIL, this.callbacks.changeFail);

    getCart().then(cart => {
      this.ajaxCart.render(cart)
    })
  }

  onSelect() {
    this.ajaxCart.open()
  }

  onDeselect() {
    this.ajaxCart.close()
  }

  onUnload() {
    // this.ajaxCart.destroy()
    // $window.off(events.ADD_SUCCESS, this.callbacks.changeSuccess)
    // $window.off(events.ADD_FAIL, this.callbacks.changeFail)    
  }
}
