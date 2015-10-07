module.exports = {

  login: function (req, res) {
    User.findOne({ email: req.param('email') }).exec(function(err, user) {
      if (err) return res.serverError(err);

      if (!user) return res.notFound();

      require('machinepack-passwords').checkPassword({
        passwordAttempt: req.param('password'),
        encryptedPassword: user.password
      }).exec({
        error: function (err) {
          return res.serverError(err);
        },
        incorrect: function () {
          req.session.user = undefined;
          return res.forbidden();
        },
        success: function () {
          req.session.user = user;
          return res.ok(user);
        }
      });
    });
  },

  logout: function (req, res) {
    req.session.user = undefined;
    return res.ok();
  },

  emailExists: function (req, res) {
    User.findOne({ email: req.param('email') }).exec(function(err, user) {
      if (err) return res.serverError(err);

      if (user) {
        return res.ok({ exists: true });
      } else {
        return res.ok({ exists: false });
      }
    });
  }

};
