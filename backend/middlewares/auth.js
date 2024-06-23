//for making authrising dashboard

import { User } from "../models/userSchema.js";
import { catchAsyncErrors } from "./catchAsyncErrors.js";
import ErrorHandler from "./errorMiddleware.js";
import jwt from "jsonwebtoken";


//here we are trying to check token
export const isAdminAuthenticated = catchAsyncErrors(async (req, res, next) =>{
    const token = req.cookies.adminToken;
    if(!token){
        return next(new ErrorHandler("Admin Not Authenticated!",400));
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = await User.findById(decoded.id); //here is the id that is in userschema
    if(req.user.role !== "Admin"){ //authentication
        return next(new ErrorHandler(
            `${req.user.role} not authorised for this rosources!`,
            403));
    }
    next();
});


export const isPatientAuthenticated = catchAsyncErrors(async (req, res, next) =>{
    const token = req.cookies.patientToken;//authorisation onwards
    if(!token){
        return next(new ErrorHandler("Patient Not Authenticated!",400));
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = await User.findById(decoded.id); //here is the id that is in userschema
    if(req.user.role !== "Patient"){ //authentication onwards
        return next(new ErrorHandler(
            `${req.user.role} not authorised for this rosources!`,
            403));
    }
    next();
});


export const isAuthorized = (...roles) => {
    return (req, res, next) => {
      if (!roles.includes(req.user.role)) {
        return next(
          new ErrorHandler(
            `${req.user.role} not allowed to access this resource!`
          )
        );
      }
      next();
    };
  };