import Component from '@glimmer/component';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class DocCreatorComponent extends Component {
  @service store;

  @action
  createDoc() {
    let record = this.store.createRecord('doc', {
      title: 'New Document',
      blockIds: [],
      nextNum: 1,
      reqPrefix: 'abc-',
    });

    record.save();
  }
}
