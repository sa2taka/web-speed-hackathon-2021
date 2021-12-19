import React from 'react';
import { Helmet } from 'react-helmet';

import { NotFoundPage } from '../../application/NotFoundPage';

type Props = {};

/** @type {React.VFC} */
const NotFoundContainer: React.VFC<Props> = () => {
  return (
    <>
      <Helmet>
        <title>ページが見つかりません - CAwitter</title>
      </Helmet>
      <NotFoundPage />
    </>
  );
};

export { NotFoundContainer };
