import { Articles } from '../../../both';
import { FlowRouter } from 'meteor/ostrio:flow-router-extra';

import './article.html';

Template.article_create_form.events({
    'submit .js-create-article'(event, instance) {
        event.preventDefault();

        const title = event.target.title.value;
        const content = event.target.content.value;

 /*   Code qui a été transférer dans les méthods (securité)
 
        let articleDoc = {
            title: title,
            content: content,
            createdAt: new Date(),
            ownerId: Meteor.userId()
        };

        Articles.insert(articleDoc);
*/
        // appel des Methods

        Meteor.call('insertArticle', { title: title, content: content });

        event.target.title.value = '';
        event.target.content.value = '';
    }
});

 // retourn la variable Artciles dans article.html
 // dans fin({},{}) en deuxième paramètre classer les articles par date
Template.article_list.helpers({
    articles() {
        return Articles.find({}, {sort: {createdAt: -1}}).fetch();
    }
});

//retourn Article dans l'affichage des articles
Template.article_page.helpers({
    article() {
        return Articles.findOne({ _id: FlowRouter.getParam('articleId') });
    }
})

// affihce l'Edit des articles
Template.article_edit_form.helpers({
    article() {
        return Articles.findOne({ _id: FlowRouter.getParam('articleId') });
    }
})

//========= Modification d'un article  Fonction update ======= //

Template.article_edit_form.events({
    'submit .js-edit-article'(event, instance) {
        event.preventDefault();

        const title = event.target.title.value;
        const content = event.target.content.value;

      /*  déplacé dans les methods (sécurité)
        Articles.update({ _id: FlowRouter.getParam('articleId')}, { $set: { title: title, content: content }});
      */
        
        Meteor.call('updateArticle', FlowRouter.getParam('articleId'), { title: title, content: content });
        
        FlowRouter.go('/article/:articleId', { articleId: FlowRouter.getParam('articleId') });
    },

    // Supprime l'entrée du placeholder
    'click .js-delete-article'(event, instance) {

        /*  Transferé dans les Méthods pour sécurité. 
        Articles.remove( { _id: FlowRouter.getParam('articleId') });
        */
        
        Meteor.call('removeArticle', FlowRouter.getParam('articleId'));

        FlowRouter.go('/');
    }
});
