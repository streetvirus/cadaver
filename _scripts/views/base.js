import SectionManager from '../core/sectionManager'

export default class BaseView {
  constructor($el, type) {
    this.$el = $el;
    this.type = type;

    this.sectionManager = new SectionManager()    
  }

  destroy() {
    this.sectionManager.destroy();
  }
}
