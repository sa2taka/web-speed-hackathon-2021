import React from 'react';
import { Helmet } from 'react-helmet';

import { TermPage } from '../../term/TermPage';

type Props = {};

/** @type {React.VFC} */
const TermContainer: React.VFC<Props> = () => {
  return (
    <>
      <Helmet>
        <title>利用規約 - CAwitter</title>
      </Helmet>
      <TermPage />
    </>
  );
};

export { TermContainer };
