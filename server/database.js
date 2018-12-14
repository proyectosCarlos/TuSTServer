const mongoose = require('mongoose')
mongoose.set('useFindAndModify', false)
const URI = 'mongodb://localhost:27017/tus3rviciot';

mongoose.connect(URI, { useNewUrlParser: true })
    .then(db => console.log('db  esta conectada'))
    .catch(err => console.error(err));

module.exports = mongoose;
