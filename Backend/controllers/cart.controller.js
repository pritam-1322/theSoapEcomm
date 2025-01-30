import userModel from "../models/user.model.js";

// Add to Cart
const addToCart = async (req, res) => {
  try {
    const { itemId } = req.body; // itemId comes from the request body
    console.log(itemId);
    const userId = req.userId; // userId is attached by the authUser middleware

    // Fetch the user data
    const userData = await userModel.findById(userId);

    // Initialize or update the cart data
    const cartData = userData.cartData || {};
    if (cartData[itemId]) {
      cartData[itemId] += 1;
    } else {
      cartData[itemId] = 1;
    }

    // Save the updated cart data to the database
    await userModel.findByIdAndUpdate(userId, { cartData });

    res.json({
      success: true,
      message: "Added to cart!",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to add item to cart.",
    });
  }
};

// Update Cart
const updateCart = async (req, res) => {
  try {
    const { itemId, quantity } = req.body; // itemId and quantity come from the request body
    const userId = req.userId; // userId is attached by the authUser middleware

    // Fetch the user data
    const userData = await userModel.findById(userId);

    // Initialize or update the cart data
    const cartData = userData.cartData || {};
    cartData[itemId] = quantity;

    // Save the updated cart data to the database
    await userModel.findByIdAndUpdate(userId, { cartData });

    res.json({
      success: true,
      message: "Cart updated!",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to update cart.",
    });
  }
};

// Get User Cart Data
const getUserCart = async (req, res) => {
  try {
    const userId = req.userId; // userId is attached by the authUser middleware

    // Fetch the user data
    const userData = await userModel.findById(userId);

    // Retrieve the cart data
    const cartData = userData.cartData || {};

    res.json({
      success: true,
      cartData,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to retrieve cart data.",
    });
  }
};

export { addToCart, updateCart, getUserCart };
