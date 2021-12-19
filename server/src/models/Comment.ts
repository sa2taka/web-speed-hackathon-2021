import { DataTypes, Model, ModelCtor } from 'sequelize';
import { ulid } from 'ulid';

import { sequelize } from '../sequelize';

type CommentAttributes = {
  id: string;
  userId: string;
  postId: string;
  text: string;
};

type CommentModel = Model<CommentAttributes>;

const Comment: ModelCtor<CommentModel> = sequelize.define(
  'Comment',
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
        exclude: ['userId', 'postId'],
      },
      include: [
        {
          association: 'user',
          attributes: { exclude: ['profileImageId'] },
          include: [{ association: 'profileImage' }],
        },
      ],
      order: [['id', 'ASC']],
    },
  },
);

export { CommentAttributes, Comment };
