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

  // forgot: function (req, res) {
  //   User.findOne({ username: req.param('username') }).exec(function (err, user) {
  //     if (err) return res.serverError(err);
  //
  //     if (!user) return res.notFound();
  //
  //     require('machinepack-util').generateUniqueToken().exec({
  //       error: function (err) {
  //         return res.serverError(err);
  //       },
  //       success: function (token) {
  //         user.resetPasswordToken = token;
  //
  //         user.save(function (err, user) {
  //           emailService.send('password', {
  //             to: user.email,
  //             subject: 'Réinitialisation de votre mot de passe',
  //             name: user.firstname.toUpperCase() + ' ' + user.lastname.toUpperCase(),
  //             token: token
  //           });
  //           res.ok();
  //         });
  //       }
  //     });
  //   });
  // },
  //
  // reset: function (req, res) {
  //   // the req.param('id') is the token
  //   User.findOne({ resetPasswordToken: req.param('id') }).exec(function (err, user) {
  //     if (err) return res.serverError(err);
  //
  //     if (!user) return res.notFound();
  //
  //     return res.redirect('/#!/reset/' + req.param('id'));
  //   });
  // },
  //
  // updatePassword: function (req, res) {
  //   // this call can be done thanks to a token, or the user is logged
  //   if (req.param('token')) {
  //     User.findOne({ resetPasswordToken: req.param('token') }).exec(function (err, user) {
  //       if (err) return res.serverError(err);
  //
  //       if (!user) return res.notFound();
  //
  //       require('machinepack-passwords').encryptPassword({
  //         password: req.param('password')
  //       }).exec({
  //         error: function (err) {
  //           return res.serverError(err);
  //         },
  //         success: function (result) {
  //           user.password = result;
  //           user.resetPasswordToken = undefined;
  //           user.save(function (err, user) {
  //             if (err) return res.serverError(err);
  //
  //             res.ok();
  //           });
  //         }
  //       });
  //     });
  //   } else {
  //     User.findOne(req.session.user.id).exec(function (err, user) {
  //       if (err) return res.serverError(err);
  //
  //       if (!user) return res.notFound();
  //
  //       require('machinepack-passwords').encryptPassword({
  //         password: req.param('password')
  //       }).exec({
  //         error: function (err) {
  //           return res.serverError(err);
  //         },
  //         success: function (result) {
  //           user.password = result;
  //           user.resetPasswordToken = undefined;
  //           user.save(function (err, user) {
  //             if (err) return res.serverError(err);
  //
  //             res.ok();
  //           });
  //         }
  //       });
  //     });
  //   }
  // }

};
