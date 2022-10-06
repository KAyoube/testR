const fetch = require("node-fetch");
const LocalStorage = require("node-localstorage").LocalStorage;
let localStorage = new LocalStorage("./storageToken");

// MY FUNCTIONS CRUD POSTS

//----------------------- CRUD =>(CREATE)
exports.newPost = async (req, res) => {
  await fetch(`http://localhost:8030/api/posts/new/`, {
    // Adding method type
    method: "POST",

    // Adding headers to the request
    headers: {
      Authorization: localStorage.getItem("token"),
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    credentials: "same-origin",

    // Adding body or contents to send
    body: JSON.stringify({
      title: req.body.title,
      text: req.body.text,
    }),
  })
    // Converting to JSON
    .then((res) => {
      return res.json();
    })

    // Displaying results to console
    .then((json) => {
      console.log("OK new POST", json);
      if (json) {
        req.flash("success", "publication posté avec success");
        res.redirect("/feed");
      } else {
        res.redirect("/login");
      }
    })

    .catch((err) => {
      console.log("ERR ----", err);
    });
}; //------------------------------------------- NEW POST OK

//----------------------------- CRUD => (READ)
exports.getAllPosts = async (req, res) => {
  // recupereration de la liste des Post
  const postAll = await fetch(`http://localhost:8030/api/posts/all/`, {
    headers: {
      Authorization: localStorage.getItem("token"), // Token à récupérer
    },
  });
  posts = await postAll.json();

  // recuperation de la liste des Users
  const userAll = await fetch("http://localhost:8030/api/users/getUsersAll/", {
    headers: {
      Authorization: localStorage.getItem("token"), // Token à récupérer
    },
  });
  users = await userAll.json();

  // recupere les infos du user logged
  const userInfo = await fetch(`http://localhost:8030/api/users/getMe/`, {
    headers: {
      Authorization: localStorage.getItem("token"), // Token à récupérer
    },
  });
  me = await userInfo.json();
    res.render("feed", { posts, users, me});
}; //--------------------------------------GET ALL POSTs BY ID OK-------------

exports.getPostById = async (req, res) => {
  // recuperation de la liste des Users
  const userAll = await fetch("http://localhost:8030/api/users/getUsersAll/", {
    headers: {
      Authorization: localStorage.getItem("token"), // Token à récupérer
    },
  });
  users = await userAll.json();

  // recupere les infos user
  const postById = await fetch(
    `http://localhost:8030/api//posts/getPostByID/${req.params.id}`,
    {
      method: "GET",

      headers: {
        Authorization: localStorage.getItem("token"), // Token à récupérer
      },
    }
  );
  myPost = await postById.json();

  const userInfo = await fetch(`http://localhost:8030/api/users/getMe/`, {
    headers: {
      Authorization: localStorage.getItem("token"), // Token à récupérer
    },
  });
  me = await userInfo.json();

  res.render("postById", { myPost, users, me, message:req.flash('success') });
}; //--------------------------------------GET POST BY ID OK-------------

//-------------------------------- CRUD (UPDATE)
exports.updatePost = async (req, res) => {
  fetch(`http://localhost:8030/api/posts/update/${req.params.id}`, {
    // Adding method type
    method: "PUT",

    // Adding body or contents to send
    body: JSON.stringify({
      title: req.body.title,
      text: req.body.text,
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
      console.log(json);
        req.flash('success','Votre post a été modifié avec success')
        res.redirect(`/posts/${req.params.id}`)
      
    })
    .catch((err) => console.log(err));
};
//--------------------------------- TODO UPDATE POST

//---------------------------- CRUD => (DELETE)
exports.deletePost = async (req, res) => {
  const postDelete = await fetch(`http://localhost:8030/api/posts/delete/${req.params.id}`,
    {
      method: "DELETE",
      headers: {
        Authorization: localStorage.getItem("token"), // Token à récupérer
      },
    }
  );
  myDelete = await postDelete.json();
  console.log(myDelete);
    //req.flash("success", "supression du post avec succes");
    res.redirect("/feed");
}; //-------------------------------------------- DELETE POST TODO => NOT OK
