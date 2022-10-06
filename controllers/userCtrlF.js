const fetch = require('node-fetch')
const flash = require('connect-flash');
const LocalStorage = require("node-localstorage").LocalStorage
const localStorage = new LocalStorage('./storageToken')

exports.register = async (req, res) => {
    let reg = await fetch(`http://localhost:8030/api/users/register/`, {
    // Adding method type
    method: "POST",
    
    // Adding body or contents to send
    body: JSON.stringify({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    password: req.body.password,
    avatar : req.body.avatar,
    bio: req.body.bio,
    }),
    
    // Adding headers to the request
    headers: {
    "Content-type": "application/json",
    },
    })
    .then((response) => response.json())
    
    .then((json) => {
    if(json.success){
        req.flash('success', 'utilisateur crée avec succes connectez vous')
        res.redirect('/login')
    }else{
        res.render('register',json)
    }
    })
    
    .catch((err) => console.log(err));
};

exports.login = async (req, res) => {
    let log = await fetch(`http://localhost:8030/api/users/login/`, {
      // Adding method type
      method: "POST",
  
      // Adding body or contents to send
      body: JSON.stringify({
        email: req.body.email,
        password: req.body.password,
      }),
  
      // Adding headers to the request
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((response) => response.json())
  
      .then((json) => {
        if(json.success || json.successAdmin){
          localStorage.setItem("token", json.token);
          req.flash('success','Vous êtes bien connecté')
          res.redirect("/feed");
        }else{
          res.render("login",json)
        }
      })
  
      .catch((err) => console.log(err));
};

exports.getMe = async (req, res) => {
  // recupere les infos user
  const userInfo = await fetch(`http://localhost:8030/api/users/getMe/`,
    {
      headers: {
        Authorization: localStorage.getItem("token"), // Token à récupérer
      },
    }
  );
   myProfil = await userInfo.json();
    res.render('profil',{myProfil})
};

exports.updateProfile = async (req, res) => {
  fetch(`http://localhost:8030/api/users/update/`, {
  // Adding method type
  method: "PUT",
  
  // Adding body or contents to send
  body: JSON.stringify({
  firstname: req.body.firstname,
  lastname: req.body.lastname,
  bio: req.body.bio,
  }),
  
  // Adding headers to the request
  headers: {
  "Content-type": "application/json",
  Authorization: localStorage.getItem("token"), //Token à récupérer
  },
  })
  // Converting to JSON
  .then((response) => response.json())
  
  
  .then((json) => {
   if (json.success) {
    myProfil= json
  req.flash('success','votre profil a été mis a jour')
  res.render('profil',{message:req.flash('success'),myProfil})
   }else{
    myProfil = json
    res.render('profil',{myProfil})
   }
  
  });
};

exports.deleteProfil = async (req, res) => {
  // recupere les infos user
  const userDelete = await fetch(`http://localhost:8030/api/users/delete`,
    {
      method:"DELETE",

      headers: {
        Authorization: localStorage.getItem("token"), // Token à récupérer
      },
    }
  );
   myProfil = await userDelete.json();
    if(myProfil.success){
      req.flash('success',"Profil supprimé avec success")
      res.redirect('/register')
    }else{
      res.render('profil',{myProfil})
    }
};
