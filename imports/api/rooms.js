import {Mongo} from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

// USE THIS TO AUTO-CREATE A FORM IN YOUR CLIENT SIDE UI
SimpleSchema.extendOpitons(['autoform']);

const Rooms = new Mongo.Collection('rooms');

Rooms.allow({ // ALLOW (OR NOT) DB FUNCTIONS DIRECTLY FROM CLIENT (SKIPPING THE SERVER)
   insert() { return false; },
   update() { return false; },
   remove() { return false; },
});
Rooms.deny({ // DENY (OR NOT) DB FUNCTIONS DIRECTLY FROM CLIENT (SKIPPING THE SERVER)
   insert() { return true; },
   update() { return true; },
   remove() { return true; },
});

const RoomSchema = new SimpleSchema({
    roomNumber: {type: Number},
    checkIn: {type: Date},
    checkOut: {type: Date},
    tenantId: {
        type: String,
        autoform: {
            type: 'select',
            options: function(){
                return Members.find().map((p) => {
                    return { label: `${p.firstName} ${p.lastName}`, value: p._id };
                });
            }
        }
    },
    available: {
        type: Boolean,
        autoform: {
            type: 'boolean-select'
        }
    },
    needCleaning: {
        type: Boolean,
        autoform: {
            type: 'boolean-select'
        }
    },
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

Rooms.attachSchema(RoomSchema);

export default Rooms;