import Head from 'next/head';
import React from 'react';

import { NotFoundPage } from '../../application/NotFoundPage';

type Props = {};

/** @type {React.VFC} */
const NotFoundContainer: React.VFC<Props> = () => {
  return (
    <>
      <Head>
        <title>ページが見つかりません - CAwitter</title>
      </Head>
      <NotFoundPage />
    </>
  );
};

export { NotFoundContainer };
