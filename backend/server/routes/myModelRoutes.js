const express = require('express');
const MyModel = require('../models/myModel');
const router = express.Router();

// Create a new document
router.post('/', async (req, res) => {
  const newDocument = new MyModel(req.body);
  try {
    const savedDocument = await newDocument.save();
    res.status(201).json(savedDocument);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all documents
router.get('/', async (req, res) => {
  try {
    const documents = await MyModel.find();
    res.status(200).json(documents);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get a single document by ID
router.get('/:id', async (req, res) => {
  try {
    const document = await MyModel.findById(req.params.id).populate('postedBy');
    if (!document) {
      return res.status(404).json({ error: 'Document not found' });
    }
    res.status(200).json(document);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Update a document by ID
router.put('/:id', async (req, res) => {
  try {
    const updatedDocument = await MyModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate('postedBy');
    if (!updatedDocument) {
      return res.status(404).json({ error: 'Document not found' });
    }
    res.status(200).json(updatedDocument);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete a document by ID
router.delete('/:id', async (req, res) => {
  try {
    const deletedDocument = await MyModel.findByIdAndDelete(req.params.id);
    if (!deletedDocument) {
      return res.status(404).json({ error: 'Document not found' });
    }
    res.status(200).json({ message: 'Document deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;