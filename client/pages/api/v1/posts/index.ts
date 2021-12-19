import handler from '../../../../backend/handler';
import { Post, User } from '../../../../backend/models';

export default handler.get(async (req, res) => {
  const posts = await Post.findAll({
    limit: Number(req.query.limit ?? 40),
    offset: Number(req.query.offset ?? 0),
  });

  return res.status(200).json(posts);
});
