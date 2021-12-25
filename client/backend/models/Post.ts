import { DataTypes, Model, ModelCtor } from 'sequelize';

import { ulid } from 'ulid';

import { sequelize } from '../sequelize';

type PostAttributes = {
  id: string;
  userId: string;
  text: string;
};

type PostModel = Model<PostAttributes>;

const Post: ModelCtor<PostModel> = sequelize.define(
  'Post',
  {
    id: {
      allowNull: false,
      defaultValue: () => ulid(),
      primaryKey: true,
      type: DataTypes.STRING,
    },
    text: {
      allowNull: false,
      type: DataTypes.STRING,
    },
  },
  {
    defaultScope: {
      attributes: {
        exclude: ['userId', 'movieId', 'soundId'],
      },
      include: [
        {
          association: 'user',
          attributes: { exclude: ['profileImageId'] },
          include: [{ association: 'profileImage' }],
        },
        {
          association: 'images',
          through: { attributes: [] },
        },
        { association: 'movie' },
        { association: 'sound' },
      ],
      order: [
        ['id', 'DESC'],
        ['images', 'createdAt', 'ASC'],
      ],
    },
  },
);

export type { PostAttributes };
export { Post };
