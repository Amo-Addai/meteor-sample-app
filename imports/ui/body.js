import {Meteor} from 'meteor/meteor';
import {Template} from 'meteor/templating';

import {Members} from '../api/members';
import {Rooms} from '../api/rooms';
import './body.html';
import './members.html';
import './rooms.html';
import './main.html';
import './navigation.html';
import './emptyRooms.html';

// THIS SETS THE DEFAULT TEMPLATE STYLING TO materialize (SO YOU CAN USE IT WELL)
AutoForm.setDefaultTemplate('materialize');

// YOU NEED TO SET THESE TO BE ABLE TO USE AUTO-FORMS
window.Members = Members;
window.Rooms = Rooms;

// LIKE onCreate() ON ANDROID
Template.body.onCreated(function () {
    // YOU CAN SUBSCRIBE TO APIs THAT HAVE BEEN PUBLISHED IN TEH API
    // THIS FEATURE IS CALLED pub-sub (PUBLISH-SUBSCRIBE)
    Meteor.subscribe('members.allMembers');
    Meteor.subscribe('rooms.allRooms');
});

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
    },
    someProp: [] // THEREFORE, THIS PROP CAN ALSO BE USED WITHIN THE TEMPLATE
});


Template.rooms.helpers({
    rooms() {
        return Rooms.find({available: true});
    },
    someProp: []
});
Template.room.helpers({
    makeUniqueID(){
        return this._id;
    },
    returnName(tenantID) {
        const member = Members.findOne({_id: tenantID});
        return `${member.firstNname} ${member.lastName}`;
    }
});


Template.emptyRooms.helpers({
    emptyRooms() {
        return Rooms.find();
    },
    someProp: []
});
Template.emptyRoom.helpers({
    makeUniqueID(){
        return this._id;
    },
    returnName(tenantID) {
        const member = Members.findOne({_id: tenantID});
        return `${member.firstNname} ${member.lastName}`;
    }
});


// LIKE componentDidMount() ON REACT
Template.members.onRendered(() => {
    $('#modal1').modal(); // YOU CAN USE jQuery OVER HERE!!
});
// LIKE componentDidMount() ON REACT
Template.rooms.onRendered(() => {
    $('.collapsible').collapsible(); // YOU CAN USE jQuery OVER HERE!!
});


//  CREATING ROUTES FOR THE APPLICATION (USING THE MAIN TEMPLATE 'layout' :)
Router.route("/", function () {
    this.layout('layout');
    this.render('main');
});
Router.route("/emptyRooms", function () {
    this.layout('layout');
    this.render('emptyRooms');
});