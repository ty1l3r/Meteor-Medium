import './navbar.html';

Template.navbar.events({
    'click .js-open-login-modal'(event, instance) {
        Modal.show('login_modal');
    },
    'click .js-logout'(event, instance) {
        Meteor.logout();
    }
});

// éffacer la modale du formulaire (petit carée blanc) avec la fonction autorun
Template.login_modal.onCreated(function () {
    this.autorun(() => {
        if (Meteor.userId()) {
            Modal.hide('login_modal');
        }
    });
});
