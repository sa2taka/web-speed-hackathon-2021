import classNames from 'classnames';
import Image from 'next/image';
import React from 'react';

import { getImagePath } from '../../../libs/utils/get_path';
import { Models } from '../../../types/model';
import { AspectRatioBox } from '../../foundation/AspectRatioBox';
import { CoveredImage } from '../../foundation/CoveredImage';

/**
 * @typedef {object} Props
 * @property {Array<Models.Image>} images
 */
type Props = {
  images: Models.Image[];
};

/** @type {React.VFC<Props>} */
const ImageArea: React.VFC<Props> = ({ images }) => {
  return (
    <AspectRatioBox aspectHeight={9} aspectWidth={16}>
      <div className="grid overflow-hidden grid-cols-2 grid-rows-2 gap-1 w-full h-full rounded-lg border border-gray-300">
        {images.map((image, idx) => {
          return (
            <div
              key={image.id}
              // CSS Grid で表示領域を指定する
              className={classNames('bg-gray-300', {
                'col-span-1': images.length !== 1,
                'col-span-2': images.length === 1,
                'row-span-1': images.length > 2 && (images.length !== 3 || idx !== 0),
                'row-span-2': images.length <= 2 || (images.length === 3 && idx === 0),
              })}
            >
              <Image alt={image.alt} src={getImagePath(image.id)} layout="responsive" />
            </div>
          );
        })}
      </div>
    </AspectRatioBox>
  );
};

export { ImageArea };
