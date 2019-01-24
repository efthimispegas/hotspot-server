'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getAllHotspots = exports.getHotspot = exports.createHotspot = undefined;

var _hotspot = require('../models/hotspot');

var _hotspot2 = _interopRequireDefault(_hotspot);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const createHotspot = exports.createHotspot = async (req, res) => {
  const { title, description } = req.body;
  const newHotspot = new _hotspot2.default({ title, description });

  /**
   * Validation checks
   */
  if (!title) {
    return res.status(400).json({ error: true, message: 'A title is required!' });
  } else if (typeof title !== 'string') {
    return res.status(400).json({ error: true, message: 'The title must be a string!' });
  } else if (title.length < 3) {
    return res.status(400).json({
      error: true,
      message: 'Who are you kidding?! No title is that short...'
    });
  }

  if (!description) {
    return res.status(400).json({ error: true, message: 'A description is required!' });
  } else if (typeof description !== 'string') {
    return res.status(400).json({ error: true, message: 'The description must be a string!' });
  } else if (description.length < 10) {
    return res.status(400).json({ error: true, message: 'Please be a little more informative..' });
  }

  try {
    //return 201 for creation
    return res.status(201).json({ hotspot: await newHotspot.save() });
  } catch (e) {
    return res.status(e.status).json({
      error: true,
      message: 'Error with creating hotspot!',
      details: e
    });
  }
};

const getHotspot = exports.getHotspot = async (req, res) => {
  const { title, description } = req.body;
  const { hotspotId } = req.params;

  try {
    //return 200 for success
    return res.status(200).json({ hotspot: await _hotspot2.default.find({ _id: hotspotId }) });
  } catch (e) {
    return res.status(e.status).json({
      error: true,
      message: 'Error with getting all hotspots!',
      details: e
    });
  }
};

const getAllHotspots = exports.getAllHotspots = async (req, res) => {
  const { title, description } = req.body;

  try {
    //return 200 for success
    return res.status(200).json({ hotspots: await _hotspot2.default.find() });
  } catch (e) {
    return res.status(e.status).json({
      error: true,
      message: 'Error with getting all hotspots!',
      details: e
    });
  }
};