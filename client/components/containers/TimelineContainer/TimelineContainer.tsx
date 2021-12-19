import React from 'react';
import { Helmet } from 'react-helmet';

import { InfiniteScroll } from '../../foundation/InfiniteScroll';
import { TimelinePage } from '../../timeline/TimelinePage';
import { useInfiniteFetch } from '../../hooks/use_infinite_fetch';
import { fetchJSON } from '../../../libs/utils/fetchers';
import { Models } from '../../../types/model';
import Head from 'next/head';

type Props = {};

/** @type {React.VFC} */
const TimelineContainer: React.VFC<Props> = () => {
  const { data: posts, fetchMore } = useInfiniteFetch<Models.Post>('/api/v1/posts', fetchJSON);

  return (
    <InfiniteScroll fetchMore={fetchMore} items={posts ?? []}>
      <Head>
        <title>タイムライン - CAwitter</title>
      </Head>
      <TimelinePage timeline={posts ?? []} />
    </InfiniteScroll>
  );
};

export { TimelineContainer };
