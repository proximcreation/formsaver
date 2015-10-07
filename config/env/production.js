module.exports = {

  port: 80,
  log: {
    level: "info"
  },
  models: {
    connection: 'mongodbServer'
  },
  grunt: {
    _hookTimeout: 1000000
  }

};
