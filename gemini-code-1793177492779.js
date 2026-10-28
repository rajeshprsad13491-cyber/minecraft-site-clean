const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

let mods = [
  {
    id: "1",
    name: "Sodium Optimizer",
    version: "1.21.0",
    loader: "Fabric",
    category: "Optimization",
    downloads: 1420,
    downloadUrl: "https://github.com",
    description: "High-performance rendering engine replacement for modern Minecraft versions."
  },
  {
    id: "2",
    name: "Create Mechanics",
    version: "1.20.1",
    loader: "Forge",
    category: "Technology",
    downloads: 875,
    downloadUrl: "https://github.com",
    description: "A collection of mechanical tools, rotational power systems, and aesthetic automation blocks."
  },
  {
    id: "3",
    name: "Iris Shaders",
    version: "1.21.0",
    loader: "Fabric",
    category: "Visual",
    downloads: 2100,
    downloadUrl: "https://github.com",
    description: "Modern, fast shader loader compatible with existing OptiFine shaderpacks."
  }
];

app.get('/api/mods', (req, res) => {
  res.json(mods);
});

app.get('/api/download/:id', (req, res) => {
  const mod = mods.find(m => m.id === req.params.id);
  if (!mod) return res.status(404).send('Mod not found');
  
  mod.downloads += 1;
  res.redirect(mod.downloadUrl);
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});