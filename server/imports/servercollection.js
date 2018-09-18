import { Mongo } from 'meteor/mongo';

//  EVEN THOUGH THIS IS ON THE SERVER, IT STILL HAS NO CONNECTION TO THE MONGO-DB COZ IT'S LOCAL!!!
var ServerLocalCollection = new Mongo.Collection(null); // EITHER STATEMENT IS FINE
ServerLocalCollection = new Mongo.Collection('ServerLocalCollection', {connection: null});
//  THERFORE, THIS LOCAL COLLECTION CAN BE USED AS A SIMPLE ARRAY, BUT WITH MONGO-DB'S COOL FUNCTIONS :)s

export default ServerCollection;