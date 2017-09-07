import DS from 'ember-data';

export default DS.Model.extend({
  subject: DS.attr(),
  starred: DS.attr('boolean'),
  read: DS.attr('boolean'),
  labels: DS.attr('labels')
});
