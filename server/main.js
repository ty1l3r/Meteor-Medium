import { Meteor } from 'meteor/meteor';
import '../both';

// securise la corruption possible du .user

Meteor.users.deny({
  update() { return true;}
});

Meteor.startup(() => {
  // code to run on server at startup
});
