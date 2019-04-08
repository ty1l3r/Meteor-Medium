import './comment.html';
import { FlowRouter } from 'meteor/ostrio:flow-router-extra';
import { Comments } from '../../../both';

//================== CREATE COMMENTAIRES EVENTS =========================

Template.comment_form.events({
    'submit .js-create-comment'(event, instance) {
        event.preventDefault();

        const content = event.target.content.value;

     /* ====== =====Transferé dans Methods pour sécurité
        let commentDoc = {
            content: content, 
            articleId: FlowRouter.getParam('articleId'),
            createdAt: new Date(),
            ownerId: Meteor.userId()
        }
        Comments.insert(commentDoc);
    */   
        //insertion de la Method
        Meteor.call('insertComment', {
            content: content, articleId: FlowRouter.getParam('articleId'),
            function(err, res) {
                if (!err) {
                    event.target.content.value = ''; //vide le champ d'écriture
                }
               
            }   
        });
        
    }
});

//================== READ COMMENTAIRES HELPERS =========================

// affichage des articles avec l'Id Correspondante

Template.comment_list.helpers({
    comments() {
        return Comments.find({ articleId: FlowRouter.getParam('articleId') },
        { sort: {createdAt: 1 }});
    }
});
