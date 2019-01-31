'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getLocationHotspots = exports.createLocationHotspot = exports.getLocation = exports.getAllLocations = exports.createLocation = undefined;

var _models = require('../models');

/**
 * Controller for the creation of a location
 */

const createLocation = exports.createLocation = async (req, res) => {
  const { name, description, category } = req.body;

  /**
   * Validation checks
   */
  if (!name) {
    return res.status(400).json({ error: true, message: 'A name is required!' });
  } else if (typeof name !== 'string') {
    return res.status(400).json({ error: true, message: 'The name must be a string!' });
  } else if (name.length < 3) {
    return res.status(400).json({
      error: true,
      message: 'Who are you kidding?! No name is that short...'
    });
  }

  if (!description) {
    return res.status(400).json({ error: true, message: 'A description is required!' });
  } else if (typeof description !== 'string') {
    return res.status(400).json({ error: true, message: 'The description must be a string!' });
  } else if (description.length < 10) {
    return res.status(400).json({ error: true, message: 'Please be a little more informative..' });
  }

  let newLocation = new _models._Location({ name, description });

  try {
    //return 201 for creation
    return res.status(201).json({ error: false, location: await newLocation.save() });
  } catch (e) {
    return res.status(e.status).json({
      error: true,
      message: 'Error with creating location!',
      details: e
    });
  }
};

/**
 * Controller for getting all locations
 */

const getAllLocations = exports.getAllLocations = async (req, res) => {
  const { name, description, category } = req.body;

  try {
    //return 200 for success
    return res.status(200).json({ locations: await _models._Location.find() });
  } catch (e) {
    return res.status(e.status).json({
      error: true,
      message: 'Error with getting all locations!',
      details: e
    });
  }
};

/**
 * Controller for getting location with requested id
 */

const getLocation = exports.getLocation = async (req, res) => {
  const { title, description } = req.body;
  const { locationId } = req.params;

  if (!locationId) {
    res.status(400).json({
      error: true,
      message: 'You need to provide a location id!',
      details: e
    });
  }

  const location = await _models._Location.findById(locationId);

  if (!location) {
    return res.status(400).json({
      error: true,
      message: 'Location not found!'
    });
  }

  try {
    //return 200 for success
    return res.status(200).json({ location: await _models._Location.find({ _id: locationId }) });
  } catch (e) {
    return res.status(e.status).json({
      error: true,
      message: 'Error with getting all locations!',
      details: e
    });
  }
};

/**
 * Controller for the creation of a hotspot through a location
 */

const createLocationHotspot = exports.createLocationHotspot = async (req, res) => {
  const { title, description } = req.body;
  const { locationId } = req.params;

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

  if (!locationId) {
    return res.status(400).json({ error: true, message: 'A location id must be provided!' });
  }

  try {
    const { hotspot } = await _models._Location.addHotspot(locationId, {
      title,
      description
    });
    return res.status(201).json({
      error: false,
      hotspot
    });
  } catch (e) {
    return res.status(400).json({
      error: true,
      message: 'Error with creating hotspot!',
      details: e
    });
  }
};

/**
 * Controller for getting all the hotspots of
 * this particular location
 */

const getLocationHotspots = exports.getLocationHotspots = async (req, res) => {
  const { locationId } = req.params;

  if (!locationId) {
    return res.status(400).json({
      error: true,
      message: 'You need to provide a location id!'
    });
  }

  const location = await _models._Location.findById(locationId);

  if (!location) {
    return res.status(400).json({
      error: true,
      message: 'Location not found'
    });
  }

  try {
    return res.status(200).json({
      error: false,
      hotspots: await _models.Hotspot.find({ location: locationId }).populate('location', 'name')
    });
  } catch (e) {
    return res.status(e.status).json({
      error: true,
      message: "Error with getting location's hotspots",
      details: e
    });
  }
};