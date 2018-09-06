import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import { Members } from '../api/members';
import { Rooms } from '../api/rooms';
import './body.html';
import './members.html';
import './rooms.html';

// YOU NEED TO SET THESE TO BE ABLE TO USE AUTO-FORMS
window.Members = Members;
window.Rooms = Rooms;

// LIKE onCreate() ON ANDROID
Template.body.onCreated(function(){
    // YOU CAN SUBSCRIBE TO APIs THAT HAVE BEEN PUBLISHED IN TEH API
    // THIS FEATURE IS CALLED pub-sub (PUBLISH-SUBSCRIBE)
    Meteor.subscribe('members.allMembers');
    Meteor.subscribe('rooms.allRooms');
});

// LIKE componentDidMount() ON REACT
Template.members.onRendered(() => {
    $('#modal1').modal(); // YOU CAN USE jQuery OVER HERE!!
})

// THESE HELPERS ARE GENERAL TO ALL TEMPLATES
Template.registerHelper('formatDate', (date) => {
    // ACTUALLY, moment ISN'T A DEPENDENCY YOU INSTALLED WITH npm
    // THEREFORE, YOU DON'T NEED TO import { moment }
   return moment(date).format('MMM Do YYYY');
});

// THESE HELPERS ARE ONLY AVAILABLE FOR THE CORRESPONDING TEMPLATES
Template.members.helpers({
    members() {
        return Members.find();
    }
});
Template.rooms.helpers({
    rooms() {
        return Rooms.find();
    }
});

