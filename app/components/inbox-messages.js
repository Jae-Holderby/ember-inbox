import Ember from 'ember';


export default Ember.Component.extend({


  actions: {

    toggleCheck(){
      let message = this.get("message")
      this.get("toggleCheck")(message);
    },
    toggleStar(){
      let message = this.get("message");
      this.get("toggleStar")(message);
    },
    toggleMessage(){
      let message = this.get("message")
      if(message.expanded){
        Ember.set(message, 'expanded', false)
      } else {
        Ember.set(message, 'expanded', true)
      }

    }

  }
});
