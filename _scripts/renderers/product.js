import BaseRenderer from './base';
import Product from '../sections/product';

export default class ProductRenderer extends BaseRenderer {
  onEnter() {
    this.sectionManager.register('product', Product)
  }
}
