import bcrypt from 'bcrypt';
import sequelizePkg, { Model, ModelCtor } from 'sequelize';
const { DataTypes } = sequelizePkg;

import { sequelize } from '../sequelize';

import { Post } from './Post';
import { ProfileImage } from './ProfileImage';

type UserAttributes = {
  id: string;
  username: string;
  name: string;
  description: string;
  password: string;
  posts?: typeof Post[];
  profileImage?: typeof ProfileImage;
};

type UserModelMethods = {
  generateHash: (password: string) => string;
  validPassword: (password: string) => boolean;
};

type UserModel = Model<UserAttributes> & UserModelMethods & UserAttributes;

const User: ModelCtor<UserModel> = sequelize.define(
  'User',
  {
    description: {
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
    name: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    password: {
      allowNull: false,
      get() {
        return undefined;
      },
      set(value: string) {
        this.setDataValue('password', this.generateHash(value));
      },
      type: DataTypes.STRING,
    },
    username: {
      allowNull: false,
      type: DataTypes.STRING,
      unique: true,
      validate: {
        is: /^[a-z0-9_-]+$/i,
      },
    },
  },
  {
    defaultScope: {
      attributes: { exclude: ['profileImageId'] },
      include: { association: 'profileImage' },
    },
  },
);

Object.assign<UserAttributes, UserModelMethods>(User.prototype, {
  generateHash(password: string) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
  },
  validPassword(password: string): boolean {
    return bcrypt.compareSync(password, (this as UserModel).getDataValue('password'));
  },
});

export type { UserAttributes };
export { User };
