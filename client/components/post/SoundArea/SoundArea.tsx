import React from 'react';
import { Models } from '../../../types/model';

import { SoundPlayer } from '../../foundation/SoundPlayer';

/**
 * @typedef {object} Props
 * @property {Models.Sound} sound
 */
type Props = {
  sound: Models.Sound;
};

/** @type {React.VFC<Props>} */
const SoundArea: React.VFC<Props> = ({ sound }) => {
  return (
    <div className="overflow-hidden relative w-full h-full rounded-lg border border-gray-300">
      <SoundPlayer sound={sound} />
    </div>
  );
};

export { SoundArea };
