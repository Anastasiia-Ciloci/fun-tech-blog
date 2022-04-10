const router = require('express').Router();
const { Posts, Comments, Users } = require('../../models');
const auth = require('../../utils/auth');

//get all posts
router.post('/', auth, async (req, res) => {
  try {
    const postData = await Posts.create(req.body);

    res.status(200).json(postData);
  } catch (err) {
    res.status(400).json(err);
  }
});
//update post

router.put('/:id',auth, async (req,res)=>{
  try{
  const postData = await Posts.update(req.body,{

  where:{
    id:req.params.id,
  },
  });
  if (!postData) {
    res.status(404).json({
      message: 'Post with this id was not found.'
    });
    return;
  }
  res.status(200).json(postData);
} catch (err) {
  res.status(400).json(err);
}
});


//delete post
router.delete('/:id', auth, async (req, res) => {
  try {
    const postData = await Posts.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!postData) {
      res.status(404).json({ message: 'No post found with this id!' });
      return;
    }

    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;