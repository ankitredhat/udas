require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB URI from .env
const mongoURI = process.env.MONGO_URI;

// MongoDB connection
mongoose
  .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// User Schema
const userSchema = new mongoose.Schema({
  name: String,
  age: Number,
  email: String,
});
const User = mongoose.model("User", userSchema);

// Product Schema
const productSchema = new mongoose.Schema({
  productName: String,
  price: Number,
  category: String,
});
const Product = mongoose.model("Product", productSchema);

// CRUD operations for users

// GET - Get all users
app.get("/users", async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST - Create a new user
app.post("/users", async (req, res) => {
  const { name, age, email } = req.body;
  try {
    const newUser = new User({ name, age, email });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT - Update an existing user
app.put("/users/:id", async (req, res) => {
  const { id } = req.params;
  const { name, age, email } = req.body;
  try {
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { name, age, email },
      { new: true }
    );
    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE - Delete a user
app.delete("/users/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deletedUser = await User.findByIdAndDelete(id);
    res.status(200).json(deletedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// CRUD operations for products

// GET - Get all products
app.get("/products", async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST - Create a new product
app.post("/products", async (req, res) => {
  const { productName, price, category } = req.body;
  try {
    const newProduct = new Product({ productName, price, category });
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT - Update an existing product
app.put("/products/:id", async (req, res) => {
  const { id } = req.params;
  const { productName, price, category } = req.body;
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      { productName, price, category },
      { new: true }
    );
    res.status(200).json(updatedProduct);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE - Delete a product
app.delete("/products/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deletedProduct = await Product.findByIdAndDelete(id);
    res.status(200).json(deletedProduct);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
