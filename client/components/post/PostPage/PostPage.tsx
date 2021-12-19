import React from 'react';
import { Models } from '../../../types/model';

import { CommentList } from '../CommentList';
import { PostItem } from '../PostItem';

/**
 * @typedef {object} Props
 * @property {Array<Models.Comment>} comments
 * @property {Models.Post} post
 */
type Props = {
  comments: Models.Comment[];
  post: Models.Post;
};

/** @type {React.VFC<Props>} */
const PostPage: React.VFC<Props> = ({ comments, post }) => {
  return (
    <>
      <PostItem post={post} />
      <CommentList comments={comments} />
    </>
  );
};

export { PostPage };
