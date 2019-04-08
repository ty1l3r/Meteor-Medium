import { Articles, Comments } from './collections';
import { check } from 'meteor/check';

//si grande application plusieurs dossier sont possible

Meteor.methods({

    //======= CREATION ============================

    insertArticle(article) {

        check(article, {
            title: String,
            content: String,
        });

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
    
    updateArticle(articleId, article) {
        
        check(articleId, String);
        check(article, {
            title: String,
            content: String
        });

            Articles.update({ _id: articleId },
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

                Articles.remove( { _id: articleId});
            },

    //========= CREATE COMMENTAIRES ================
            
    insertComment(comment) {

        check(comment, {
            articleId: String,
            content: String
        });

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
