require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const User = require("./models/User");
const Event = require("./models/Event");
const Participation = require("./models/Participation");

const seed = async () => {
  try {
    await mongoose.connect(
      process.env.MONGODB_URI || "mongodb://localhost:27017/emploi-angular",
    );

    await Participation.deleteMany({});
    await Event.deleteMany({});
    await User.deleteMany({});

    const defaultPassword = await bcrypt.hash("123456", 10);

    const users = await User.insertMany([
      {
        firstName: "Ouneli",
        lastName: "Adem",
        name: "Ouneli Adem",
        email: "ouneliadem@gmail.com",
        profession: "Utilisateur test",
        password: defaultPassword,
        role: "user",
      },
      {
        firstName: "Jean",
        lastName: "Dupont",
        name: "Jean Dupont",
        email: "jean.dupont@example.com",
        profession: "Développeur Web",
        password: defaultPassword,
        role: "admin",
      },
      {
        firstName: "Marie",
        lastName: "Anne",
        name: "Marie Anne",
        email: "marie.anne@example.com",
        profession: "Chef de projet",
        password: defaultPassword,
        role: "user",
      },
    ]);

    const [ouneli, jean, marie] = users;

    const events = await Event.insertMany([
      {
        title: "Travel Photographer",
        description: "Wanderlust Media · Remote / Global",
        date: new Date("2026-04-15"),
        location: "Remote / Global",
        creatorId: jean._id,
      },
      {
        title: "Expedition Guide",
        description: "Summit Adventures · Patagonia",
        date: new Date("2026-05-22"),
        location: "Patagonia",
        creatorId: jean._id,
      },
      {
        title: "Digital Nomad Developer",
        description: "TechRemote · Anywhere",
        date: new Date("2026-06-10"),
        location: "Anywhere",
        creatorId: jean._id,
      },
    ]);

    await Participation.insertMany([
      {
        eventId: events[0]._id,
        userId: ouneli._id,
        status: "confirmed",
      },
      {
        eventId: events[1]._id,
        userId: marie._id,
        status: "pending",
      },
    ]);

    console.log("Seeding complete");
    console.log("Login example: ouneliadem@gmail.com / 123456");
  } catch (error) {
    console.error("Seed failed:", error);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
};

seed();
