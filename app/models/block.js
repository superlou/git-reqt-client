import Model, { attr, belongsTo } from '@ember-data/model';

export default class BlockModel extends Model {
  @attr content;
  @belongsTo doc;
}
