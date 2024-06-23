//here we are not using function component in place class as error class exist in java
class ErrorHandler extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
}
}

export const errorMiddleware = (err, req, res, next) => {
    err.message = err.message || "Internal Server Error";
    err.statusCode = err.statusCode || 500;

    if(err.code === 11000) {
        const message = `Duplicate ${Object.keys(err.keyValue)} Entered`;
        err = new ErrorHandler(message, 400);
    }
    if (err.name === "JsonWebTokenError"){
        const message = "Json Web Token is invalid, Try again!";
        err = new ErrorHandler(message, 400);
    }
    if(err.name === "TokenExpiredError"){
        const message = "Json Web Token is Expired, Try again!";
        err = new ErrorHandler(message, 400);
    }
    //cast error is like in name u need to mention string but in place of this u mention number
    if(err.name === "CastError"){
        const message =  `Invalid ${err.path}`;
        err = new ErrorHandler(message, 400);
    }
// On sending request we get message like "Message validate faile: .... for remaving this line"
    const errorMessage = err.errors ? Object.values(err.errors).map(error=> error.message).join("") : err.message;

    return res.status(err.statusCode).json({
        success: false,
        message: errorMessage,
    });
};

export default ErrorHandler;