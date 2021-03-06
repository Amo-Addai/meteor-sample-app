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

    Meteor.publish('SAMPLE_PLUBISHER', () => {

        this.added(() => {
            // .changed(), removed, ready, onStop, stopped, error, connection() TOO DEY :)
            this.stop(); // THIS CANCELS THE CURRENT CLIENT'S SUBSCRIPTION
            // AND THEN INVOKES this.onStop() WITHOUT RAISING AN ERROR
        });

        const interval = Meteor.setInterval(()=>{console.log(".")}, POLL_INTERVAL);

        this.onStop(() => { // THIS CODE WILL RUN WHEN ANY CLIENT UNSUBSCRIBES TO THIS 'SAMPLE PUBLISHER'
            Meteor.clearInterval(interval);
        });

        return [];
    });
    // curl 'localhost:3000/publications/SAMPLE_PLUBISHER' -> returns []
    //  OR
    /* # First, we need to "login" on the commandline to get an access token
    $ curl localhost:3000/users/SAMPLE_PLUBISHER  -H "Content-Type: application/json" --data '{"email": "user@example.com", "password": "password"}'
    {
        "id": "wq5oLMLi2KMHy5rR6",
        "token": "6PN4EIlwxuVua9PFoaImEP9qzysY64zM6AfpBJCE6bs",
        "tokenExpires": "2016-02-21T02:27:19.425Z"
    }

    # Then, we can make an authenticated API call
    $ curl localhost:3000/publications/SAMPLE_PLUBISHER -H "Authorization: Bearer 6PN4EIlwxuVua9PFoaImEP9qzysY64zM6AfpBJCE6bs"
    {
        "Lists": [
        {
            "_id": "92XAn3rWhjmPEga4P",
            "name": "My Private List",
            "incompleteCount": 5,
            "userId": "wq5oLMLi2KMHy5rR6"
        }
    ]
    } */


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
            const m = {
                firstName, lastName,
                member, street, city,
                state, zip, lastCheckout,
                numberOfNights, preferences,
                createdAt: new Date()
            };
            Members.insert(m);
            // YOU CAN CALL A METHOD FROM methods.js
            Meteor.call('insertMember', {m});
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
            const r = {
                roomNumber, checkIn, checkOut,
                tenandID: "No one",
                available: true,
                needCleaning: true,
                createdAt: new Date()
            };
            Rooms.insert(r);
            // YOU CAN CALL A METHOD FROM methods.js
            Meteor.call('insertRoom', {r});

            return roomNumber;
        })
    }

});
