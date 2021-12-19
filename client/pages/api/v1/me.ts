import handler, { withSession } from '../../../backend/handler';
import { User } from '../../../backend/models';

export default handler.get(async (req, res) => {
  await withSession(req, res);

  if (req.session.userId === undefined) {
    throw res.status(401).send({});
  }
  const user = await User.findByPk(req.session.userId);
  if (user === null) {
    throw res.status(404).send({});
  }

  return res.status(200).json(user);
});
