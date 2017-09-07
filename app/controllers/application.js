import Ember from 'ember';

export default Ember.Controller.extend({
  allSelected: false,
  someSelected: false,
  noneSelected: true,
  showComposeForm: false,
  unreadMessages: Ember.computed(countUnread),

  actions: {

    //inbox-message functions

    toggleCheck(message) {
      let model = this.get('model.messages').content
      let toolbar = this.get('toolbar')
      if (message._data.selected){
        Ember.set(message._data, "selected", false)
      } else {
        Ember.set(message._data, "selected", true)
        }
        var messagesSelected = model.filter((messages) => {
          return message._data.selected === true
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



    toggleStar(message) {
      if (message.starred){
        Ember.set(message, "starred", false)
      } else {
        Ember.set(message, "starred", true)
        }
      },

  //tool-bar functions

    applyLabel(){
     let model = this.get('model').messages.content
     let addLabel = event.srcElement.value
     model.forEach((model) => {
       if(model._data.selected && !model._data.labels.includes(addLabel)) {
       Ember.set(model._data, "labels", [addLabel].concat(model._data.labels).sort())
       }
     })
   },

    removeLabel(){
     let model = this.get('model').messages.content
     let removeLabel = event.srcElement.value
     model.forEach((model) => {
       if(model._data.selected) {
       let array = model._data.labels.filter((label) => {
           return label !== removeLabel
         })
       Ember.set(model._data, "labels", array)
       }
     })
   },

   toggleComposeForm(){
     let showing = this.get('showComposeForm')
     if(showing){
       this.set('showComposeForm', false)
     } else {
       this.set('showComposeForm', true)
     }
   },
   toggleChecked() {
     let model = this.get('model').messages.content
     this.toggleProperty("allSelected")
     this.set("someSelected", false)
       model.forEach((model) => {
         if(this.get('allSelected')) {
           Ember.set(model._data, 'selected', true)
           this.set('noneSelected', false)
         } else {
           Ember.set(model._data, 'selected', false)
           this.set('noneSelected', true)
         }
       });
   }
  }
});
function countUnread(){
  return this.get('model.messages.content').filter((message) => {
      return message._data.read === false
  }).length
}
