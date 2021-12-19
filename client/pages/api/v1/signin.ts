import handler from '../../../backend/handler';
import { User } from '../../../backend/models';

export default handler.post(async (req, res) => {
  const user = await User.findOne({
    where: {
      username: req.body.username,
    },
  });

  if (user === null) {
    res.status(400);
  }
  if (!user?.validPassword(req.body.password)) {
    res.status(400);
  }

  // @ts-ignore
  req.session.userId = user.id;

  return res.status(200).json(user);
});
