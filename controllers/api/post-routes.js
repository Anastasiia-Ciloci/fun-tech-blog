const router = require("express").Router();
const { Comments, Users, Posts } = require("../../models");

// Get ALL Posts
router.get("/", async (req, res) => {
  try {
    const postData = await Posts.findAll({
      include: [
        {
          model: Users,
        },
        {
          model: Comments,
        },
      ],
    });
    if (!postData) {
      res.json("No posts");
    } else {
      res.json(postData);
    }
  } catch (err) {
    res.status(400).json(err);
  }
});

// Create Post
router.post("/", async (req, res) => {
  try {
    const newPost = await Posts.create(
      {
        title: req.body.title,
        content: req.body.content,
        user_id: req.session.user_id,
      },
      req.body
    );
    res.status(200).json(newPost);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Update Post by ID
router.put("/", (req, res) => {
  Posts.update(
    {
      title: req.body.title,
      content: req.body.content,
    },
    {
      where: {
        id: req.body.postId,
      },
    }
  ).then((update) => {
    res.json(update);
  });
});

// Delete Post by ID
router.delete("/", async (req, res) => {
  try {
    const deletedPost = await Posts.destroy({
      where: {
        id: req.body.postId,
      },
    });
    res.status(200).json(deletedPost);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
