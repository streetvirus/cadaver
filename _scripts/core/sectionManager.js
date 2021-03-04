import $ from 'jquery';
import BaseSection from '../sections/base';

const SECTION_TYPE_ATTR = 'data-section-type';
const SECTION_ID_ATTR = 'data-section-id';

export default class SectionManager {
  constructor() {
    this.constructors = {};
    this.instances = [];

    if (window.Shopify && window.Shopify.designMode) {
      $(document)
        .on('shopify:section:load', this.onSectionLoad.bind(this))
        .on('shopify:section:unload', this.onSectionUnload.bind(this))
        .on('shopify:section:select', this.onSelect.bind(this))
        .on('shopify:section:deselect', this.onDeselect.bind(this))
        .on('shopify:section:reorder', this.onReorder.bind(this))
        .on('shopify:block:select', this.onBlockSelect.bind(this))
        .on('shopify:block:deselect', this.onBlockDeselect.bind(this));
    }
  }

  getInstanceById(id) {
    let instance;

    for (let i = 0; i < this.instances.length; i++) {
      if (this.instances[i].id === id) {
        instance = this.instances[i];
        break;
      }
    }
    return instance;
  }

  load(container, constructor) {
    const $container = $(container);
    const id = $container.attr(SECTION_ID_ATTR);
    const type = $container.attr(SECTION_TYPE_ATTR);
    const Konstructor = constructor || this.constructors[type]; // No param re-assignment

    if (typeof Konstructor === 'undefined') {
      return;
    }

    const instance = $.extend(new Konstructor(container), { id, type, container });

    this.instances.push(instance);
  }

  unload(id) {
    let i = this.instances.length;
    while (i--) {
      if (this.instances[i].id === id) {
        this.instances.splice(i, 1);
        break;
      }
    }
  }

  onSectionLoad(e) {
    const container = $(`[${SECTION_ID_ATTR}]`, e.target)[0];
    if (container) {
      this.load(container);
    }
  }

  onSectionUnload(e) {
    const instance = this.getInstanceById(e.detail.sectionId);

    if (!instance) {
      return;
    }

    instance.onUnload(e);

    this.unload(e.detail.sectionId);
  }

  // Generic event is a non section load/unload
  // Simply triggers the appropriate instance method if available
  onGenericEvent(e, func) {
    const instance = this.getInstanceById(e.detail.sectionId);

    if (instance && typeof instance[func] === 'function') {
      instance[func].call(instance, e);
    }
  }

  onSelect(e) {
    this.onGenericEvent(e, 'onSelect');
  }

  onDeselect(e) {
    this.onGenericEvent(e, 'onDeselect');
  }

  onReorder(e) {
    this.onGenericEvent(e, 'onReorder');
  }

  onBlockSelect(e) {
    this.onGenericEvent(e, 'onBlockSelect');
  }

  onBlockDeselect(e) {
    this.onGenericEvent(e, 'onBlockDeselect');
  }

  register(type, constructor) {
    // Need to make sure we're working with actual sections here..
    if (!(constructor.prototype instanceof BaseSection)) {
      return;
    }

    this.constructors[type] = constructor;

    $(`[${SECTION_TYPE_ATTR}=${type}]`).each((index, container) => {
      this.load(container, constructor);
    });
  }
}
