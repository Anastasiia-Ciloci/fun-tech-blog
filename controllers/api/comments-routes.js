const router = require('express').Router();
const { Posts, Comments, Users } = require('../../models');
const auth = require('../../utils/auth');

//get all posts
router.get('/', auth, async (req, res) => {
  const commentData = await Comments.findAll(
    {
      include:[Posts]
    }
  ).catch ((err)=>{
    res.json(err);
  });
  const comments = commentData.map((comment) => comment.get({
    plain: true
  }));
  res.render('all', {
    comments
  });
});
//Create new comment
router.post('/newpost',auth, async (req,res)=>{
  try{
  const commentData = await Comments.create(req.body);
  if (!commentData) {
    res.status(404).json({
      message: 'Comment was not created.'
    });
    return;
  }
  res.status(200).json(commentData);
} catch (err) {
  res.status(400).json(err);
}
});

//find post by id

router.get('/:id',auth, async (req,res)=>{
  try{
  const commentData = await Comments.findByPk(req.params.id,{

    include:[{
      model: Posts
    }]
  });
  if (!commentData) {
    res.status(404).json({
      message: 'Comment with this id was not found.'
    });
    return;
  }
  res.status(200).json(commentData);
} catch (err) {
  res.status(400).json(err);
}
});

//update comment body

router.put('/:id',auth, async (req,res)=>{
  try{
  const commentData = await Comments.update(req.body,{

  where:{
    id:req.params.id,
  },
  });
  if (!commentData) {
    res.status(404).json({
      message: 'Comment with this id was not found.'
    });
    return;
  }
  res.status(200).json(commentData);
} catch (err) {
  res.status(400).json(err);
}
});
//delete comments
router.delete('/:id', auth, async (req, res) => {
  try {
    const commentData = await Posts.destroy({
      where: {
        id: req.params.id,
        
      },
    });

    if (!commentData) {
      res.status(404).json({ message: 'Comment with this id was not found' });
      return;
    }

    res.status(200).json(commentData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;