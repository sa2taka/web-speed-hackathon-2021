import handler, { withSession } from '../../../../../backend/handler';
import { Post, User } from '../../../../../backend/models';

export default handler.get(async (req, res) => {
  const username = req.query.username === 'string' ? req.query.username : req.query.username[0];
  const limit = typeof req.query.limit === 'string' ? req.query.postId : req.query.postId[0];
  const offset = typeof req.query.offset === 'string' ? req.query.postId : req.query.postId[0];

  const user = await User.findOne({
    where: {
      username,
    },
  });

  if (user === null) {
    throw res.status(404).send({});
  }

  const posts = await Post.findAll({
    limit: Number(limit),
    offset: Number(offset),
    where: {
      userId: user.id,
    },
  });

  return res.status(200).json(posts);
});
