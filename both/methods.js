import { Articles, Comments } from './collections';

//si grande application plusieurs dossier sont possible

Meteor.methods({

    insertArticle(article) {
        let articleDoc = {
            title: article.title,
            content: article.content,
            createdAt: new Date(),
            ownerId: this.userId
        };

        Articles.insert(articleDoc);
        
    },

        updateArticle(articleId, article) {
            Articles.update({ _id: articleId },
                {
                    $set: {
                        title: article.title,
                        content: article.content
                    }
                });
        },

            removeArticle(articleId) {
                Articles.remove( { _id: articleId});
            },

    insertComment(comment) {

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
