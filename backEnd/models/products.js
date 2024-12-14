const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    name: {
      type: String,
      required: [true, "Clothing item must have a name"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Clothing item must have a description"],
      trim: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId, // Reference to the Category model
      ref: 'Category',
      required: [true, "Product must belong to a category"],
    },
    subcategory: {
      type: String,
      required: [true, "Product must have a subcategory"],
      trim: true,
    },
    size: {
      type: [String],
      required: [false, "Clothing item must have available sizes"],
      enum: ["XS", "S", "M", "L", "XL", "XXL"],
    },
    color: {
      type: [String],
      required: [true, "Clothing item must have available colors"],
    },
    price: {
      type: Number,
      required: [true, "Clothing item must have a price"],
      min: [0, "Price cannot be negative"],
    },
    discount: {
      type: Number,
      default: 0,
      min: [0, "Discount cannot be negative"],
      max: [100, "Discount cannot exceed 100%"],
    },
    finalPrice: {
      type: Number,
      required: false,
    },
    stock: {
      type: Number,
      required: [true, "Clothing item must have a stock value"],
      min: [0, "Stock cannot be negative"],
    },
    brand: {
      type: String,
      trim: true,
    },
    imageUrl: {
      type: String,
      required: [true, "Clothing item must have an image URL"],
    },
    ratings: {
      average: {
        type: Number,
        default: 0,
        min: [0, "Rating cannot be negative"],
        max: [5, "Rating cannot exceed 5"],
      },
      reviews: [
        {
          userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
          comment: String,
          rating: {
            type: Number,
            min: [1, "Rating cannot be less than 1"],
            max: [5, "Rating cannot exceed 5"],
          },
          createdAt: { type: Date, default: Date.now },
        },
      ],
    },
  });
  
  ProductSchema.pre("save", function (next) {
    this.finalPrice = this.price - (this.price * this.discount) / 100;
    this.updatedAt = Date.now();
    next();
  });
  
module.exports = mongoose.model('Product', ProductSchema);
