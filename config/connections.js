
module.exports.connections = {

  localDiskDb: {
    adapter: 'sails-disk'
  },
  mongodbServer: {
    adapter: 'sails-mongo',
    host: 'localhost',
    port: 27017,
    database: 'formsaver'
    // user: 'username',
    // password: 'password',
  }

};
