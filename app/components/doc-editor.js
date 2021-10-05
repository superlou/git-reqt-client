import Component from '@glimmer/component';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { A } from '@ember/array';
// todo pull remark stuff into a service
import remark from 'remark';
import recommended from 'remark-preset-lint-recommended';
import html from 'remark-html';

export default class DocEditorComponent extends Component {
  @service store;
  @tracked selected = null;
  @tracked cutBlock = null;

  @action
  addBlock() {
    let block = this.store.createRecord('block', {
      content: 'New Block',
      doc: this.args.doc,
    });
    block.save();
  }

  @action
  deleteBlock(block) {
    block.deleteRecord();
    block.save();
  }

  @action
  selectBlock(block) {
    this.selected = block.id;
  }

  @action
  updateBlock(block, content) {
    block.content = content;
    block.save();
  }

  @action
  updateOrder(blocks, draggedBlock) {
    let block_ids = blocks.map((block) => block.id);
    this.args.doc.blockIds = block_ids;
    this.args.doc.save();
  }

  @action
  addKeyboardShortcuts() {
    window.addEventListener('keydown', this.keyDown);
  }

  @action
  keyDown(evt) {
    if (evt.ctrlKey && evt.key == 'x') {
      this.cutBlock = this.selected;
    } else if (evt.ctrlKey && evt.key == 'v') {
      this.paste();
    }
  }

  @action
  paste() {
    if (!this.cutBlock) {
      return;
    }

    let cutIndex = this.args.doc.hasMany('blocks').ids().indexOf(this.cutBlock);
    let insertIndex = this.args.doc
      .hasMany('blocks')
      .ids()
      .indexOf(this.selected);

    if (cutIndex < insertIndex) {
      insertIndex--;
    }

    this.args.doc.blocks.removeAt(cutIndex);
    this.args.doc.blocks.insertAt(
      insertIndex,
      this.store.peekRecord('block', this.cutBlock)
    );

    this.args.doc.save();
    this.cutBlock = null;
  }
}
