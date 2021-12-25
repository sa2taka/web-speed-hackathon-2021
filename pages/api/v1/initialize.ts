import getHandler, { withSession } from '../../../backend/handler';
import { User } from '../../../backend/models';
import { insertSeeds } from '../../../backend/seeds';
import { sequelize } from '../../../backend/sequelize';

export default getHandler().post(async (req, res) => {
  await sequelize.sync({
    force: true,
    logging: false,
  });
  await insertSeeds();

  return res.status(200).json({});
});
