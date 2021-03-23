/* eslint-disable import/no-self-import */
const mongoose = require('mongoose');

export const Connect = () => {
  // mongoose.connect('mongodb+srv://@master.1na2r.mongodb.net/remi?retryWrites=true&w=majority');

  const db = mongoose.connection;

  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', () => {
    console.log('success');
  });
};

export default mongoose;
