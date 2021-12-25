import React from 'react';
import { useParams } from 'react-router-dom';

import { InfiniteScroll } from '../../foundation/InfiniteScroll';
import { PostPage } from '../../post/PostPage';
import { useFetch } from '../../hooks/use_fetch';
import { useInfiniteFetch } from '../../hooks/use_infinite_fetch';
import { fetchJSON } from '../../../libs/utils/fetchers';
import { NotFoundContainer } from '../NotFoundContainer';
import { Models } from '../../../types/model';
import Head from 'next/head';
import { useRouter } from 'next/router';

type Props = {};

/** @type {React.VFC} */
const PostContainer: React.VFC<Props> = () => {
  const router = useRouter();
  const { postId } = router.query;

  const { data: post, isLoading: isLoadingPost } = useFetch<Models.Post>(`/api/v1/posts/${postId}`, fetchJSON);

  const { data: comments, fetchMore } = useInfiniteFetch<Models.Comment>(`/api/v1/posts/${postId}/comments`, fetchJSON);

  if (isLoadingPost) {
    return (
      <Head>
        <title>読込中 - CAwitter</title>
      </Head>
    );
  }

  if (post === null) {
    return <NotFoundContainer />;
  }

  return (
    <InfiniteScroll fetchMore={fetchMore} items={comments ?? []}>
      <Head>
        <title>{post.user.name} さんのつぶやき - CAwitter</title>
      </Head>
      <PostPage comments={comments ?? []} post={post} />
    </InfiniteScroll>
  );
};

export { PostContainer };
