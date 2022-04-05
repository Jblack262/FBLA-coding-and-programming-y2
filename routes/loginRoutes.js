const loginSuccessRoute = '/'; //goes home
const loginFailRoute = '/login'; //back to login


const express = require('express')
const app = express.Router()
const bcrypt = require('bcrypt')
const passport = require('passport');

const UserSchema = require('../models/users');

app.use(express.json())
// Router.post('/login', passport.authenticate('local', { successRedirect: '/adminHome', failureRedirect: '/adminLogin' }));

app.post('/', async (req, res) => { //create user
    const { username, name, password } = req.body;
    console.log(req.body)
    console.log(username, name, password)
    let errors = [];
    try {
        // const salt = await bcrypt.genSalt(10)
        // console.log(`Salt ${salt}`);

        UserSchema.findOne({ username: username }).exec((err, user) => {
            console.log(username);
            if (user) {
                console.log('username already in use')
                errors.push({ msg: 'user already registered' })
            } else {
                const newUser = new UserSchema({
                    username: username,
                    name: name,
                    password: password
                })

                bcrypt.genSalt(10, (err, salt) =>
                    bcrypt.hash(newUser.password, salt,
                        (err, hash) => {
                            if (err) throw err;
                            //same pass to hash
                            newUser.password = hash;
                            //save user

                            newUser.save()
                                .then((value) => {
                                    console.log(value)
                                    // req.flash('success_msg', 'You have now registered')
                                    // res.redirect('/login');
                                    res.sendStatus(200)
                                })
                                .catch(value => console.log(value))
                        }
                    )
                )
            }
        })
    } catch (error) {
        console.error(error)
    }
})

app.post('/login', async (req, res, next) => { //login
    passport.authenticate('local', {
        successRedirect: loginSuccessRoute,
        failureRedirect: loginFailRoute
    })(req, res, next)
})

app.get('/current', async(req, res) => {
    if (req.user === undefined) {
        // The user is not logged in
        res.json({});
    } else {
        res.json({
            user: req.user
        });
    }
})

app.post('/logout', (req, res, next) => {
    req.logout();
    res.redirect('/');
})

app.get('/', async (req, res) => {
  try {
      const allUsers = await UserSchema.find({});
      res.status(201).json({ allUsers });
  } catch (error) { res.status(500).json({ msg: error }) }
})
app.patch('/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const newUser = req.body;
        await UserSchema.findOneAndUpdate({ _id: id }, newUser);
        res.status(201).json({status: 'success', msg: 'user updated'});
    } catch (error) { res.status(500).json({status: 'failed', msg: error}) }
})
app.delete('/', async (req, res) => {
  try {
      await UserSchema.deleteMany({});
      res.status(201).json({ success: true, msg: "all users deleted" });
  } catch (error) { res.status(500).json({ msg: error }) }
})

module.exports = app;