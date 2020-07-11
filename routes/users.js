const express =  require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const admin = require('firebase-admin');
const firebase = require('firebase');

var firebaseConfig = {
    apiKey: "AIzaSyD-4KM9hYIIzx4ftM_MqrG6y_jBR6L23Oc",
    authDomain: "passport-30b13.firebaseapp.com",
    databaseURL: "https://passport-30b13.firebaseio.com",
    projectId: "passport-30b13",
    storageBucket: "passport-30b13.appspot.com",
    messagingSenderId: "718936581864",
    appId: "1:718936581864:web:6ab11dd58dee3ab04d4b5d",
    measurementId: "G-K692GKWBHP"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  // Get a reference to the database service
  var database = firebase.database();

router.get('/login',(req,res) => res.render('login'));

router.post('/register', (req,res) => {
    const {name, email,Facebook,instagram, password,password2} = req.body;

    let errors = [];

    //check required fields
    if(!name||!email||!password||!password2||!Facebook||!instagram){
        errors.push({ msg: 'Please fill all fields'});
    }

    //check password match

    if(password!== password2){
        errors.push({ msg: 'Passwords do not macth'});
    }

    if(password.length< 6){
        errors.push({ msg: 'Password should be at least 6 characters'});
    }
    if(errors.length>0){
        console.log(errors);

        res.render('register',{
            errors,
            name,
            email,
            Facebook,
            instagram,
            password,
            password2
        });
    }else{
        firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            errors.push(errorMessage);
            console.log(errorMessage);
            // ...
          });
        const newUser ={
            name,
            email,
            Facebook,
            instagram,
            password
        }
        //hash password
        
        database.ref('users').push(newUser);
        res.redirect('/dashboard');
    }
})
router.get('/register',(req, res) => res.render('register'));

//login handle
router.post('/login',(req,res) => {
    var flag = 1;

   
    const {email,password} = req.body;
    firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error){
        flag=0;
        console.log(error);
        if(error){
            res.redirect('/users/login');
        }
        
      });
      if(flag==1){
          res.redirect('/dashboard');
      }
         
})

//logout
router.get('/logout',(req,res) => {

     firebase.auth().signOut().then(function() {
        // Sign-out successful.
      }).catch(function(error) {
        // An error happened.
      });

      res.redirect('/users/login');

})

module.exports = router;

