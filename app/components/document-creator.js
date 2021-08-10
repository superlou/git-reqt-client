import Component from '@glimmer/component';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class DocumentCreatorComponent extends Component {
  @service store;

  @action
  createDocument() {
    let record = this.store.createRecord('document', {
      title: 'New Document',
      blockIds: [],
      nextNum: 1,
      reqPrefix: 'abc-',
    });

    record.save();
  }
}
