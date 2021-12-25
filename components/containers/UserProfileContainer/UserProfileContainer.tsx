import React from 'react';
import { useParams } from 'react-router-dom';

import { InfiniteScroll } from '../../foundation/InfiniteScroll';
import { UserProfilePage } from '../../user_profile/UserProfilePage';
import { useFetch } from '../../hooks/use_fetch';
import { useInfiniteFetch } from '../../hooks/use_infinite_fetch';
import { fetchJSON } from '../../../libs/utils/fetchers';
import { NotFoundContainer } from '../NotFoundContainer';
import { Models } from '../../../types/model';
import Head from 'next/head';
import { useRouter } from 'next/router';

/** @type {React.VFC} */
const UserProfileContainer = () => {
  const router = useRouter();
  const { username } = router.query;

  const { data: user, isLoading: isLoadingUser } = useFetch<Models.User>(`/api/v1/users/${username}`, fetchJSON);
  const { data: posts, fetchMore } = useInfiniteFetch<Models.Post>(`/api/v1/users/${username}/posts`, fetchJSON);

  if (isLoadingUser) {
    return (
      <Head>
        <title>読込中 - CAwitter</title>
      </Head>
    );
  }

  if (user === null) {
    return <NotFoundContainer />;
  }

  return (
    <InfiniteScroll fetchMore={fetchMore} items={posts ?? []}>
      <Head>
        <title>{user.name} さんのタイムライン - CAwitter</title>
      </Head>
      <UserProfilePage timeline={posts ?? []} user={user} />
    </InfiniteScroll>
  );
};

export { UserProfileContainer };
