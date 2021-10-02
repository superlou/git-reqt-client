import Model, { attr, belongsTo } from '@ember-data/model';

export default class BlockModel extends Model {
  @attr content;
  @attr html;
  @attr reqId;
  @attr isReq;

  @attr version;
}
