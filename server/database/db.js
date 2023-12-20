// const mongoose= require("mongoose");
URI=process.env.MONGODB_URI;
// // BLG9nIPJsWXgCURO

// // mongodb+srv://Kartikay:<password>@yogaregis.ac6rnkp.mongodb.net/?retryWrites=true&w=majority

// // YogaRegis

// const connectDb =()=>{
//     return mongoose.connect(uri,{
//         useNewUrlParser: true,
//         useUnifiedTopologu: true,
//     })
// };

// module.exports =connectDb;
const mongoose = require("mongoose");

//const URI = "mongodb://127.0.0.1:27017/mern_admin_panel";

const connectDb = async () => {
  try {
    await mongoose.connect(URI);
    console.log("connection successful to DB");
  } catch (error) {
    console.error(error);
    process.exit(0);
  }
};

module.exports = connectDb;
