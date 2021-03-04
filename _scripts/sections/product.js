import $ from 'jquery';
import BaseSection from './base';
import ProductDetailForm from '../components/product/productDetailForm'
import ProductDetailGallery from '../components/product/productDetailGallery'

export default class ProductSection extends BaseSection {
  constructor(container) {
    super(container, 'product');

    this.productDetailForm    = new ProductDetailForm($('[data-product-detail-form]', this.$container).first())
    this.productDetailGallery = new ProductDetailGallery($('[data-product-detail-gallery]', this.$container).first())
  }
}
