import handler, { withSession } from '../../../../../backend/handler';
import { Comment } from '../../../../../backend/models';

export default handler.get(async (req, res) => {
  const postId = typeof req.query.postId === 'string' ? req.query.postId : req.query.postId[0];
  const limit = typeof req.query.limit === 'string' ? req.query.postId : req.query.postId[0];
  const offset = typeof req.query.offset === 'string' ? req.query.postId : req.query.postId[0];

  const posts = await Comment.findAll({
    limit: Number(limit),
    offset: Number(offset),
    where: {
      postId: Number(postId),
    },
  });

  return res.status(200).json(posts);
});
