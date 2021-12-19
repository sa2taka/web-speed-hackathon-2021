import FastAverageColor from 'fast-average-color';
import React from 'react';

import { getProfileImagePath } from '../../../libs/utils/get_path';
import { formatToJp, formatToIso } from '../../../libs/utils/format_date';
import { FontAwesomeIcon } from '../../foundation/FontAwesomeIcon';
import { Models } from '../../../types/model';

/**
 * @typedef {object} Props
 * @property {Models.User} user
 */
type Props = {
  user: Models.User;
};

/** @type {React.VFC<Props>} */
const UserProfileHeader: React.VFC<Props> = ({ user }) => {
  const [averageColor, setAverageColor] = React.useState<string | null>(null);

  // 画像の平均色を取得します
  /** @type {React.ReactEventHandler<HTMLImageElement>} */
  const handleLoadImage = React.useCallback((ev) => {
    const fac = new FastAverageColor();
    const { rgb } = fac.getColor(ev.currentTarget, { mode: 'precision' });
    setAverageColor(rgb);
    fac.destroy();
  }, []);

  return (
    <header className="relative">
      <div className="h-32 bg-gray-300" style={{ backgroundColor: averageColor ?? undefined }}></div>
      <div className="overflow-hidden absolute left-2/4 m-0 w-28 sm:w-32 h-28 sm:h-32 bg-gray-300 rounded-full border border-gray-300 transform -translate-x-1/2 -translate-y-1/2">
        <img alt="" crossOrigin="anonymous" onLoad={handleLoadImage} src={getProfileImagePath(user.profileImage.id)} />
      </div>
      <div className="px-4 pt-20">
        <h1 className="text-2xl font-bold">{user.name}</h1>
        <p className="text-gray-600">@{user.username}</p>
        <p className="pt-2">{user.description}</p>
        <p className="pt-2 text-sm text-gray-600">
          <span className="pr-1">
            <FontAwesomeIcon iconType="calendar-alt" styleType="regular" />
          </span>
          <span>
            <time dateTime={formatToIso(user.createdAt)}>{formatToJp(user.createdAt)}</time>
            からサービスを利用しています
          </span>
        </p>
      </div>
    </header>
  );
};

export { UserProfileHeader };
