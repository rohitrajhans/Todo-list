import { Template } from 'meteor/templating';
import { Tasks } from '../api/tasks.js';


import './body.html';

Template.body.helpers({
    tasks() {
        // console.log(Tasks.find({}));
        // console.log(Tasks.find({}));
        return Tasks.find({}, { sort: {createdAt: -1} });
    },
    // Tasks.find({}) will return the data from the collection stored in the database.
    // sort- sorts according to the time of creation. Latest -> oldest
    // sorts in ascending by key 1 and descending by -1
});

Template.body.events({
    // Listening to submit event on .add-task
    'submit .add-task'(event) {
        event.preventDefault();
        const target = event.target;
        //console.log(event, target, target.text);
        const text = target.text.value;

        Tasks.insert({
            text,
            createdAt: new Date()
        });

        target.text.value = "";
    }
})