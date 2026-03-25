const express=require('express');
const v1router = require('./v1');


const apiRouter=express.Router();
// If any request comes and route start with /v1 we map it v1router

apiRouter.use('/v1',v1router);


module.exports=apiRouter;