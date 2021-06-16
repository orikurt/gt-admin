const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('./models/user');

passport.use(new LocalStrategy(
    async (username, password, done) => {
      try{
        const user = await User.authenticate({ username: username, password: password });
        return done(null, user);
      }
      catch(e){
        return done(null, false, { message: e.toString() });
      }
    }
));

passport.serializeUser(function(user, done) {
  done(null, user._id);
});

passport.deserializeUser(async (user, done) => {
  try{
    const doc = await User.getUserById(user);
    done(null, doc);
  }
  catch(e){
    done(e, false);
  }
});

module.exports = passport;