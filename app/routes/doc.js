import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class DocRoute extends Route {
  @service store;

  beforeModel() {
    this.store.findAll('block');
  }
}
