'use strict';

/**
 * Module dependencies
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Customer Schema
 */
var CustomerSchema = new Schema({
  created: {
    type: Date,
    default: Date.now
  },
  firstName: {
    type: String,
    default: '',
    trim: true,
    required: 'FirstName cannot be blank'
  },
  surName: {
    type: String,
    default: '',
    trim: true
    //required: 'SurName cannot be blank'
  },
  suburb: {
    type: String,
    default: '',
    trim: true

  },
  country: {
    type: String,
    default: '',
    trim: true

  },
  industry: {
    type: String,
    default: '',
    trim: true,
    required: 'Industry cannot be blank'

  },
  phone: {
    type: Number,
    default: '',
    trim: true,
    required: 'phone cannot be blank'

  },
  email: {
    type: String,
    default: '',
    trim: true

  },
  channel: {
    type: String,
    default: '',
    trim: true

  },
  referred: {
    type: Boolean,


  },
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  }
});

mongoose.model('Customer', CustomerSchema);
