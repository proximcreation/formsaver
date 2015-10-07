module.exports = {

  index: function (req, res) {
    // update the user
    if (req.session.user) {
      User.findOne(req.session.user.id).exec(function (err, user) {
        if (err) return res.serverError(err);

        req.session.user = user;
        if (user.isAdmin) {
          return res.view('homePage', { user: user});
        } else {
          return res.view('homePage', { user: user});
        }
      });
    } else {
      return res.view('homePage', { user: undefined});
    }
  }

};
