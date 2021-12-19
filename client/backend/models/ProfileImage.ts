import sequelizePkg, { Model, ModelCtor } from 'sequelize';
const { DataTypes } = sequelizePkg;

import { sequelize } from '../sequelize';

type ProfileImageAttributes = {
  id: string;
  alt: string;
};

type ProfileImageModel = Model<ProfileImageAttributes>;

const ProfileImage: ModelCtor<ProfileImageModel> = sequelize.define('ProfileImage', {
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

export type { ProfileImageAttributes };
export { ProfileImage };
