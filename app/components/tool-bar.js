import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ["row", "toolbar"],

  actions: {

  toggleChecked(){
    this.get('toggleChecked')();
  },
  markRead() {
    let model = this.get('model')
    model.forEach((model) => {
      if(model._data.selected){
        Ember.set(model._data, 'read', true)
      }
    })
    this.set("unreadMessages", countUnread(model))
  },
  markUnread() {
    let model = this.get('model')
    model.forEach((model) => {
      if(model._data.selected){
        Ember.set(model._data, 'read', false)
      }
    })
    this.set("unreadMessages", countUnread(model))
  },
  applyLabel(){
    this.get('applyLabel')()
  },
 removeLabel(){
   this.get('removeLabel')()
 },
  hide(unreadMessages){
    let model = this.get('model')
    model.forEach((model) => {
      if(model._data.selected){
        Ember.set(model._data, 'deleted', true)
        Ember.set(model._data, "selected", false)
        Ember.set(model._data, "read", true)
        }
      })
      var messagesSelected = model.filter((messages) => {
        return messages._data.selected === true
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
      this.set("unreadMessages", countUnread(model))
    },
    toggleComposeForm(){
      this.get("toggleComposeForm")();
    }
  }
});

function countUnread(model){
    return model.filter((message) => {
      return message._data.read === false
  }).length
}
