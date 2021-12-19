import { DataTypes, Model, Sequelize, ModelCtor } from 'sequelize';

import { sequelize } from '../sequelize';

type SoundAttributes = {
  id: string;
  title: string;
  artist: string;
};

type SoundModel = Model<SoundAttributes>;

const Sound: ModelCtor<SoundModel> = sequelize.define('Sound', {
  artist: {
    allowNull: false,
    defaultValue: 'Unknown',
    type: DataTypes.STRING,
  },
  id: {
    allowNull: false,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    type: DataTypes.UUID,
  },
  title: {
    allowNull: false,
    defaultValue: 'Unknown',
    type: DataTypes.STRING,
  },
});

export { SoundAttributes, Sound };
