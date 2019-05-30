import { Meteor } from 'meteor/meteor';

import moment from 'moment';
import { Articles } from '../both';
import './publications'
// securise la corruption possible du .user

Meteor.users.deny({
  update() { return true;}
});

Meteor.startup(() => {
  // code to run on server at startup
});

/** =================================================================================
 * SEARCH TEXT
 *  =================================================================================
 */

Messages = new Mongo.Collection("messages");

if (Meteor.isClient) {
  Template.search.events({
    "submit #search": function (e) {
      e.preventDefault();
      Session.set("searchValue", $("#searchValue").val());
    }
  });

  Template.search.helpers({
    messages: function() {
      Meteor.subscribe("search", Session.get("searchValue"));
      if (Session.get("searchValue")) {
        return Messages.find({}, { sort: [["score", "desc"]] });
      } else {
        return Messages.find({});
      }
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    Messages._ensureIndex({
      "value": "text"
    });
    seed();
  });

  Meteor.publish("search", function(searchValue) {
    if (!searchValue) {
      return Messages.find({});
    }
    console.log("Searching for ", searchValue);
    var cursor = Messages.find(
      { $text: {$search: searchValue} },
      {
        /*
         * `fields` is where we can add MongoDB projections. Here we're causing
         * each document published to include a property named `score`, which
         * contains the document's search rank, a numerical value, with more
         * relevant documents having a higher score.
         */
        fields: {
          score: { $meta: "textScore" }
        },
        /*
         * This indicates that we wish the publication to be sorted by the
         * `score` property specified in the projection fields above.
         */
        sort: {
          score: { $meta: "textScore" }
        }
      }
    );
    return cursor;
  });
}

function seed() {
  if (!Messages.findOne({})) {
    Messages.insert({title: "Cookie", value: "Cookie"});
    Messages.insert({title: "Cake", value: "Cake"});
    Messages.insert({title: "Existential", value: "I like eating pancakes."});
    Messages.insert({title: "Sugar overdose", value: "I enjoy baking cake cake cakes cakes."});
  }
}

/** =================================================================================
 * Insère les données du fichier 'sample-articles.json' dans la collection articles
 *  =================================================================================
 */ 
insertSampleData = function() {
  // Chargement du fichier
  let json = JSON.parse(Assets.getText('sample-articles.json'));

  // Récupération des utilisateurs 
  let arrayUserIds = Meteor.users.find().fetch().map(user => user._id);

  if(arrayUserIds.length == 0) {
    console.log('Erreur: Nécessite au moins un utilisateur dans la collection Meteor.users');
  }

  // On parcourt tous les articles du fichier chargé
  let hour = 1;
  json.reverse().forEach(article => {
    // On défini un ownerId en prenant un id utilisateur au hazard
    article.ownerId = arrayUserIds[Math.floor(Math.random()*arrayUserIds.length)];
    // On sépare tous les articles d'une heure
    article.createdAt = moment().subtract(hour--, 'hour').toDate();
    // On insère l'article
    Articles.insert(article);
  });
  console.log('Remplissage de la base terminée');
}
