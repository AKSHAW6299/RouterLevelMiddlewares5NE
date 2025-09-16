// router.js
import express from 'express'
// Router-level middleware works in the same way as application-level middleware, except it is bound to an instance of express.Router().
const router = express.Router()

// Middlewares
// 1) 1st middleware => [authentication middleware to verify the user is valid or not]
const authentication = function (req, res, next) {
    console.log('Inside authentication middleware...');
    req.user = { userId: 1, role: 'admin' } // Dummy user
    if (req.user) {     // If a valid user is there in request then proceed to next() middleware.
        next()
    } else {
        res.json({
            success: false,
            message: 'Not a valid user...'
        })
    }
}
// 2) 2nd middleware
const isStudent = function (req, res, next) {
    console.log('Inside student middleware...');
    if (req.user.role === 'student') {      // If the user is student go to next middleware.
        next()
    } else {
        res.json({
            success: false,
            message: 'Access denied, this route is only for students...'
        })
    }
}
// 3) 3rd middleware
const isAdmin = function (req, res, next) {
    console.log('Inside admin middleware...');
    if (req.user.role === 'admin') {        // If the user is admin go to next middleware.
        next()
    } else {
        res.json({
            success: false,
            message: 'Access denied, this route is only for admins...'
        })
    }
}

// Protected routes
// Note: Check [authentication] middleware first then use [isStudent] middleware
// Here also order of middlewares matters
router.get('/student', authentication, isStudent, (req, res) => {
    console.log('I am inside student route...');
    res.send('Student specific page!')
    // res.json({
    //     success: true,
    //     message: 'Welcome to the student dashboard!'
    // })
})

router.get('/admin', authentication, isAdmin, (req, res) => {
    console.log('I am inside admin route...');
    res.send('Admin specific page!')
    // res.json({
    //     success: true,
    //     message: 'Welcome to the admin dashboard!'
    // })
})

export default router
