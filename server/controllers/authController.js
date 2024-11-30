const UserModel = require("../Models/userSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.createUser = async (req, res) => {
  const { Username, Email, PhoneNumber, Address, Password, Role } = req.body;
  try {
    const existingUser = await UserModel.findOne({
      $or: [
        { Email: Email },
        { Username: Username },
        { PhoneNumber: PhoneNumber },
      ],
    });

    if (existingUser) {
      return res.status(400).json({
        message: "User or Chef with the same email, username, or phone number already exists",
      });
    }

    const phoneRegex = /^[0-9]+$/;
    if (!phoneRegex.test(PhoneNumber)) {
      return res.status(400).json({
        message: "Phone number must contain only numeric characters",
      });
    }

    const strongPasswordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!strongPasswordRegex.test(Password)) {
      return res.status(400).json({
        message:
          "Password must contain at least one lowercase letter, one uppercase letter, one digit, one special character, and be at least 8 characters long",
      });
    }

    const hashedPassword = await bcrypt.hash(Password, 10);

    const newUser = await UserModel.create({
      Username,
      Email,
      PhoneNumber,
      Address,
      Password: hashedPassword,
      Role: Role || "User", 
    });

    const token = jwt.sign({ id: newUser._id, role: newUser.Role }, process.env.JWT_SECRET_KEY, {
      expiresIn: "5h",
    });

    res
      .cookie("authtoken", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production", // Secure cookie in production
        sameSite: "strict",
      })
      .status(201)
      .json({
        message: "Signup successful and user is logged in",
        token,
        role: newUser.Role,
      });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

exports.LoginUser = async (req, res) => {
  const { Username, Password } = req.body;

  try {
    // Check if the user exists
    const user = await UserModel.findOne({ Username });
    if (!user) {
      return res.status(401).json({ message: "User or Chef not found" });
    }

    // Compare the provided password with the hashed password
    const isPasswordValid = await bcrypt.compare(Password, user.Password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate a JWT token
    const token = jwt.sign({ id: user._id, role: user.Role }, process.env.JWT_SECRET_KEY, {
      expiresIn: "5h", // Token expiration time
    });

    // Set the token in a secure HTTP-only cookie
    res
      .cookie("authtoken", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production", // Use secure cookies in production
        sameSite: "strict",
      })
      .status(200)
      .json({
        message: "Login successful",
        token,
        role: user.Role, // Return the user's role for client-side usage
      });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

