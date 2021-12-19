import sequelizePkg, { Model, ModelCtor } from 'sequelize';
const { DataTypes } = sequelizePkg;

import { sequelize } from '../sequelize';

type ImageAttributes = {
  id: string;
  alt: string;
};

type ImageModel = Model<ImageAttributes>;

const Image: ModelCtor<ImageModel> = sequelize.define('Image', {
  alt: {
    allowNull: false,
    defaultValue: '',
    type: DataTypes.STRING,
  },
  id: {
    allowNull: false,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    type: DataTypes.UUID,
  },
});

export type { ImageAttributes };
export { Image };
