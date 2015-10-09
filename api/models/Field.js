/**
* Field.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
    _form: {
      model: 'form'
    },
    label: {
      type: 'string',
      defaultsTo: 'fieldName',
      unique: true,
      required: true
    },
    tag: {
      type: 'string',
      enum: ['input', 'textarea', 'select'],
      defaultsTo: 'input'
    },
    type: {
      type: 'string',
      defaultsTo: 'text'
    },
    options: {
      type: 'array',
      defaultsTo: []
    },
    isRequired: {
      type: 'boolean',
      defaultsTo: false
    }
  }
};
