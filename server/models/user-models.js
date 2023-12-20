const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


// Define the User schema
const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        // required: true,
      },
      lastName: {
        type: String,
        // required: true,
      },
      email: {
        type: String,
        // required: true,
      },
      dateOfJoining: {
        type: String, 
        // required: true,
      },
      selectedBatch: {
        type: String,
        // required: true,
      },
      password: {
        type: String,
        // required: true,
      },
      age: {
        type: String,
        // required: true,
      },
      paymentDone: {
        type: Boolean,
        default: false,
      },
});



//security password
userSchema.pre("save", async function () {
    const user = this;
    // console.log("actual data ", this);
  
    if (!user.isModified) {
      return next();
    }
  
    try {
      const saltRound = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(user.password, saltRound);
      user.password = hashedPassword;
    } catch (error) {
      return next(error);
    }
  });
  


  userSchema.methods.generateToken = async function () {
   // console.log("I am token");
    try {
      return jwt.sign(
        {
          userId: this._id.toString(),
          email: this.email,
          paymentDone: this.paymentDone,
        },
        process.env.JWT_SECRET_KEY,
        {
          expiresIn: "30d",
        }
      );
    } catch (error) {
      console.error("Token Error: ", error);
    }
  };
  

  // define the model or the collection name
  const User = new mongoose.model("User", userSchema);
  
  module.exports = User; 