import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { getProfileImagePath } from '../../../libs/utils/get_path';
import { formatToJp, formatToIso } from '../../../libs/utils/format_date';
import { ImageArea } from '../../post/ImageArea';
import { MovieArea } from '../../post/MovieArea';
import { SoundArea } from '../../post/SoundArea';
import { Models } from '../../../types/model';

/**
 * @param {Element} target
 * @param {Element} currentTarget
 * @returns {boolean}
 */
const isClickedAnchorOrButton = (target: Element | null, currentTarget: Element) => {
  while (target !== null) {
    const tagName = target.tagName.toLowerCase();
    if (['button', 'a'].includes(tagName)) {
      return true;
    }
    if (currentTarget === target) {
      return false;
    }
    target = target.parentNode as Element;
  }
  return false;
};

/**
 * @typedef {object} Props
 * @property {Models.Post} post
 */

type Props = {
  post: Models.Post;
};

/** @type {React.VFC<Props>} */
const TimelineItem: React.VFC<Props> = ({ post }) => {
  const navigate = useNavigate();

  /**
   * ボタンやリンク以外の箇所をクリックしたとき かつ 文字が選択されてないとき、投稿詳細ページに遷移する
   * @type {React.MouseEventHandler}
   */
  const handleClick = React.useCallback(
    (ev) => {
      const isSelectedText = document.getSelection()?.isCollapsed === false;
      if (!isClickedAnchorOrButton(ev.target, ev.currentTarget) && !isSelectedText) {
        navigate(`/posts/${post.id}`);
      }
    },
    [post, navigate],
  );

  return (
    <article className="px-1 sm:px-4 hover:bg-gray-50" onClick={handleClick}>
      <div className="flex px-2 sm:px-4 pt-2 pb-4 border-b border-gray-300">
        <div className="flex-grow-0 flex-shrink-0 pr-2 sm:pr-4">
          <Link
            className="block overflow-hidden w-12 sm:w-16 h-12 sm:h-16 bg-gray-300 rounded-full border border-gray-300 hover:opacity-75"
            to={`/users/${post.user.username}`}
          >
            <img alt={post.user.profileImage.alt} src={getProfileImagePath(post.user.profileImage.id)} />
          </Link>
        </div>
        <div className="flex-grow flex-shrink min-w-0">
          <p className="overflow-hidden text-sm overflow-ellipsis whitespace-nowrap">
            <Link className="pr-1 font-bold text-gray-800 hover:underline" to={`/users/${post.user.username}`}>
              {post.user.name}
            </Link>
            <Link className="pr-1 text-gray-500 hover:underline" to={`/users/${post.user.username}`}>
              @{post.user.username}
            </Link>
            <span className="pr-1 text-gray-500">-</span>
            <Link className="pr-1 text-gray-500 hover:underline" to={`/posts/${post.id}`}>
              <time dateTime={formatToIso(post.createdAt)}>{formatToJp(post.createdAt)}</time>
            </Link>
          </p>
          <p className="leading-relaxed text-gray-800">{post.text}</p>
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
        </div>
      </div>
    </article>
  );
};

export { TimelineItem };
