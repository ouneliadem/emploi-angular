const express = require("express");
const Participation = require("../models/Participation");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", authMiddleware, async (req, res) => {
  try {
    const participations = await Participation.find()
      .populate("eventId")
      .populate("userId", "name email");
    res.json(participations);
  } catch (err) {
    res.status(500).send("Server Error");
  }
});

router.post("/", authMiddleware, async (req, res) => {
  const { eventId, userId, status } = req.body;
  try {
    const targetUserId =
      req.user.role === "admin" && userId ? userId : req.user.id;

    const newParticipation = new Participation({
      eventId,
      userId: targetUserId,
      status: status || "confirmed",
    });
    const participation = await newParticipation.save();
    const populated = await Participation.findById(participation._id)
      .populate("eventId")
      .populate("userId", "name email");
    res.status(201).json(populated);
  } catch (err) {
    if (err && err.code === 11000) {
      return res
        .status(400)
        .json({ message: "User already registered for this event" });
    }
    res.status(500).send("Server Error");
  }
});

router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const participation = await Participation.findById(req.params.id);
    if (!participation)
      return res.status(404).json({ message: "Participation not found" });

    if (
      participation.userId.toString() !== req.user.id &&
      req.user.role !== "admin"
    ) {
      return res.status(401).json({ message: "Not authorized" });
    }

    await Participation.findByIdAndDelete(req.params.id);
    res.json({ message: "Participation removed" });
  } catch (err) {
    res.status(500).send("Server Error");
  }
});

module.exports = router;
