import handler, { withSession } from '../../../../backend/handler';
import { Post, User } from '../../../../backend/models';

export default handler
  .get(async (req, res) => {
    const posts = await Post.findAll({
      limit: Number(req.query.limit ?? 40),
      offset: Number(req.query.offset ?? 0),
    });

    return res.status(200).json(posts);
  })
  .post(async (req, res) => {
    await withSession(req, res);

    if (req.session.userId === undefined) {
      throw res.status(401).send({});
    }

    const post = await Post.create(
      {
        ...req.body,
        userId: req.session.userId,
      },
      {
        include: [
          {
            association: 'images',
            through: { attributes: [] },
          },
          { association: 'movie' },
          { association: 'sound' },
        ],
      },
    );

    return res.status(200).send(post);
  });
