import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class BlockEditorComponent extends Component {
  @tracked editing = false;
  @tracked editedContent = null;
  @tracked renderHeight = 0;

  @action
  startEdit() {
    this.editedContent = this.args.theBlock.content;
    this.editing = true;
  }

  @action
  editKeypress(evt) {
    if (evt.key == 'Escape') {
      this.editing = false;
    } else if (evt.key == 'Enter' && evt.ctrlKey) {
      this.args.update(this.args.theBlock, this.editedContent);
      this.editing = false;
    }
  }

  @action
  setFocus(element) {
    element.focus();
  }

  @action
  matchSize(element) {
    element.style.height = '1px';
    let scrollHeight = element.scrollHeight;
    element.style.height = Math.max(scrollHeight, this.renderHeight) + 'px';
  }

  @action
  measureRenderHeight(element) {
    this.renderHeight = element.clientHeight;
  }
}
