const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  Username: {
    type: String,
    required: true,
    trim: true,
  },
  Email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    validate: {
      validator: function (v) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
      },
      message: props => `${props.value} is not a valid email!`,
    },
  },
  
  PhoneNumber: {
    type: String,
    required: true,
    trim: true,
    validate: {
      validator: function (v) {
        return /^[0-9]{10}$/.test(v); // Example for a 10-digit number
      },
      message: props => `${props.value} is not a valid phone number!`,
    },
  },
  
  Address: {
    type: String,
    required: true,
    trim: true, // Optional for chefs
  },
  Password: {
    type: String,
    required: true,
    trim: true,
  },
  Role: {
    type: String,
    enum: ["User", "Chef"], // Allowed roles
    required: true,
    default: "User",
  },
  // Optional field specific to Chef
  Specialty: {
    type: String,
    trim: true, // Chef can have specialties (e.g., Italian, Desserts)
  },
  CreatedRecipes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Recipe", // Reference to recipes created by the chef
    },
  ],
});

const UserModel = mongoose.model("user", UserSchema);
module.exports = UserModel;
