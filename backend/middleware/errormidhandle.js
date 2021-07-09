const errormidhandle= (err,req,res, next) => {
    const errorCode= res.statusCode === 200? 500: res.statusCode;
    res.status(errorCode);
    res.json({
        message: err.message,
    })
}

module.exports = {errormidhandle};