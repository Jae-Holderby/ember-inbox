import DS from 'ember-data';
import Ember from 'ember';
var inflector = new Ember.Inflector(Ember.Inflector.defaultRules);

export default DS.RESTSerializer.extend({
  normalizeResponse(store, primaryModelClass, payload, id, requestType){
    return {
      data: payload["_embedded"][inflector.pluralize(primaryModelClass.modelName)].map(function(record){
        return {
          type: primaryModelClass.modelName,
          id: record.id,
          attributes: record
        };
      })
    };
  }
});
