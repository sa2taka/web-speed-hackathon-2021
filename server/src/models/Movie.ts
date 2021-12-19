import { DataTypes, Sequelize, Model, ModelCtor } from 'sequelize';

import { sequelize } from '../sequelize';

type MovieAttributes = {
  id: string;
};

type MovieModel = Model<MovieAttributes>;

const Movie: ModelCtor<MovieModel> = sequelize.define('Movie', {
  id: {
    allowNull: false,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    type: DataTypes.UUID,
  },
});

export { MovieAttributes, Movie };
