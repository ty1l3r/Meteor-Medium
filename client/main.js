import { Articles, Comments } from '../both'; //import des collections
import { FlowRouter } from 'meteor/ostrio:flow-router-extra';
import './startup/router';
import './ui/layout/layout';
import { Meteor } from 'meteor/meteor';

if (Meteor.isDevelopment) {
    window.FlowRouter = FlowRouter;
    window.Articles = Articles;
    window.Comments = Comments;
}
