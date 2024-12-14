const express = require("express");
const routers = express.Router();
const passport = require("passport");
const authController = require("../controllers/auth.controller");
const productController = require("../controllers/product.controller");
const {ensureAuthenticated,ensureAdmin} = require("../middleware/adminCheck");
const authenticateToken = require("../middleware/auth");
const upload = require("../middleware/multer");

// User

routers.get("/users/:id", authenticateToken, authController.getUserById);
routers.get("/dashboard", authController.isLoggedIn, (req, res) => {res.json({ message: "Welcome to the dashboard", user: req.user });});
routers.get("/photo/:id", authController.getUserPhoto);
routers.post("/register", authController.register);
routers.post("/login", passport.authenticate("local"), authController.login);
routers.post("/photo/:id",upload.single("profilePhoto"),authController.uploadPhoto);
routers.put("/updateProfile/:id",authenticateToken,authController.updateUserProfile);

// Product Routes
routers.get("/products", productController.getAllProducts);
routers.get("/categories", productController.getAllCategories);
routers.get("/products/:id", productController.getProductById);
routers.post("/products",productController.addProduct);
routers.post("/categories", ensureAuthenticated,ensureAdmin,productController.addCategory);
routers.put("/products/:id",ensureAuthenticated,ensureAdmin,productController.updateProduct);
routers.delete("/products/:id",ensureAuthenticated,ensureAdmin,productController.deleteProduct);

routers.get("/favourite/:userId", productController.getFavourite);
routers.post("/favourite/:userId",productController.addFavourite);
routers.delete("/favourite/:userId/:productId",productController.removeFavourite);

routers.post("/:userId/cart", productController.addCart);
routers.put("/:userId/addcart", productController.addQuantityCart);
routers.put("/:userId/minscart", productController.minsQuantityCart);
routers.get("/:userId/cart", productController.getCart);
routers.get("/:userId/price", productController.totalPrice);
routers.delete("/:userId/cart/:productId", productController.removeCart);

module.exports = routers;
