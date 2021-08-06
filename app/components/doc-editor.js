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

  get selectedBlocksList() {
    return this.args.doc.blocks.map((block) => block.id == this.selected);
  }

  @action
  addBlock() {
    let block = this.store.createRecord('block', {
      content: 'New Block',
      html: '<p>New Block</p>',
    });

    block.save();

    this.args.doc.blockIds.pushObject(block.id);
    this.args.doc.save();
  }

  @action
  deleteBlock(block) {
    this.args.doc.blockIds = this.args.doc.blockIds.reject(
      (id) => id == block.id
    );
    this.args.doc.save();

    block.deleteRecord();
    block.save();
  }

  @action
  selectBlock(block) {
    this.selected = block.id;
  }

  configureBlock(block, doc) {
    if (block.content.includes('shall')) {
      block.isReq = true;

      if (!block.reqId) {
        let reqNum = doc.nextNum || 1;
        block.reqId = doc.reqPrefix + reqNum;
        doc.nextNum = reqNum + 1;
      }
    }
  }

  @action
  updateBlock(block, content) {
    block.content = content;
    this.configureBlock(block, this.args.doc);
    remark().use(recommended).use(html).process(content, (err, file) => {
      // console.log(err);
      // console.log(String(file));
      block.html = String(file);
      block.save();
      this.args.doc.save();
    });
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
    if (this.cutBlock) {
      let cutIndex = this.args.doc.blockIds.indexOf(this.cutBlock);
      let insertIndex = this.args.doc.blockIds.indexOf(this.selected);

      if (cutIndex < insertIndex) {
        insertIndex--;
      }

      this.args.doc.blockIds.removeObject(this.cutBlock);
      this.args.doc.blockIds.insertAt(insertIndex, this.cutBlock);
      this.args.doc.save();
      this.cutBlock = null;
    }
  }
}
