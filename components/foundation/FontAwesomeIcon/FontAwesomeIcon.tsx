import React from 'react';

/**
 * @typedef {object} Props
 * @property {string} iconType
 * @property {'solid' | 'regular'} styleType
 */
type Props = {
  iconType: string;
  styleType: 'solid' | 'regular';
};

/** @type {React.VFC<Props>} */
const FontAwesomeIcon: React.VFC<Props> = ({ iconType, styleType }) => {
  return (
    <svg className="inline-block leading-none fill-current font-awesome">
      <use xlinkHref={`/sprites/font-awesome/${styleType}.svg#${iconType}`} />
    </svg>
  );
};

export { FontAwesomeIcon };
