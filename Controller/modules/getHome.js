/**
 * @title test of creating small modules to import
 * @description This is bad use of modules as this is not reusable
 * @param {object} req requesrt
 * @param {object} res response
 */
function home(req, res) {
    if (!req.session.nameID) {
      res.render('name');
    } else {
      res.redirect('succes');
    };
  };

module.exports = home;