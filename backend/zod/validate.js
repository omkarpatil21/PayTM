const zod = require('zod');

const signupUser = zod.object({
    username : zod.string().min(5),
    password : zod.string().min(5),
    firstName : zod.string().min(5),
    lastName : zod.string().min(5),
})

const signinUser = zod.object({
    username : zod.string().min(5),
    password : zod.string().min(5),
})

const updateUser= zod.object({
    password : zod.string().min(5).optional(),
    firstName : zod.string().min(5).optional(),
    lastName : zod.string().min(5).optional(),
})
module.exports = {signupUser,signinUser,updateUser}