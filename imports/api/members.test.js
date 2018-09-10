import {Meteor} from 'meteor/meteor';
import faker from 'faker';

import {Members} from './members';

if (Meteor.isServer) {
    describe('Add member', function () {
        it('can add a new member', () => {
            // THEREFORE, IF THIS CODE RUNS WITHOUT ERROR,
            // THEN TEST IS SUCCESSFUL :)
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
            });
        });
    });
}
