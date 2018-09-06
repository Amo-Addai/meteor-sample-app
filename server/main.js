import {Meteor} from 'meteor/meteor';

import _ from 'lodash';
import faker from 'faker';

import {Members} from '../imports/api/Members';
import {Rooms} from '../imports/api/rooms';

Meteor.startup(() => {
    // code to run on server at startup

    Meteor.publish('rooms.vacantRooms', () => {
        return Rooms.find({available: true});
    });
    Meteor.publish('rooms.allRooms', () => {
        return Rooms.find();
    });

    Meteor.publish('members.allMembers', () => {
        return Members.find();
    });

    const numberMembers = Members.find().count();
    console.log(numberMembers + " members available");
    if (!numberMembers) { // SEEDING THD DB WITH Members
        console.log("NO MEMBERS, THEREFORE NOW SEEDING...");
        _.times(20, () => {
            const firstName = faker.name.firstName(),
                lastName = faker.name.lastName(),
                member = faker.internet.userName(),
                street = faker.address.streetAddress(),
                city = faker.address.city(),
                state = faker.address.state(),
                zip = faker.address.zipCode(),
                lastCheckout = faker.date.past(),
                numberOfNights = faker.random.number(40),
                preferences = faker.random.words();
            Members.insert({
                firstName, lastName,
                member, street, city,
                state, zip, lastCheckout,
                numberOfNights, preferences,
                createdAt: new Date()
            })
        })
    }

    const numberRooms = Rooms.find().count();
    console.log(numberRooms + " rooms available");
    if (!numberRooms) { // SEEDING THD DB WITH Rooms
        console.log("NO ROOMS, THEREFORE NOW SEEDING...");
        _.times(25, (roomNumber) => {

            roomNumber++; // INCREMENT SO IT'S ALWAYS UNIQUE!!
            const checkIn = faker.date.past(),
                checkOut = faker.date.future();
            Rooms.insert({
                roomNumber, checkIn, checkOut,
                tenandID: "No one",
                available: true,
                needCleaning: true,
                createdAt: new Date()
            })

            return roomNumber;
        })
    }

});
