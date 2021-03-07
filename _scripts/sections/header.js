import $ from 'jquery'
import BaseSection from './base'
import { events as AJAXCartEvents } from '../components/ajaxCart'

const selectors = {
  cartCount: '[data-cart-count]',
  cartToggle: '[data-ajax-cart-toggle]'
}

const classes = {
  hasItems: 'has-items'
}

export default class HeaderSection extends BaseSection {
  constructor(container) {
    super(container, 'header');

    this.$cartCount = $(selectors.cartCount, this.$container)
    this.$cartToggle = $(selectors.cartToggle, this.$container)

    $(window).on(AJAXCartEvents.RENDER, this.onAJAXCartRender.bind(this))
  }

  onAJAXCartRender({ cart }) {
    this.$cartCount.text(cart.item_count)
    this.$cartToggle.toggleClass(classes.hasItems, cart.item_count > 0)
  }
}
