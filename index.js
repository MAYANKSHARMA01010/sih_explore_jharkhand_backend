/* eslint-disable @typescript-eslint/no-require-imports */
const express = require("express");
const { PrismaClient } = require("@prisma/client");
const bodyParser = require("body-parser");

const app = express();
const prisma = new PrismaClient();
const PORT = 5001;

app.use(bodyParser.json());

// ✅ Get all places
app.get("/places", async (req, res) => {
  try {
    const places = await prisma.place.findMany();
    res.json(places);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch places", details: err.message });
  }
});

// ✅ Get single place by ID
app.get("/places/:id", async (req, res) => {
  try {
    const place = await prisma.place.findUnique({
      where: { id: parseInt(req.params.id) },
    });
    if (!place) return res.status(404).json({ error: "Place not found" });
    res.json(place);
  } 
  catch (err) {
    res.status(500).json({ error: "Failed to fetch place", details: err.message });
  }
});

// ✅ Add a new place
app.post("/places", async (req, res) => {
  try {
    const { name, address, district, type, description, keyFeatures, bestTimeToVisit, imageUrl } = req.body;
    const newPlace = await prisma.place.create({
      data: { name, address, district, type, description, keyFeatures, bestTimeToVisit, imageUrl },
    });
    res.status(201).json(newPlace);
  } 
  catch (err) {
    res.status(400).json({ error: "Failed to create place", details: err.message });
  }
});

// ✅ Update a place
app.put("/places/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, address, district, type, description, keyFeatures, bestTimeToVisit, imageUrl } = req.body;

    const updatedPlace = await prisma.place.update({
      where: { id: parseInt(id) },
      data: { name, address, district, type, description, keyFeatures, bestTimeToVisit, imageUrl },
    });

    res.json(updatedPlace);
  } 
  catch (err) {
    res.status(400).json({ error: "Failed to update place", details: err.message });
  }
});

// ✅ Delete a place
app.delete("/places/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.place.delete({ where: { id: parseInt(id) } });
    res.json({ message: "Place deleted" });
  } 
  catch (err) {
    res.status(400).json({ error: "Failed to delete place", details: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 API running at http://localhost:${PORT}`);
});
