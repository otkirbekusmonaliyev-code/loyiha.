const jwt = require("jsonwebtoken");
const { User } = require("../models/relations.model.js");
require("dotenv").config()

const checkToken = async (req, res, next) => {
  try {
    const header = req.headers["authorization"];

    if (!header) {
      return res.json({
        message: "Token berilmagan",
      });
    }

    const token = header.split(" ")[1];

    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    const userId = decoded.id;

    const user = await User.findByPk(userId);

    if (!user) {
      return res.json({
        message: "Bunday user yoq",
      });
    }

    req.user = user;

    next()

  } catch (error) {
    console.log(error.message)
  }
}

module.exports = { checkToken };