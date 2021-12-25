import React from 'react';

import { getMoviePath } from '../../../libs/utils/get_path';
import { Models } from '../../../types/model';
import { PausableMovie } from '../../foundation/PausableMovie';

/**
 * @typedef {object} Props
 * @property {Models.Movie} movie
 */
type Props = {
  movie: Models.Movie;
};

/** @type {React.VFC<Props>} */
const MovieArea: React.VFC<Props> = ({ movie }) => {
  return (
    <div className="overflow-hidden relative w-full h-full bg-gray-300 rounded-lg border border-gray-300">
      <PausableMovie src={getMoviePath(movie.id)} />
    </div>
  );
};

export { MovieArea };
