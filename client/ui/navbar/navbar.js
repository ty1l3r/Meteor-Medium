import './navbar.html';
import { FlowRouter } from 'meteor/ostrio:flow-router-extra';

Template.navbar.events({
    'click .js-open-login-modal'(event, instance) {
        Modal.show('login_modal');
    },
    'click .js-logout'(event, instance) {
        Meteor.logout();
    },
    'click .js-goto-create-article'(event, instance) {
    // redirection ou pas sur la modale connection avec Session
        if (Meteor.userId()) {
            FlowRouter.go('/article/create');
        } else {
            Session.set('redirection', '/article/create');
            Modal.show('login_modal');
        }
       
    }

});

// éffacer la modale du formulaire (petit carée blanc) avec la fonction autorun
Template.login_modal.onCreated(function () {
    this.autorun(() => {
        if (Meteor.userId()) {
            Modal.hide('login_modal');
            if (Session.get('redirection')) {
                FlowRouter.go(Session.get('redirection'));
                Session.set('redirection', undefined);
            }
                
        }
    });
});
