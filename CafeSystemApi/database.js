var mongoose = require('mongoose');
mongoose.connect('mongodb+srv://dbAndrew:001001@cluster0.2kqz7.mongodb.net/CafeDB?retryWrites=true&w=majority', {useNewUrlParser: true});
var conn = mongoose.connection;
conn.on('connected', function() {
    console.log('DB connect successfully');
});
conn.on('disconnected',function(){
    console.log('DB disconnected successfully');
})
conn.on('error', console.error.bind(console, 'connection error:'));
module.exports = conn;