const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const passport = require("passport");
const jwt = require("jsonwebtoken");

exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.login = (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      console.error("Authentication error:", err);
      return res.status(500).json({ message: "Internal server error" });
    }
    if (!user) {
      console.log("Authentication failed:", info.message);
      return res.status(401).json({ message: info.message });
    }

    req.logIn(user, (err) => {
      if (err) {
        console.error("Login failed:", err);
        return res.status(500).json({ message: "Login failed" });
      }
      console.log("Login successful");

      const token = jwt.sign(
        { id: user._id, isAdmin: user.isAdmin },
        "your_jwt_secret",
        { expiresIn: "24h" }
      );

      return res.json({
        message: "Logged in successfully",
        token: token,
        user: {
          username: user.username,
          isAdmin: user.isAdmin,
          id: user._id,
          email: user.email,
          profilePhoto : user.profilePhoto,
        },
        id : user._id
      });
    });
  })(req, res, next);
};

exports.isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  return res.status(401).json({ message: "Unauthorized" });
};

exports.register = async (req, res) => {
  const { username, email, password, retypePassword, age, phone, gender } =
    req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      age,
      phone,
      gender,
    });
    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateUserProfile = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const user = await User.findByIdAndUpdate(id, updates, { new: true });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User updated successfully", user });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.getUserPhoto = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id);

    if (!user || !user.photo) {
      return res.status(404).json({ message: 'Photo not found' });
    }

    res.set('Content-Type', user.photoType); // Set MIME type
    res.send(user.photo); // Send photo as binary data
  } catch (error) {
    console.error('Error retrieving photo from database:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.uploadPhoto = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update the user's profilePhoto field
    user.profilePhoto = req.file.path;
    await user.save();

    res.status(200).json({ message: 'Profile photo uploaded successfully', user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error });
  }
};


