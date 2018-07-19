import { Meteor } from 'meteor/meteor';
// This creates the MongoDB collection and sets up the plumbing to get data to the client
import '../imports/api/tasks.js';

Meteor.startup(() => {
  // code to run on server at startup
});
