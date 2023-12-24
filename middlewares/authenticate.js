const ErrorHandler = require("../utils/errorHandler");
const User = require('../models/userModel')
const catchAsyncError = require("./catchAsyncError");
const jwt = require('jsonwebtoken');

//Find User Login or Not user login to allow
exports.isAuthenticatedUser = catchAsyncError(async (req, res, next) => {
   const { token } = req.cookies;

   if (!token) {
      return next(new ErrorHandler('Login first to handle this resource', 401))
   }

   const decoded = jwt.verify(token, process.env.JWT_SECRET)
   req.user = await User.findById(decoded.id)
   next();
})

//Only allow Authorize Users for a specific route
exports.authorizeRoles = (...roles) => {
   return (req, res, next) => {
      if (!roles.includes(req.user.role)) {
         return next(new ErrorHandler(`Role ${req.user.role} is not allowed`,401))
      }
      next();
   }
}