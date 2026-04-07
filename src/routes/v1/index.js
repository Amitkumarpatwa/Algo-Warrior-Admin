const express=require('express');
const problemRouter=require('./problem.routes')
const authRouter=require('./auth.route')

const v1router=express.Router();
// If any request comes and route start with /problems we map it problemRouter

v1router.use('/problems',problemRouter);
v1router.use('/auth', authRouter);

module.exports=v1router;
