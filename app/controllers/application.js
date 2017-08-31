import Ember from 'ember';

export default Ember.Controller.extend({
  allSelected: false,
  someSelected: false,
  noneSelected: true,
  unreadMessages: Ember.computed(countUnread),
  actions: {

    //inbox-message functions

    toggleCheck(message) {
      let model = this.get('model')
      let toolbar = this.get('toolbar')
      if (message.selected){
        Ember.set(message, "selected", false)
      } else {
        Ember.set(message, "selected", true)
        }
        var messagesSelected = model.filter((messages) => {
          return messages.selected === true
        })
        if(messagesSelected.length === model.length){
          this.set('allSelected', true)
          this.set('someSelected', false)
          this.set('noneSelected', false)
        } else if(messagesSelected.length === 0) {
          this.set('allSelected', false)
          this.set('someSelected', false)
          this.set('noneSelected', true)
        } else {
          this.set('allSelected', false)
          this.set('someSelected', true)
          this.set('noneSelected', false)
        }
      },

    //tool-bar functions

    toggleStar(message) {
      if (message.starred){
        Ember.set(message, "starred", false)
      } else {
        Ember.set(message, "starred", true)
        }
      },

    applyLabel(){
     let model = this.get('model')
     let addLabel = event.srcElement.value
     model.forEach((model) => {
       if(model.selected && !model.labels.includes(addLabel)) {
       Ember.set(model, "labels", [addLabel].concat(model.labels).sort())
       }
     })
   },

    removeLabel(){
     let model = this.get('model')
     let removeLabel = event.srcElement.value
     model.forEach((model) => {
       if(model.selected) {
       let array = model.labels.filter((label) => {
           return label !== removeLabel
         })
       Ember.set(model, "labels", array)
       }
     })
   }
  }
});

function countUnread(){
  return this.get('model').filter((message) => {
      return message.read === false
  }).length
}
