import SimpleSchema from 'simpl-schema';
import { check } from 'meteor/check';
export const Articles = new Mongo.Collection('articles');

export const Comments = new Mongo.Collection('comments');

// simple schema

export const articleUpsertSchema = new SimpleSchema({
    title: {
        type: String,
        max: 30
    },

    content: {
        type: String, 
        max: 4000
    },

    id: {
        type: String, 
        optional: true

    }

}, { check}); 
