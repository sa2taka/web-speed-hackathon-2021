import Head from 'next/head';
import React from 'react';

import { TermPage } from '../../term/TermPage';

type Props = {};

/** @type {React.VFC} */
const TermContainer: React.VFC<Props> = () => {
  return (
    <>
      <Head>
        <title>利用規約 - CAwitter</title>
      </Head>
      <TermPage />
    </>
  );
};

export { TermContainer };
