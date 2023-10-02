const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const mongoDBAtlasUri = 'mongodb+srv://lakshitagoel888:taskmanager@cluster0.zlxsxdm.mongodb.net/?retryWrites=true&w=majority';

mongoose.connect(mongoDBAtlasUri, { useNewUrlParser: true })
  .then(() => {
    console.log('Connected to MongoDB Atlas successfully :)');
  })
  .catch((err) => {
    console.error('Error while connecting to MongoDB Atlas:', err);
  });


module.exports = {
    mongoose
};

