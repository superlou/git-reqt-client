import JSONAPISerializer from '@ember-data/serializer/json-api';

export default class DocSerializer extends JSONAPISerializer {
  serialize(snapshot, options) {
    let json = super.serialize(...arguments);

    let blocks_data = snapshot.hasMany('blocks').map((block) => {
      return {
        type: block.modelName,
        id: block.id,
      };
    });

    json.data.relationships = {
      blocks: {
        data: blocks_data,
      }
    };

    return json;
  }
}
