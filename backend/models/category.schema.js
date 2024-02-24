const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create the Category schema
const categorySchema = new Schema(
    {
        name: {
            type: String,
            required: [true, "Category Required"],
            unique: [true, "Category must be unique"],
            maxLength: [50, "Name cannot exceed 50 characters"],
            minLength: [3, "Name must be at least 3 characters"],
        },

        // A and B => shopping.com/a-and-b <= this mean slug
        slug: {
            type: String,
            lowercase: true,
        },
        images: String,
    },
    {
        timestamps: true, //  Automatically create createdAt & updatedAt fields in database
    }
);

const CategoryModel = mongoose.model("Category", categorySchema);

module.exports = CategoryModel;
