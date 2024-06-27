export const catchAsyncErrors = (theFunction) => {
    return (req,res,next) =>{
        Promise.resolve(theFunction(req,res,next)).catch(next);
    };
};
//page implementing async await errors