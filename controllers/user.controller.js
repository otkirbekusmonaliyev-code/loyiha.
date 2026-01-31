const { User } = require("../models/users.model.js");

const GET = async (req, res) => {
  const data = await User.find();
  res.json({
    message: "Success",
    data: data,
  });
};
const GET_USER_BY_ID = async (req, res) => {
  const data = await User.findById();
  res.json({
    message: "Success",
    data: data,
  });
};
const DELETE_USER = async (req, res) => {
  const { id } = req.params;
  await User.findByIdAndDelete(req.user._id, { $pull: { posts: id } });
  res.json({
    message: "Ochirildi",
  });
};
const UPDATE_USER = async (req, res) => {
  const { id } = req.params;
  const { name, gmail, age, phone, password  } = req.body;
  const data = await User.findByIdAndUpdate(id, { name, gmail, age, phone, password }, { new: true });
  res.json({
    message: "Yangilandi",
    data: data,
  });
};

module.exports = {
    GET,
    GET_USER_BY_ID,
    DELETE_USER,
    UPDATE_USER
}

