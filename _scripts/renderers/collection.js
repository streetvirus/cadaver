import BaseRenderer from './base';
import Collection from '../sections/collection'

export default class CollectionRenderer extends BaseRenderer {
  onEnter() {
    this.sectionManager.register('collection', Collection)
  }
}
