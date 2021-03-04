import BaseView from './base';
import Collection from '../sections/collection'

export default class CollectionView extends BaseView {
  constructor($el, type) {
    super($el, type);

    this.sectionManager.register('collection', Collection)
  }
}
