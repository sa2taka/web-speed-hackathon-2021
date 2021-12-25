import classNames from 'classnames';
import sizeOf from 'image-size';
import React from 'react';

import { useFetch } from '../../hooks/use_fetch';
import { fetchBinary } from '../../../libs/utils/fetchers';
import Image from 'next/image';

/**
 * @typedef {object} Props
 * @property {string} alt
 * @property {string} src
 */

type Props = {
  alt: string;
  src: string;
};

/**
 * アスペクト比を維持したまま、要素のコンテンツボックス全体を埋めるように画像を拡大縮小します
 * @type {React.VFC<Props>}
 */
const CoveredImage: React.VFC<Props> = ({ alt, src }) => {
  const { data, isLoading } = useFetch(src, fetchBinary);

  const imageSize = React.useMemo(() => {
    return data !== null ? sizeOf(Buffer.from(data)) : null;
  }, [data]);

  const blobUrl = React.useMemo(() => {
    return data !== null ? URL.createObjectURL(new Blob([data])) : null;
  }, [data]);

  const [containerSize, setContainerSize] = React.useState({ height: 0, width: 0 });
  /** @type {React.RefCallback<HTMLDivElement>} */
  const callbackRef = React.useCallback((el) => {
    setContainerSize({
      height: el?.clientHeight ?? 0,
      width: el?.clientWidth ?? 0,
    });
  }, []);

  if (isLoading || data === null || blobUrl === null) {
    return null;
  }

  const containerRatio = containerSize.height / containerSize.width;
  const imageRatio = imageSize ? (imageSize.height ?? 0) / (imageSize.width ?? 1) : 0;

  return (
    <div ref={callbackRef} className="overflow-hidden relative w-full h-full">
      <Image
        alt={alt}
        className={classNames('absolute left-1/2 top-1/2 max-w-none transform -translate-x-1/2 -translate-y-1/2', {
          'w-auto h-full': containerRatio > imageRatio,
          'w-full h-auto': containerRatio <= imageRatio,
        })}
        src={blobUrl}
        width={imageSize?.width ?? 0}
        height={imageSize?.height ?? 0}
      />
    </div>
  );
};

export { CoveredImage };
