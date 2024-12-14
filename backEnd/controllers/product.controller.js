const Product = require('../models/products');
const Categories = require('../models/categories')
const User = require("../models/user.model");
const mongoose = require('mongoose');

exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAllCategories = async (req, res) => {
  try {
    const categories = await Categories.find();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.removeCart = async (req, res) => {
  try {
    const { userId, productId } = req.params;

    const user = await User.findById(userId);
    const product = await Product.findById(productId);

    if (!user || !product) {
      return res.status(404).json({ message: 'User or Product not found' });
    }

    const productInCart = user.cart.find(item => item.productId.toString() === productId);

    if (!productInCart) {
      return res.status(400).json({ message: 'Product not found in cart' });
    }

    product.stock += productInCart.quantity;

    user.cart = user.cart.filter(item => item.productId.toString() !== productId);

    await product.save();
    await user.save();

    res.status(200).json({ message: 'Product removed from cart', cart: user.cart });
  } catch (error) {
    res.status(500).json({ message: 'Error removing product from cart', error });
  }
};

exports.addQuantityCart = async (req, res) => {
  const { userId } = req.params;
  const { productId, quantity } = req.body;

  try {
    // Fetch the user and product
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    if (quantity <= 0) {
      return res.status(400).json({ message: 'Quantity must be greater than 0' });
    }

    if (product.stock < quantity) {
      return res.status(400).json({ message: `Not enough stock available. Current stock: ${product.stock}` });
    }

    const cartItem = user.cart.find((item) => item.productId.toString() === productId);

    if (cartItem) {
      const newQuantity = cartItem.quantity + 1 ;

      // Validate stock availability for the new quantity
      if (product.stock < newQuantity - cartItem.quantity) {
        return res.status(400).json({ message: `Not enough stock to increase quantity. Current stock: ${product.stock}` });
      }

      // Update cart item quantity
      cartItem.quantity = newQuantity;

      // Reduce stock by the increment only
      product.stock -= 1;
    } else {
      // Add a new item to the cart
      user.cart.push({ productId, quantity });

      // Reduce stock by the added quantity
      product.stock -= quantity;
    }

    // Save changes
    await product.save();
    await user.save();

    res.status(200).json({ message: 'Cart updated successfully', cart: user.cart });
  } catch (error) {
    console.error('Error updating cart:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.totalPrice = async (req , res) =>{
  const { userId } = req.params;

  try {
    // Find the user
    const user = await User.findById(userId).populate('cart.productId'); // Populate product details
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Calculate total price
    const totalPrice = user.cart.reduce((total, item) => {
      const productPrice = item.productId.price || 0; // Use price from product
      return total + productPrice * item.quantity;
    }, 0);

    res.status(200).json({ totalPrice });
  } catch (error) {
    console.error('Error fetching total cart price:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.minsQuantityCart = async (req, res) => {
  const { userId } = req.params;
  const { productId, quantity } = req.body;

  try {
    // Fetch the user and product
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    if (quantity <= 0) {
      return res.status(400).json({ message: 'Quantity must be greater than 0' });
    }

    if (product.stock < quantity) {
      return res.status(400).json({ message: `Not enough stock available. Current stock: ${product.stock}` });
    }

    const cartItem = user.cart.find((item) => item.productId.toString() === productId);

    if (cartItem) {
      const newQuantity = cartItem.quantity - 1 ;

      if (product.stock < newQuantity - cartItem.quantity) {
        return res.status(400).json({ message: `Not enough stock to increase quantity. Current stock: ${product.stock}` });
      }

      cartItem.quantity = newQuantity;

      product.stock += 1;
    } else {
      user.cart.push({ productId, quantity });

      product.stock -= quantity;
    }

    // Save changes
    await product.save();
    await user.save();

    res.status(200).json({ message: 'Cart updated successfully', cart: user.cart });
  } catch (error) {
    console.error('Error updating cart:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.getCart = async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findById(userId).populate('cart.productId');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(user.cart);
  } catch (error) {
    console.error('Error fetching cart:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

exports.addCart = async (req, res) => {
    try {
      const { userId } = req.params;
      const { productId, quantity } = req.body;
  
      const product = await Product.findById(productId);
  
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }
  
      if (product.stock < quantity) {
        return res.status(400).json({ message: 'Not enough stock available' });
      }
  
      const user = await User.findById(userId);
      const existingProduct = user.cart.find(item => item.productId.toString() === productId);
  
      if (existingProduct) {
        existingProduct.quantity += quantity;
      } else {
        user.cart.push({ productId, quantity });
      }
        product.stock -= quantity;
  
      await product.save();
      await user.save();
  
      res.status(200).json({ message: 'Product added to cart', cart: user.cart });
    } catch (error) {
      console.error("Error adding to cart:", error); // Log the full error!
      res.status(500).json({ error: 'Internal Server Error' });    }
}

exports.addFavourite = async(req ,res) => {
  try {
    const {userId} = req.params
    const {productId} = req.body
    const user = await User.findById(userId)
    const existingProduct = user.favourite.find(item => item.productId.toString() === productId)
    if (existingProduct) {
      return res.status(400).json({ message: 'Product already in favourite' })
      }
      user.favourite.push({ productId })
      await user.save()
      res.status(200).json({ message: 'Product added to favourite' })
      } catch (error) {
        res.status(500).json({ message: 'Error adding product to favourite', error })
        }
}

exports.removeFavourite = async(req , res) => {
  try {
    const {userId , productId} = req.params

    const user = await User.findById(userId)
    const product = await Product.findById(productId);

    if (!user || !product) {
      return res.status(404).json({ message: 'User or Product not found' });
    }
    
    const index = user.favourite.findIndex(item => item.productId.toString() === productId)

    if (index === -1) {
      return res.status(400).json({ message: 'Product not in favourite' })
      }
      user.favourite.splice(index, 1)
      await user.save()
      res.status(200).json({ message: 'Product removed from favourite' })
      } catch (error) {
        res.status(500).json({ message: 'Error removing product from favourite', error })
        }
}

exports.getFavourite = async (req, res) =>{
  const { userId } = req.params;

  try {
    const user = await User.findById(userId).populate('favourite.productId');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(user.favourite);
  } catch (error) {
    console.error('Error fetching favourite:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.addProduct = async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.addCategory = async (req, res) => {
  try {
    const newCategory = new Categories(req.body);
    const savedCategory = await newCategory.save();
    res.status(201).json(savedCategory);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
