import { FlowRouter } from 'meteor/ostrio:flow-router-extra';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';

/*  Exemple de paramètre
FlowRouter.route('/test/:monParam', {
    action() {
        console.log('Route test ');
    }
}); */

//affichage du template Layout
FlowRouter.route('/', {
    action() {
        BlazeLayout.render('layout', { main: 'home'});
    }
});

FlowRouter.route('/article/create', {
    action() {
        BlazeLayout.render('layout', { main: 'article_create_form'});
    }
});

FlowRouter.route('/article/:articleId', {
    action() {
        BlazeLayout.render('layout', { main: 'article_page'});
    }
});

FlowRouter.route('/article/:articleId/edit', {
    action() {
        BlazeLayout.render('layout', { main: 'article_edit_form'});
    }
});
