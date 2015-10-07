/**
* Form.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
    inputText : {
      type: 'string'
    },
    inputFloat : {
      type: 'float'
    },
    textarea : {
      type: 'float'
    },
    checkbox : {
      type: 'boolean'
    },
    select : {
      type: 'string',
      enum : ['choix 1', 'choix 2', 'choix 3']
    }
  }
};
