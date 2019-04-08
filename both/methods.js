import { Articles, Comments, articleUpsertSchema} from './collections';
import { check } from 'meteor/check';

//si grande application plusieurs dossier sont possible

Meteor.methods({

    //======= CREATION ============================

    insertArticle(article) {

        //code SimpleSchema
        articleUpsertSchema.validate(article);

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
        
        check(article, {
            id:String,
            title: String,
            content: String
        });

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
