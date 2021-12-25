import React from 'react';
import { Link } from 'react-router-dom';

import { getProfileImagePath } from '../../../libs/utils/get_path';
import { formatToJp, formatToIso } from '../../../libs/utils/format_date';
import { Models } from '../../../types/model';

/**
 * @typedef {object} Props
 * @property {Models.Comment} comment
 */
type Props = {
  comment: Models.Comment;
};

/** @type {React.VFC<Props>} */
const CommentItem: React.VFC<Props> = ({ comment }) => {
  return (
    <article className="px-1 sm:px-4 hover:bg-gray-50">
      <div className="flex px-2 sm:px-4 pt-2 pb-4 border-b border-gray-300">
        <div className="flex-grow-0 flex-shrink-0 pr-2 sm:pr-4">
          <Link
            className="block overflow-hidden w-8 sm:w-12 h-8 sm:h-12 bg-gray-300 rounded-full border border-gray-300 hover:opacity-75"
            to={`/users/${comment.user.username}`}
          >
            <img alt={comment.user.profileImage.alt} src={getProfileImagePath(comment.user.profileImage.id)} />
          </Link>
        </div>
        <div className="flex-grow flex-shrink min-w-0">
          <p className="overflow-hidden text-xs overflow-ellipsis whitespace-nowrap">
            <Link className="pr-1 font-bold text-gray-800 hover:underline" to={`/users/${comment.user.username}`}>
              {comment.user.name}
            </Link>
            <Link className="pr-1 text-gray-500 hover:underline" to={`/users/${comment.user.username}`}>
              @{comment.user.username}
            </Link>
          </p>
          <p className="text-sm leading-relaxed text-gray-800">{comment.text}</p>
          <p className="text-xs text-gray-500">
            <time dateTime={formatToIso(comment.createdAt)}>{formatToJp(comment.createdAt)}</time>
          </p>
        </div>
      </div>
    </article>
  );
};

export { CommentItem };
