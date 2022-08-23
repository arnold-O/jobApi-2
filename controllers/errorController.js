const AppError = require('../utils/appError')

const handleCAstDBError = (err) => {
  const message = `resource not found, invalid ${err.path}`;
  return new AppError(message, 400);
};
const handleValidationError = (err) => {
  // looping over an object with object.values
  const message = Object.values(err.errors).map((value) => value.message);
  return new AppError(message, 400);
};
const handleDuplicateError = (err) => {
  const message = `Duplicate ${Object.keys(err.keyValue)} entered`;
  return new AppError(message, 400);
};


module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error";

  // wrong mongoose Object Id Error
  let error = { ...err };
  
  if (err.name === "CastError") err = handleCAstDBError(err);

  // hadlimg mongoose validation Error
  if (err.name === "validationError") err = handleValidationError(err);

  // handlimg duplicate error
  if (err.code === 11000) err = handleDuplicateError(err);


  res.status(err.statusCode).json({
    success: false,
    error: err.message,
  });
};
