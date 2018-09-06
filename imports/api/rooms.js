import {Mongo} from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

// USE THIS TO AUTO-CREATE A FORM IN YOUR CLIENT SIDE UI
SimpleSchema.extendOpitons(['autoform']);

const Rooms = new Mongo.Collection('rooms');

const RoomSchema = new SimpleSchema({
    roomNumber: {type: Number},
    checkIn: {type: Date},
    checkOut: {type: Date},
    tenantId: {type: String},
    available: {type: Boolean},
    needCleaning: {type: Boolean},
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