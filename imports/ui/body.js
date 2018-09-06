import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import { Members } from '../api/members';
import { Rooms } from '../api/rooms';
import './body.html';
import './members.html';
import './rooms.html';

Template.body.onCreated(function(){
    // YOU CAN SUBSCRIBE TO APIs THAT HAVE BEEN PUBLISHED IN TEH API
    // THIS FEATURE IS CALLED pub-sub (PUBLISH-SUBSCRIBE)
    Meteor.subscribe('members.allMembers');
    Meteor.subscribe('rooms.allRooms');
});

Template.members.helpers({
    members() {
        return Members.find();
    }
})
Template.rooms.helpers({
    rooms() {
        return Rooms.find();
    }
})

