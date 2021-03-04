import $ from 'jquery';
import BaseSection from './base';
import ProductCard from '../components/product/productCard'

export default class CollectionSection extends BaseSection {
  constructor(container) {
    super(container, 'collection')

    this.$container.find('[data-product-card]').map((i, el) => {
      new ProductCard(el)
    })
  }
}
