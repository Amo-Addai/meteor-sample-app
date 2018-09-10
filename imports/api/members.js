import {Mongo} from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

// USE THIS TO AUTO-CREATE A FORM IN YOUR CLIENT SIDE UI
SimpleSchema.extendOpitons(['autoform']);

const Members = new Mongo.Collection('members');

Members.allow({ // ALLOW (OR NOT) DB FUNCTIONS DIRECTLY FROM CLIENT (SKIPPING THE SERVER)
    insert() { return false; },
    update() { return false; },
    remove() { return false; },
});
Members.deny({ // DENY (OR NOT) DB FUNCTIONS DIRECTLY FROM CLIENT (SKIPPING THE SERVER)
    insert() { return true; },
    update() { return true; },
    remove() { return true; },
});

const MemberSchema = new SimpleSchema({
    firstName: {type: String},
    lastName: {type: String},
    member: {type: String},
    street: {type: String},
    city: {type: String},
    state: {type: String},
    zip: {type: String},
    lastCheckout: {type: Date},
    numberOfNights: {type: Number},
    preferences: {type: String},
    // AUTOMATICALLY CREATED FOR YOU THOUGH
    createdAt: {
        type: Date,
        autoform: {
            type: "hidden",
            label: false
        },
        defaultValue: new Date()
    }
});

Members.attachSchema(MemberSchema);

export default Members;