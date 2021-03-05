import $ from 'jquery';
// import Handlebars from 'handlebars';
import CartAPI from '../core/cartAPI';

export default class AJAXCart {
  constructor(el) {
    console.log('creating ajax cart...')

    this.$el = $(el)


  }

  render(cart) {
    console.log(cart)
  }

  open() {
    console.log('open!')
  }

  onChangeSuccess() {
    console.log('onChangeSuccess')
  }

  onChangeFail() {
    console.log('onChangeFail')
  }
}