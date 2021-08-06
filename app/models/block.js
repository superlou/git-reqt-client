import Model, { attr } from '@ember-data/model';

export default class BlockModel extends Model {
  @attr content;
  @attr html;
  @attr reqId;
  @attr isReq;
}
