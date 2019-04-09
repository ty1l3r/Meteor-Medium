import { Articles, Comments, articleUpsertSchema, commentInsertSchema} from './collections';
import { check } from 'meteor/check';

//si grande application plusieurs dossier sont possible

Meteor.methods({

    //======= CREATION ============================

    insertArticle(article) {

        //code SimpleSchema
        articleUpsertSchema.validate(article);

        // emepcher l'édition d'article si le client n'est pas inscrit.
        if (!this.userId) {
            throw new Meteor.Error('not-connected', 'user not connected');
        }

        let articleDoc = {
            title: article.title,
            content: article.content,
            createdAt: new Date(),
            ownerId: this.userId
        };

        return Articles.insert(articleDoc);
        //le return renvoi aussi l'id de l'article
        
    },

    //======== UPDATE ==============================
    
    updateArticle(article) {
        articleUpsertSchema.validate(article);

        // emepcher l'édition d'article si le client n'est pas inscrit.
        if (!this.userId) {
            throw new Meteor.Error('not-connected');
        }
        
        //chercher l'article avec l'Id
        let articleFound = Articles.findOne({_id: article.id});
        if (articleFound.ownerId !== this.userId) {
            throw new Meteor.Error('unauthorized', 'L\'utilisateur doit être l\'auteur de l\'article');
        }

            Articles.update({ _id: article.id},
                {
                    $set: {
                        title: article.title,
                        content: article.content
                    }
                });
        },

    //========== DELETE =============================
        
            removeArticle(articleId) {
                check(articleId, String);

        // emepcher l'édition d'article si le client n'est pas inscrit.
        if (!this.userId) {
            throw new Meteor.Error('not-connected', 'user not connected');
        }
                
              //chercher l'article avec l'Id
              let articleFound = Articles.findOne({ _id: articleId });
              // pas de bras, pas de chocolat.
              if (articleFound.ownerId !== this.userId) {
                  throw new Meteor.Error('unauthorized',
                      'L\'utilisateur doit être l\'auteur de l\'article');
              }

                Articles.remove( { _id: articleId});
            },

    //========= CREATE COMMENTAIRES ================
            
    insertComment(comment) {
        commentInsertSchema.validate(comment);

        // emepcher l'édition d'article si le client n'est pas inscrit.
        if (!this.userId) {
        throw new Meteor.Error('not-connected', 'user not connected');
         }

        let commentDoc = {
            content: comment.content, 
            articleId: comment.articleId,
            createdAt: new Date(),
            ownerId: this.userId
            // this.userId permet de ne pas introduire l'userId dans les paramètres
            // de la fonction (sinon un autre utilisateur peut usurper l'identité de l'user)
        }

        Comments.insert(commentDoc);
    }
});
