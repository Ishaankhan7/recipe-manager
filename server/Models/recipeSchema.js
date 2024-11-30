const mongoose = require("mongoose");

const RecipeSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  ingredients: {
    type: [String], // Array of ingredients
    required: true,
  },
  steps: {
    type: [String], // Array of steps for preparation
    required: true,
  },
  image: {
    type: String, // URL or file path of the recipe image
    trim: true,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user", // Reference to the User model (Chef)
    required: true,
  },
  reviews: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user", // Reference to the User model
        required: true,
      },
      comment: {
        type: String,
        required: true,
        trim: true,
      },
      rating: {
        type: Number,
        required: true,
        min: 1, // Minimum rating
        max: 5, // Maximum rating
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Add a pre-save hook to automatically update `updatedAt` when the recipe is modified.
RecipeSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Ensure a user can only leave one review per recipe
RecipeSchema.index({ 'reviews.user': 1, _id: 1 }, { unique: true });

const RecipeModel = mongoose.model("recipe", RecipeSchema);

module.exports = RecipeModel;
