import React from 'react';
import { Models } from '../../../types/model';

import { CommentItem } from '../CommentItem';

/**
 * @typedef {object} Props
 * @property {Array<Models.Comment>} comments
 */

type Props = {
  comments: Models.Comment[];
};

/** @type {React.VFC<Props>} */
const CommentList: React.VFC<Props> = ({ comments }) => {
  return (
    <div>
      {comments.map((comment) => {
        return <CommentItem key={comment.id} comment={comment} />;
      })}
    </div>
  );
};

export { CommentList };
