import Model, { attr, belongsTo } from '@ember-data/model';

export default class BlockHistoryModel extends Model {
  @attr content;
  @attr html;
  @attr reqId;
  @attr isReq;

  @belongsTo('block') block;
  @attr version;
}
