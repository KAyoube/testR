// import des modules de npm
const express = require("express");

// import des fonctions des autres fichiers
const userCtrl = require("../controllers/userCtrlF");

exports.router = (() => {
  let userRouter = express.Router();

  // MISE EN PLACE DES ROUTES
  userRouter.route("/").get((req, res) => {
    res.render("home");
  });
  //----------------------------CRUD USER------------------------------------------




  // ----------------------------------------------REGISTER (CREATE)--------------
  userRouter.route("/register").get((req, res) => {
    res.render("register", { message: req.flash("success") });
  });
  userRouter.route("/register").post(userCtrl.register);
  //--------------------------------------------- REGISTER OK -------------------




  // -------------------------------------LOGIN-------------------
  userRouter.route("/login").get((req, res) => {
    res.render("login", { message: req.flash("success") });
  });
  userRouter.route("/login").post(userCtrl.login);
  //-------------------------------  LOGIN OK------------------------
 



  // --------------------------GET PROFIL (READ)-----------------
  userRouter.route("/profil").get(userCtrl.getMe);
  //----------------------------GET PROFIL OK -------------



  // -------------------------------------UPDATE profil (UPDATE)---------------
  userRouter.route("/profil").post(userCtrl.updateProfile);
  //----------------------------------------UPDATE OK -------------------------




  // --------------------------------DELETE profil (DELETE)---------------
  userRouter.route("/profil/delete").post(userCtrl.deleteProfil);
  //------------------------------------DELETE OK------------------------------



  //------------------------------------------------------------------CRUD USER OK



  return userRouter;
})();
