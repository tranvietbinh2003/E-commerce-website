const express = require('express');
const router = express.Router();
const Item = require('../models/Item');

// Add new item
router.post('/add', async (req, res) => {
  try {
    const newItem = new Item({
      name: req.body.name,
      cost: req.body.cost,
      fromAddress: req.body.fromAddress,
      toAddress: req.body.toAddress,
      itemAddress: req.body.itemAddress,
      hash: req.body.hash,
      status: req.body.status,
      contractIndex: req.body.contractIndex
    });
    const savedItem = await newItem.save();
    res.json(savedItem);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all items
router.get('/', async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update item
router.post('/update', async (req, res) => {
  try {
    const { index, status, rating, isRated, buyer } = req.body;

    const updateData = { status };
    if (rating !== undefined) {
      updateData.rating = rating;
    }
    if (isRated !== undefined) {
      updateData.isRated = isRated;
    }
    if (buyer !== undefined) {
      updateData.buyer = buyer;
    }

    const updatedItem = await Item.findByIdAndUpdate(index, updateData, { new: true });

    if (!updatedItem) {
      return res.status(404).json({ error: "Item not found" });
    }

    res.json(updatedItem);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});



module.exports = router;
