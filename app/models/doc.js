import Model, { attr, hasMany } from '@ember-data/model';
import { inject as service } from '@ember/service';

export default class DocModel extends Model {
  @attr title;
  @hasMany blocks;
  @service store;
}
