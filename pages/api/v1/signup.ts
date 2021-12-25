import getHandler from '../../../backend/handler';
import { User } from '../../../backend/models';

export default getHandler().post(async (req, res) => {
  const { id: userId } = await User.create(req.body);

  const user = await User.findByPk(userId);
  console.log(user);

  if (!user) {
    throw new Error('singup unknown error');
  }

  // @ts-ignore
  req.session.userId = user.id;

  return res.status(200).json(user);
});
