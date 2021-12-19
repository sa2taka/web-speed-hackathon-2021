import React from 'react';
import { Models } from '../../../types/model';

import { TimelineItem } from '../TimelineItem';

/**
 * @typedef {object} Props
 * @property {Array<Models.Post>} timeline
 */

type Props = {
  timeline: Models.Post[];
};

/** @type {React.VFC<Props>} */
const Timeline: React.VFC<Props> = ({ timeline }) => {
  return (
    <section>
      {timeline.map((post) => {
        return <TimelineItem key={post.id} post={post} />;
      })}
    </section>
  );
};

export { Timeline };
