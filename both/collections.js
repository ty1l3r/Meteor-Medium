import SimpleSchema from 'simpl-schema';
import { check } from 'meteor/check';
export const Articles = new Mongo.Collection('articles');

export const Comments = new Mongo.Collection('comments');

// simple schema // le {check intégre la validation du module check pour 
// éviter les conflits.}

export const articleUpsertSchema = new SimpleSchema({
    title: {
        type: String,
        min: 3,
        max: 30
    },

    content: {
        type: String, 
        min: 3,
        max: 4000
    },

    id: {
        type: String, 
        optional: true

    }

}, { check}); 

export const commentInsertSchema = new SimpleSchema({
    content: {
        type: String,
        min: 3,
        max: 500
    },
    articleId: {
        type: String
    }
}, { check });
