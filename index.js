/* eslint-disable @typescript-eslint/no-require-imports */
const express = require("express")
const { PrismaClient } = require("@prisma/client");
const bodyParser = require("body-parser");

const app = express();
const prisma = new PrismaClient();
const PORT = 5001;

app.use(bodyParser.json());

// ✅ Get all places
app.get("/places", async (req, res) => {
  const places = await prisma.place.findMany();
  res.json(places);
});

// ✅ Add a new place
app.post("/places", async (req, res) => {
  const { name, address, district, type, imageUrl } = req.body;
  const newPlace = await prisma.place.create({
    data: { name, address, district, type, imageUrl },
  });
  res.json(newPlace);
});

// ✅ Update a place
app.put("/places/:id", async (req, res) => {
  const { id } = req.params;
  const { name, address, district, type, imageUrl } = req.body;
  const updatedPlace = await prisma.place.update({
    where: { id: parseInt(id) },
    data: { name, address, district, type, imageUrl },
  });
  res.json(updatedPlace);
}); 

// ✅ Delete a place
app.delete("/places/:id", async (req, res) => {
  const { id } = req.params;
  await prisma.place.delete({
    where: { id: parseInt(id) },
  });
  res.json({ message: "Place deleted" });
});

app.listen(PORT,() => {
  console.log(`🚀 API running at http://localhost:${PORT}`);
})
