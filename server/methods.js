import {Meteor} from 'meteor/meteor';

import {Members} from '../imports/api/Members';
import {Rooms} from '../imports/api/rooms';

//  insecure LIBRARY CAN PREVENT REST API,
//  THEREFORE, RUN: meteor remove insecure
//  THEN YOU CAN CREATE REST API WITH THIS CODE ...
Meteor.methods({ // BUT PUT THIS CODE IN SERVER
    insertMember: (x) => {
        Members.insert(x)
    },
    insertRoom: (x) => {
        Rooms.insert(x)
    },
    updateRoom: (x) => {
        const {checkIn, checkOut, tenantID, available, needCleaning} = x.modifier.$set;
        Rooms.update(x._id, {$set: {checkIn, checkOut, tenantID, available, needCleaning}});
    },
});
