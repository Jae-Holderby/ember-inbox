import DS from 'ember-data';

export default DS.RESTAdapter.extend({
  host: "http://localhost:8082",
  namespace: "api",
  defaultSerializer: 'application.js'
});
