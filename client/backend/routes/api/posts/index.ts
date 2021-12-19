import handler from '../../../handler';
import { Post } from '../../../models';

export default handler.post(async (req, res) => {
  const posts = await Post.findAll({
    limit: Number(req.query.limit),
    offset: Number(req.query.offset),
  });

  return res.status(200).json(posts);
});
