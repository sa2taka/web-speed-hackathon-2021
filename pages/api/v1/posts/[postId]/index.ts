import getHandler, { withSession } from '../../../../../backend/handler';
import { Post } from '../../../../../backend/models';

export default getHandler().get(async (req, res) => {
  const post = await Post.findByPk(typeof req.query.postId === 'string' ? req.query.postId : req.query.postId[0]);

  if (post === null) {
    throw res.status(404).send({});
  }

  return res.status(200).json(post);
});
