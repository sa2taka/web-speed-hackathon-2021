import getHandler, { withSession } from '../../../../../backend/handler';
import { Post, User } from '../../../../../backend/models';

export default getHandler().get(async (req, res) => {
  console.log(req.query);
  const username = typeof req.query.username === 'object' ? req.query.username[0] : req.query.username;
  const limit = typeof req.query.limit === 'object' ? req.query.limit[0] : req.query.limit;
  const offset = typeof req.query.offset === 'object' ? req.query.offset[0] : req.query.offset;

  const user = await User.findOne({
    where: {
      username,
    },
  });

  if (user === null) {
    return res.status(404).send({});
  }

  const posts = await Post.findAll({
    limit: limit ? Number(limit) : 20,
    offset: offset ? Number(offset) : 0,
    where: {
      userId: user.id,
    },
  });

  return res.status(200).json(posts);
});
