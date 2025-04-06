const users = require("../Models/usermodels");
const jwt = require("jsonwebtoken");

// ✅ Register Controller
exports.register = async (req, res) => {
    console.log("Inside the register and in the controller");
    
    const { username, email, password } = req.body;

    try {
        const existingUser = await users.findOne({ email });

        if (existingUser) {
            return res.status(406).json("USER already exists..!");
        } 

        const newUser = new users({ username, email, password });
        await newUser.save();
        res.status(200).json(newUser);

    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// ✅ Login Controller
exports.login = async (req, res) => {
    const { username, password } = req.body;

    try {
        const existingUser = await users.findOne({ username });

        if (!existingUser || existingUser.password !== password) {
            return res.status(406).json("Incorrect username or password");
        }

        const token = jwt.sign({ userId: existingUser._id }, "secretKey", { expiresIn: "1h" });
        res.status(200).json({ existingUser, token });

    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// ✅ New Controller: Get User Count
exports.getUserCount = async (req, res) => {
    try {
      const count = await users.countDocuments(); // <-- FIXED HERE
      res.status(200).json({ count });
    } catch (error) {
      console.error("Error counting users:", error);
      res.status(500).json({ message: "Failed to fetch user count", error: error.message });
    }
  };
