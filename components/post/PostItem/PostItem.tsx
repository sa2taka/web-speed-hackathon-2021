import React from 'react';
import { Link } from 'react-router-dom';

import { getProfileImagePath } from '../../../libs/utils/get_path';
import { formatToJp, formatToIso } from '../../../libs/utils/format_date';
import { ImageArea } from '../../post/ImageArea';
import { MovieArea } from '../../post/MovieArea';
import { SoundArea } from '../../post/SoundArea';
import { Models } from '../../../types/model';

/**
 * @typedef {object} Props
 * @property {Models.Post} post
 */
type Props = {
  post: Models.Post;
};

/** @type {React.VFC<Props>} */
const PostItem: React.VFC<Props> = ({ post }) => {
  return (
    <article className="px-1 sm:px-4">
      <div className="px-4 pt-4 pb-4 border-b border-gray-300">
        <div className="flex justify-center items-center">
          <div className="flex-grow-0 flex-shrink-0 pr-2">
            <Link
              className="block overflow-hidden w-14 sm:w-16 h-14 sm:h-16 bg-gray-300 rounded-full border border-gray-300 hover:opacity-95"
              to={`/users/${post.user.username}`}
            >
              <img alt={post.user.profileImage.alt} src={getProfileImagePath(post.user.profileImage.id)} />
            </Link>
          </div>
          <div className="overflow-hidden flex-grow flex-shrink min-w-0 overflow-ellipsis whitespace-nowrap">
            <p>
              <Link className="font-bold text-gray-800 hover:underline" to={`/users/${post.user.username}`}>
                {post.user.name}
              </Link>
            </p>
            <p>
              <Link className="text-gray-500 hover:underline" to={`/users/${post.user.username}`}>
                @{post.user.username}
              </Link>
            </p>
          </div>
        </div>
        <div className="pt-2 sm:pt-4">
          <p className="text-xl leading-relaxed text-gray-800">{post.text}</p>
          {post.images?.length > 0 ? (
            <div className="relative mt-2 w-full">
              <ImageArea images={post.images} />
            </div>
          ) : null}
          {post.movie ? (
            <div className="relative mt-2 w-full">
              <MovieArea movie={post.movie} />
            </div>
          ) : null}
          {post.sound ? (
            <div className="relative mt-2 w-full">
              <SoundArea sound={post.sound} />
            </div>
          ) : null}
          <p className="mt-2 sm:mt-4 text-sm">
            <Link className="text-gray-500 hover:underline" to={`/posts/${post.id}`}>
              <time dateTime={formatToIso(post.createdAt)}>{formatToJp(post.createdAt)}</time>
            </Link>
          </p>
        </div>
      </div>
    </article>
  );
};

export { PostItem };
