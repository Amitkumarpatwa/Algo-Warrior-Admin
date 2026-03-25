const BaseError = require("./base.error");
const { StatusCodes }=require('http-status-codes');

class NotImplemented extends BaseError{
    constructor(details){
        super("Internal",StatusCodes.NOT_IMPLEMENTED,`Something went wrong`,details)
    }
}

module.exports=NotImplemented;