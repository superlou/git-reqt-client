import Component from '@glimmer/component';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class DocCreatorComponent extends Component {
  @service store;

  @action
  createDoc() {
    let defaultData = {
      title: 'New Document',
      blockIds: [],
      nextNum: 1,
      reqPrefix: 'abc-',
      version: 0,
    };

    let doc = this.store.createRecord('doc', defaultData);
    doc.save();

    let history = this.store.createRecord('docHistory', defaultData);
    history.doc = doc;
    history.save();
  }
}
