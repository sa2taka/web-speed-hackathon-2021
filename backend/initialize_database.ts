import { insertSeeds } from './seeds';
import { sequelize } from './sequelize';

export const initializeDatabase = async (): Promise<void> => {
  // データベースの初期化をします
  await sequelize.sync({
    force: true,
    logging: false,
  });
  await insertSeeds();
};
