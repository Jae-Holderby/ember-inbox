import Ember from 'ember';


export default Ember.Component.extend({


  actions: {

    toggleCheck() {
      let message = this.get('message')
      if (message.selected){
        Ember.set(message, "selected", false)
      } else {
        Ember.set(message, "selected", true)
        }
      },

    toggleStar() {
      let message = this.get('message')
      if (message.starred){
        Ember.set(message, "starred", false)
      } else {
        Ember.set(message, "starred", true)
        }
      }
  }
});
