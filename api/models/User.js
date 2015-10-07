/**
* User.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
    firstname: {
      type: 'string',
      required: true
    },
    lastname: {
      type: 'string',
      required: true
    },
    email: {
      type: 'email',
      unique: true,
      required: true
    },
    password: {
      type: 'string',
      required: true
    },
    isAdmin: {
      type: 'boolean',
      defaultsTo: false
    },
    _form: {
      model: 'form'
    }
  },
  beforeCreate: function (values, cb) {
    require('machinepack-passwords').encryptPassword({
      password: values.password
    }).exec({
      error: function (err) {
        cb(err);
      },
      success: function (result) {
        values.password = result;
        cb();
      }
    });
  }
};
