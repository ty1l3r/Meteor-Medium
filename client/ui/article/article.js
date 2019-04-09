import { Articles } from '../../../both';
import { FlowRouter } from 'meteor/ostrio:flow-router-extra';

import './article.html';

// ================ CREATE EVENTS =====================

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
        Meteor.call('insertArticle', { title: title, content: content }, function(err, articleId) {
                if (!err) {
                    event.target.title.value = '';
                    event.target.content.value = '';

                    //redirection sur la page de création de l'article, il faut rester sur le callback
                    FlowRouter.go('/article/:articleId', { articleId: articleId });
                 }
            
        });

    }
});
//nombre d'articles par pages
const NUM_ARTICLE_IN_PAGE = 10;

Template.article_list.onCreated(function() { 
    this.autorun(() => {
        let currentPage = +FlowRouter.getParam('page') || 1;
        let skip = (currentPage - 1) * NUM_ARTICLE_IN_PAGE;

        this.subscribe('articles.list', skip, NUM_ARTICLE_IN_PAGE);
    });
});

/* ================ HELPERS =====================
===============================================*/
//Variable 

 // retourne la variable Artciles dans article.html
 // dans fin({},{}) en deuxième paramètre classer les articles par date
Template.article_list.helpers({
    articles() {
        return Articles.find({}, {sort: {createdAt: -1}}).fetch();
    },

//calcul le nombre de page
pages() {
    let articlesCount = Counts.get('articlesCount');
    let pagesCount = Math.ceil(articlesCount / NUM_ARTICLE_IN_PAGE);

    let currentPage = +FlowRouter.getParam('page') || 1;

    // [{index: 1, active: true}, {index: 2, active: false}]
    let pages = [];
    for(let i = 1; i < pagesCount +1; i++) {
        pages.push({index: i, active: i === currentPage});
    }

    return pages;
}
});

//CallBack pour le subscribe
Template.article_page.onCreated(function () {
    this.subscribe('article.single', FlowRouter.getParam('articleId'));
});

//retourne Article dans l'affichage des articles
Template.article_page.helpers({
    article() {
        return Articles.findOne({ _id: FlowRouter.getParam('articleId') });
    }
})

Template.article_edit_form.onCreated(function () {
    this.subscribe('article.single', FlowRouter.getParam('articleId'));
});

// affihce l'Edit des articles
Template.article_edit_form.helpers({
    article() {
        return Articles.findOne({ _id: FlowRouter.getParam('articleId') });
    }
})

Template.article_edit_form.events({
    'submit .js-edit-article'(event, instance) {
        event.preventDefault();

        const title = event.target.title.value;
        const content = event.target.content.value;

    //déplacé dans les methods (sécurité)
    // Articles.update({ _id: FlowRouter.getParam('articleId')}, { $set: { title: title, content: content }});
      
        Meteor.call('updateArticle', { id: FlowRouter.getParam('articleId'), title: title, content: content }, 
            function(err, res) {
                if(!err) {
                    FlowRouter.go('/article/:articleId', { articleId: FlowRouter.getParam('articleId') });
                }
            }

        );
        
    },

    // Supprime l'entrée du placeholder
    'click .js-delete-article'(event, instance) {

        /*  Transferé dans les Méthods pour sécurité. 
        Articles.remove( { _id: FlowRouter.getParam('articleId') });
        */
        
        Meteor.call('removeArticle', FlowRouter.getParam('articleId'), function (err, res) {
            if(!err) FlowRouter.go('/');
        });

    }
});
