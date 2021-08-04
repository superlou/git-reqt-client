import EmberRouter from '@ember/routing/router';
import config from 'requirement-thing/config/environment';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function () {
  this.route('documents');
  this.route('document', { path: '/document/:document_id' });
});
