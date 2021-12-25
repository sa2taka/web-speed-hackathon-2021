import getHandler, { withSession } from '../../../backend/handler';
import { User } from '../../../backend/models';

export default getHandler()
  .get(async (req, res) => {
    await withSession(req, res);

    if (req.session.userId === undefined) {
      return res.status(401).send({});
    }
    const user = await User.findByPk(req.session.userId);
    if (user === null) {
      return res.status(404).send({});
    }

    return res.status(200).json(user);
  })
  .put(async (req, res) => {
    await withSession(req, res);

    if (req.session.userId === undefined) {
      return res.status(401).send({});
    }
    const user = await User.findByPk(req.session.userId);

    if (user === null) {
      return res.status(404).send({});
    }

    Object.assign(user, req.body);
    await user.save();

    return res.status(200).json(user);
  });
