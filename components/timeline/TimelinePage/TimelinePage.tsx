import React from 'react';
import { Models } from '../../../types/model';

import { Timeline } from '../Timeline';

/**
 * @typedef {object} Props
 * @property {Array<Models.Post>} timeline
 */
type Props = {
  timeline: Models.Post[];
};

/** @type {React.VFC<Props>} */
const TimelinePage: React.VFC<Props> = ({ timeline }) => {
  return <Timeline timeline={timeline} />;
};

export { TimelinePage };
