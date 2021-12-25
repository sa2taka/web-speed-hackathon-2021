import getHandler from '../../../backend/handler';
import { User } from '../../../backend/models';

export default getHandler().post(async (req, res) => {
  // @ts-ignore
  req.session.userId = undefined;
  return res.status(200).json({});
});
