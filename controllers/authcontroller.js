const User = require("../models/user");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const bcrypt = require("bcryptjs");


const register = catchAsync(async (req, res, next) => {
  const { name, email, password } = req.body;


  if ((!name, !password, !email)) {
    return next(new AppError("please provide credentials", 404));
  }

  const user = await User.create({
    name, email, password 
  });
  const token = user.createJWT()
  res.json({
    message: "register User",
    token,
    data:{name:user.name, email:user.email},
  });
});


const login = catchAsync(async (req, res, next) => {

  const {email, password} = req.body

  if(!email || !password){
      return next(new AppError('please provide credentials', 401))
  }
  const user = await User.findOne({email})

  if(!user){
      return next(new AppError('user does not exit', 401))
  }

  const IsPasswordCorrect = await user.comparePassword(password)

  if(!IsPasswordCorrect){
        return next (new AppError('credentials not correct', 400))
  }
  
  const token = user.createJWT()

res.status(200).json({
  message: "success",
  token,
  user: {name:user.name}
});
});

module.exports = {
  register,
  login,
};
