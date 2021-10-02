import Model, { attr, belongsTo } from '@ember-data/model';

export default class DocHistoryModel extends Model {
  @attr title;
  @attr blockIds;
  @attr reqPrefix;
  @attr nextNum;

  @belongsTo('doc') doc;
  @attr version;
}
