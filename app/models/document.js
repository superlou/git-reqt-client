import Model, { attr } from '@ember-data/model';
import { inject as service } from '@ember/service';

export default class DocumentModel extends Model {
  @attr title;
  @attr blockIds;

  @service store;

  get blocks() {
    let ids = this.blockIds;
    return ids.map((id) => this.store.peekRecord('block', id));
  }
}
