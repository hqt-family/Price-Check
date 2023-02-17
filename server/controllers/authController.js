const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const User = require("../model/authModel");
const { use } = require("../routes/authRoute");

const getUsers = asyncHandler(async (req, res) => {
  const permission = req.query.permission;
  if (permission != "master") {
    res.status(401);
    throw new Error("Not authorized");
  }
  const users = await User.find({
    permission: { $not: { $regex: "master" } },
  });
  if (!users) {
    res.status(400);
    throw new Error("Not found");
  }
  res.status(200).json(users);
});

const registerUser = asyncHandler(async (req, res) => {
  const { name, password, permission } = req.body;
  if (!name || !password || !permission) {
    res.status(400);
    throw new Error("Vui lòng kiểm tra lại đầy đủ các trường thông tin");
  }

  const userExists = await User.findOne({ name });

  if (userExists) {
    res.status(400);
    throw new Error("Người dùng đã tồn tại");
  }

  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);

  const user = await User.create({
    name,
    password: hashPassword,
    permission,
  });

  if (user) {
    res.status(200).json({
      _id: user.id,
      name: user.name,
      permission,
    });
  } else {
    res.status(400);
    throw new Error("Vui lòng kiểm tra lại dữ liệu người dùng");
  }

  res.json({ message: "Đăng ký tài khoản thành công" });
});

const loginUser = asyncHandler(async (req, res) => {
  const { name, password } = req.body;

  const user = await User.findOne({ name });

  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user.id,
      name: user.name,
      password: user.password,
      permission: user.permission,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Sai name hoặc mật khẩu, vui lòng kiểm tra lại");
  }

  res.status(200).json({ message: "Đăng nhập thành công" });
});

const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.body.id);
  user.permission = req.body.permission;

  const users = await User.find({
    permission: { $not: { $regex: "master" } },
  });
  user.save();
  res.status(200).json(users);
});

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

module.exports = {
  getUsers,
  registerUser,
  loginUser,
  updateUser,
};
