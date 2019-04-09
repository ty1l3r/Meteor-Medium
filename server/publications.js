/* Apres avoir supprimé autopublish, il n'y a plus aucun artcile affiché 
    côté client */

// code affichage avec Meteor.publish() On selectionne ici les valeur des champs a afficher ou non.

import { Articles, Comments } from '../both';
import { check } from 'meteor/check';

Meteor.publish('articles.list', function (skip, limit) {
    //page 2: 10, 10 => articles de 10 à 20
    //page 3: 20, 10 => articles de 20 à 30
    check(skip, Number);
    check(limit, Number);

    //trie, saute les article et classe par date
    let articleCursor = Articles.find({}, { fields: { content: 0 }, sort: { createdAt: -1 }, skip: skip, limit: limit});

    //récupération des id des auteurs des articles.
    let arrayArticle = articleCursor.fetch();

    //fonction.map renvois un tableau.
    let arrayOwnerId = arrayArticle.map(article => article.ownerId); // ["id1", "id2", "id2" (si même auteur)]
    //pour éviter les doublons on utilise le Set:
    let arrayUniqueOwnerId = Array.from(new Set(arrayOwnerId)); // ["id1", "id2"] (ID unique)

    //tmeasday:publish-counts / nombre de page.
    Counts.publish(this, 'articlesCount', Articles.find({}));

    return [
        articleCursor,
        //$in = qui est dans le tableau
        Meteor.users.find( {_id: { $in: arrayUniqueOwnerId}}, { fields: {profile: 1}})
    
    ];
});

Meteor.publish('article.single', function (articleId) {
    
    //validation avec check (pour éviter les conflits)
    check(articleId, String);

    //Récupération des Cursors
    let articleCursor = Articles.find({ _id: articleId });
    let commentCursor = Comments.find({articleId: articleId });

    //Récupération des id des auteurs des commentaires
    let arrayComment = commentCursor.fetch();
    let arrayOwnerId = arrayComment.map(comment => comment.ownerId);

    // on ajoute l'auteur de l'article
    let article = articleCursor.fetch().find(article => article._id === articleId);
    arrayOwnerId.push(article.ownerId);

    let arrayUniqueOwnerId = Array.from(new Set(arrayOwnerId));

    return [
        articleCursor,
        commentCursor,
        Meteor.users.find({_id: {$in: arrayUniqueOwnerId}},{ fields: {profile: 1}})
    ]

});
