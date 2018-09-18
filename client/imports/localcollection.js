import { Mongo } from 'meteor/mongo';

var LocalCollection = new Mongo.Collection(null); // EITHER STATEMENT IS FINE
LocalCollection = new Mongo.Collection('LocalCollection', {connection: null});

export default LocalCollection;