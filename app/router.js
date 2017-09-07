import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route("messages");
  this.route("people");
  this.route("product");
  this.route("items");
});

export default Router;
