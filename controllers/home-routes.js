const router = require("express").Router();
const serialize = require("../utils/serialize");
const { Comments, Users, Posts } = require("../models");

// Loads Homepage
router.get("/", async (req, res) => {
  try {
    const dbPostData = await Posts.findAll({
      include: [
        {
          model: Users,
        },
      ],
    });
    const posts = dbPostData.map((post) => serialize(post));
    res.render("homepage", {
      posts,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Loads Dashboard page
router.get("/dashboard", async (req, res) => {
  try {
    if (req.session.loggedIn) {
      const dbPostData = await Posts.findAll({
        where: {
          users_id: req.session.users_id,
        },
        include: [
          {
            model: Users,
          },
        ],
      });
      const posts = dbPostData.map((post) => serialize(post));
      res.render("dashboard", {
        posts,
        loggedIn: req.session.loggedIn,
      });
    } else {
      res.redirect("/login");
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Loads Posts page
router.get("/posts", async (req, res) => {
  try {
    const dbPostData = await Posts.findAll({
      include: [
        {
          model: Users,
        },
      ],
    });
    const posts = dbPostData.map((post) => serialize(post));
    res.render("allposts", {
      posts,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Loads single Post page
router.get("/posts/:id", async (req, res) => {
  try {
    let matchesUser = false;
    const postData = await Posts.findOne({
      where: {
        id: req.params.id,
      },
      include: [
        {
          model: Users,
        },
      ],
    });
    const commentData = await Comments.findAll({
      where: {
        post_id: req.params.id,
      },
      include: [
        {
          model: Users,
        },
      ],
    });
    if (postData.user.id === req.session.user_id) {
      console.log("User matches the post!");
      matchesUser = true;
    }
    console.log("1", matchesUser);
    const post = serialize(postData);
    const comments = serialize(commentData);
    res.render("single-post", {
      post,
      comments,
      matchesUser,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Loads Add Post page
router.get("/addpost", (req, res) => {
  if (req.session.loggedIn) {
    res.render("addpost", {
      loggedIn: req.session.loggedIn,
    });
  }
  res.render("login", {
    loggedIn: req.session.loggedIn,
  });
});

// Renders the log-in screen if session is not logged in
router.get("/login", (req, res) => {
  if (req.session.loggedIn) {
    return res.redirect("/dashboard");
  }
  res.render("login");
});

// Renders sign-up page, and logs user out if signing up as new user
router.get("/signup", (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
    res.render("signup");
    return;
  }
  res.render("signup");
});

module.exports = router;
