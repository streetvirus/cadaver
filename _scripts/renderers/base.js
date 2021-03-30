import Highway from '@dogstudio/highway';
import SectionManager from '../core/sectionManager';

export default class BaseRenderer extends Highway.Renderer {
  constructor(properties) {
    super(properties)

    this.sectionManager = new SectionManager();
  }

  onLeave() {
    this.sectionManager.destroy();
  }
}
