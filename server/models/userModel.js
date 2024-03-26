const mongoose = require('mongoose'); // Erase if already required
const bcrypt = require("bcrypt");

// Declare the Schema of the Mongo model
var userSchema = new mongoose.Schema({
    firstname:{
        type:String,
        required:true,
    },
    lastname:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    mobile:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    description: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        default: "petsitter",
    },
    isBlocked: {
        type:Boolean,
        default: false,
    },
    images: [
        {
          public_id: String,
          url: String,
        },
    ],
    address: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Address" }],
    },
    wishlist: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
    refreshToken: {
        type: String,
    },
    }, 
    {
      timestamps: true,
    }
);

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
      next();
    }
    const salt = await bcrypt.genSaltSync(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  });

  userSchema.methods.isPasswordMatched = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
  };

//Export the model
module.exports = mongoose.model('User', userSchema);