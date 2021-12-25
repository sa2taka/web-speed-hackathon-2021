import handler, { withSession } from '../../../backend/handler';
import { User } from '../../../backend/models';
import { insertSeeds } from '../../../backend/seeds';
import { sequelize } from '../../../backend/sequelize';

export default handler.post(async (req, res) => {
  await sequelize.sync({
    force: true,
    logging: false,
  });
  await insertSeeds();

  return res.status(200).json({});
});
