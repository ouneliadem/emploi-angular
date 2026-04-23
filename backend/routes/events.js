const express = require("express");
const Event = require("../models/Event");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const events = await Event.find().populate("creatorId", "name email");
    res.json(events);
  } catch (err) {
    res.status(500).send("Server Error");
  }
});

router.post("/", authMiddleware, async (req, res) => {
  const { title, description, date, location } = req.body;
  try {
    const newEvent = new Event({
      title,
      description,
      date,
      location,
      creatorId: req.user.id,
    });
    const event = await newEvent.save();
    res.json(event);
  } catch (err) {
    res.status(500).send("Server Error");
  }
});

router.put("/:id", authMiddleware, async (req, res) => {
  try {
    let event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: "Event not found" });

    if (
      event.creatorId.toString() !== req.user.id &&
      req.user.role !== "admin"
    ) {
      return res.status(401).json({ message: "Not authorized" });
    }

    event = await Event.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true },
    );
    res.json(event);
  } catch (err) {
    res.status(500).send("Server Error");
  }
});

router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: "Event not found" });

    if (
      event.creatorId.toString() !== req.user.id &&
      req.user.role !== "admin"
    ) {
      return res.status(401).json({ message: "Not authorized" });
    }

    await Event.findByIdAndDelete(req.params.id);
    res.json({ message: "Event removed" });
  } catch (err) {
    res.status(500).send("Server Error");
  }
});

module.exports = router;
