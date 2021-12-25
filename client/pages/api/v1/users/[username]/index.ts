import handler, { withSession } from '../../../../../backend/handler';
import { Post, User } from '../../../../../backend/models';

export default handler.get(async (req, res) => {
  const username = req.query.username === 'string' ? req.query.username : req.query.username[0];
  const user = await User.findOne({
    where: {
      username,
    },
  });

  if (user === null) {
    throw res.status(404).send({});
  }

  return res.status(200).json(user);
});
