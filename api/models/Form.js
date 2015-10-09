/**
* Form.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
    inputText : {
      type: 'string',
      defaultsTo : ''
    },
    inputFloat : {
      type: 'float',
      defaultsTo : 0.0
    },
    textarea : {
      type: 'string',
      defaultsTo : ''
    },
    checkbox : {
      type: 'boolean',
      defaultsTo : false
    },
    select : {
      type: 'string',
      enum : ['choix 1', 'choix 2', 'choix 3']
    },
    _fields : {
      collection: 'field',
      via:'_form'
    }
  }
};
