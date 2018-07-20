import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
import { Tasks } from '../api/tasks.js';

import './task.js';
import './body.html';

Template.body.onCreated( function bodyOnCreated() {
    this.state = new ReactiveDict();
});


Template.body.helpers({
    tasks() {
        const instance = Template.instance();
        if (instance.state.get('hideTasks')) {
            // if hide tasks is selected then display only those uncompleted tasks
            return Tasks.find({ checked: {$ne: true}}, { sort: {createdAt: -1}});
        }
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
            createdAt: new Date(),
            owner: Meteor.userId(),
            username: Meteor.user().username
        });

        target.text.value = "";
    },
    'change .hide-tasks input'(event, instance) {
        instance.state.set('hideTasks', event.target.checked);
    }
});