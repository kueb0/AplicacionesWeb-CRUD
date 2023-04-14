const mongoose = require("mongoose");

//const URI = 'mongodb://127.0.0.1:27017/Unidad3'
const URI = 'mongodb+srv://karisaglez:optimen@cluster0.e4q7oc6.mongodb.net/?retryWrites=true&w=majority'

mongoose
 .connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
 })
 .then(() => {
    console.log("Conectando con MongoDB Atlas");
 })
 .catch((err) => {
    console.log(err);
 });

 module.exports = mongoose;