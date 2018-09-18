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

// Actually register the method with Meteor's DDP system (USING THE ADVANCED METEOR METHOD BOILERPLATE :)
Meteor.methods({
    [updateText.name]: function (args) {
        updateText.validate.call(this, args);
        updateText.run.call(this, args);
    }
});

export const updateText = {
    name: 'todos.updateText',

    // Factor out validation so that it can be run independently (1)
    validate(args) {
        new SimpleSchema({
            todoId: { type: String },
            newText: { type: String }
        }).validate(args)
    },

    // Factor out Method body so that it can be called independently (3)
    run({ todoId, newText }) {
        const todo = Todos.findOne(todoId);

        if (!todo.editableBy(this.userId)) {
            throw new Meteor.Error('todos.updateText.unauthorized',
                'Cannot edit todos in a private list that is not yours');
        }

        Todos.update(todoId, {
            $set: { text: newText }
        });
    },

    // Call Method by referencing the JS object (4)
    // Also, this lets us specify Meteor.apply options once in
    // the Method implementation, rather than requiring the caller
    // to specify it at the call site.
    call(args, callback) {
        const options = {
            returnStubValue: true,     // (5)
            throwStubExceptions: true  // (6)
        };

        Meteor.apply(this.name, [args], options, callback);
    }
};

/*
//  THEREFORE, YOU CAN PUT THIS IN THE CLIENT SIDE TO CALL THE ADVANCED BOILERPLATE METHOD
//  OR EVEN YOU CAN ALSO CHOOSE TO CALL THE PARTICULAR .validate() / .call() METHODS SEF
import { updateText } from './path/to/methods.js'; // IMPORT THIS FILE IN CLIENT FOLDER :)
// Call the Method
updateText.call({
    todoId: '12345',
    newText: 'This is a todo item.'
}, (err, res) => {
    if (err) {
        alert(err);
    } else {
        // success!
    }
});
// Call the validation only
updateText.validate({ wrong: 'args'});
// Call the Method with custom userId in a test
updateText.run.call({ userId: 'abcd' }, {
    todoId: '12345',
    newText: 'This is a todo item.'
});
*/

//  METEOR VALIDATED MEHTODS -
import { ValidatedMethod } from 'meteor/mdg:validated-method';

export const updateText = new ValidatedMethod({
    name: 'todos.updateText',
    validate: new SimpleSchema({
        todoId: { type: String },
        newText: { type: String }
    }).validator(),
    run({ todoId, newText }) {
        const todo = Todos.findOne(todoId);

        if (!todo.editableBy(this.userId)) {
            throw new Meteor.Error('todos.updateText.unauthorized',
                'Cannot edit todos in a private list that is not yours');
        }

        Todos.update(todoId, {
            $set: { text: newText }
        });
    }
});

// CREATE SERVER-SIDE / REST API (HTTP REQUESTS) ROUTES
Router.route('/url', function(){ // THIS IS THE MIDDLEWARE HANDLER
    var req = this.request, res = this.response;
    res.end('hello world from the server');
}, {where: 'server'});
