import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ["row", "toolbar"],

  actions: {

  toggleChecked() {
    let model = this.get('model')
    this.toggleProperty("allSelected")
    this.set("someSelected", false)
      model.forEach((model) => {
        if(this.get('allSelected')) {
          Ember.set(model, 'selected', true)
          this.set('noneSelected', false)
        } else {
          Ember.set(model, 'selected', false)
          this.set('noneSelected', true)
        }
      });
  },
  markRead() {
    let model = this.get('model')
    model.forEach((model) => {
      if(model.selected){
        Ember.set(model, 'read', true)
      }
    })
    this.set("unreadMessages", countUnread(model))
  },
  markUnread() {
    let model = this.get('model')
    model.forEach((model) => {
      if(model.selected){
        Ember.set(model, 'read', false)
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
      if(model.selected){
        Ember.set(model, 'deleted', true)
        Ember.set(model, "selected", false)
        Ember.set(model, "read", true)
        }
      })
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
      this.set("unreadMessages", countUnread(model))
    },
    toggleComposeForm(){
      this.get("toggleComposeForm")();
    }
  }
});

function countUnread(model){
    return model.filter((message) => {
      return message.read === false
  }).length
}
