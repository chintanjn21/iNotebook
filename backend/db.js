const mongoose = require('mongoose');
const mongoURI = `mongodb+srv://chintanjn21:chintanjn%4021@cluster0.veexn.mongodb.net/inotebook`

const connectToMongo = () =>{
    mongoose.connect(mongoURI, ()=>{
        console.log('Connected to mongoose Database.');
    })
}
module.exports = connectToMongo;
