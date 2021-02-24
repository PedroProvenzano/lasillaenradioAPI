async function checkAdmin(req, res, next) {
  if (!req.body.adminPass) {
    res.status(400).send(`You need to provide admin pass`);
    return;
  }
  if (req.body.adminPass == process.env.ADMIN_PASS) {
    next();
  } else {
    res.status(403).send(`You need to be admin`);
    return;
  }
}

module.exports = checkAdmin;
