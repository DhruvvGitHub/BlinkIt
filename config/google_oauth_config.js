var GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;
const userModel = require("../models/user-model")
const passport = require("passport")

passport.use(new GoogleStrategy({
    clientID:     process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://yourdomain:3000/auth/google/callback",
    passReqToCallback   : true
  },
  async function (request, accessToken, refreshToken, profile, done) {
    try {
        let user = await userModel.findOne({email: profile.emails[0].value})

        if(!user) {
            new userModel({
                name: profile.displayName,
                email: profile.emails[0].value
            })
        }

        await user.save()

        cb(null, user)
    }
    catch(err) {
        cb(err, false)
    }
  }
));

passport.serializeUser((user, cb) => {
    return cb(null, user._id)
})

passport.deserializeUser(async (id, cb) => {
    let user = await userModel.findOne({_id: id})
    cb(null, user)
})

module.exports = passport