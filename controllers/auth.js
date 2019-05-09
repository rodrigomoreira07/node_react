const jwt = require('jsonwebtoken');
require('dotenv').config();
const expressJwt = require('express-jwt');

const User = require('../models/user');


exports.signup = async (req, res) => {
    const userExixts = await User.findOne({ email: req.body.email });

    if (userExixts) 
        return res.status(403).json({
            error: "Email is taken!"
        });

    const user = await new User(req.body);
    await user.save();

    res.status(200).json({ message: "Signup sucess! Please login." });
}

exports.signin = (req, res) => {
    // find the user based on email
    const { email, password } = req.body;
    User.findOne({ email }, (err, user) => {
        // if error or no user
        if (err || !user) {
            console.log('User does not exists')
            return res.status(401).json({
                error: "User invalid"
            })
        }
        // if user, authenticate
        if (!user.authenticate(password)) {
            console.log('Email and Password do not match')
            return res.status(401).json({
                error: "User invalid"
            })
        }
        // generate a token with user id and secret
        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
        // persist the token as 't' in cookie with expiry date
        res.cookie("t", token, { expire: new Date() + 9999 });
        // return response with user and token to frontend client
        const { _id, name, email } = user
        return res.json({ token, user: { _id, name, email } }); // or return res.json({ token, user: { user._id, user.name, user.email } });
    })
}

exports.signout = (req, res) => {
    res.clearCookie("t");
    return res.json({ message: "Signout sucess"})
}


exports.requireSignin = expressJwt({
    // if the token is valid, express jwt appends the verified users id
    // in an auth key to the request object
    secret: process.env.JWT_SECRET, 
    userProperty: "auth"
})