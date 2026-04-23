const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", authMiddleware, async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (err) {
    res.status(500).send("Server Error");
  }
});

router.get("/:id", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (err) {
    res.status(500).send("Server Error");
  }
});

router.post("/", authMiddleware, async (req, res) => {
  try {
    const { nom, prenom, name, email, profession, password, role } = req.body;
    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const firstName = (prenom || "").trim();
    const lastName = (nom || "").trim();
    const fullName = (
      name ||
      `${firstName} ${lastName}`.trim() ||
      email
    ).trim();
    const rawPassword = password || "password123";
    const hashedPassword = await bcrypt.hash(rawPassword, 10);

    const createdUser = await User.create({
      firstName,
      lastName,
      name: fullName,
      email,
      profession: (profession || "").trim(),
      password: hashedPassword,
      role: role === "admin" ? "admin" : "user",
    });

    res.status(201).json({
      _id: createdUser._id,
      firstName: createdUser.firstName,
      lastName: createdUser.lastName,
      name: createdUser.name,
      email: createdUser.email,
      profession: createdUser.profession,
      role: createdUser.role,
    });
  } catch (err) {
    res.status(500).send("Server Error");
  }
});

router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const { nom, prenom, name, profession, role } = req.body;
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const firstName = (
      prenom !== undefined ? prenom : user.firstName || ""
    ).trim();
    const lastName = (nom !== undefined ? nom : user.lastName || "").trim();
    const fullName = (
      name ||
      `${firstName} ${lastName}`.trim() ||
      user.name
    ).trim();

    const updated = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          firstName,
          lastName,
          name: fullName,
          profession:
            profession !== undefined
              ? (profession || "").trim()
              : user.profession,
          role: role === "admin" ? "admin" : user.role,
        },
      },
      { new: true },
    ).select("-password");

    res.json(updated);
  } catch (err) {
    res.status(500).send("Server Error");
  }
});

router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "User removed" });
  } catch (err) {
    res.status(500).send("Server Error");
  }
});

module.exports = router;
