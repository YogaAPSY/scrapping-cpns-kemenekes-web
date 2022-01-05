const { connect } = require('http2');
const mongoose = require('mongoose');

const URI = 'mongodb+srv://root:7IGSsER4ql4Gtk0B@cluster0.7k6nj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

const connectDB = async () => {
    try{
        await mongoose.connect(URI,{
            useUnifiedTopology: true,
            useNewUrlParser: true
        });
        console.log("connect")
    }catch(e){
        console.log(e)
    }
}

module.exports = connectDB;