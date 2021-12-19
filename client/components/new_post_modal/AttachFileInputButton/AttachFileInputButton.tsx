import classNames from 'classnames';
import React, { ChangeEventHandler } from 'react';

/**
 * @typedef {object} Props
 * @property {string} accept
 * @property {boolean} active
 * @property {React.ReactNode} icon
 * @property {React.ChangeEventHandler<HTMLInputElement>} onChange
 */

type Props = {
  accept: string;
  active: boolean;
  icon: React.ReactNode;
  onChange: ChangeEventHandler<HTMLInputElement>;
};

/** @type {React.VFC<Props>} */
const AttachFileInputButton: React.VFC<Props> = ({ accept, active, icon, onChange }) => {
  return (
    <label className="flex relative justify-center items-center cursor-pointer focus-within:outline-black">
      <span
        className={classNames('flex items-center justify-center w-12 h-12 rounded-full', {
          'bg-gray-100': !active,
          'bg-green-100': active,
        })}
      >
        {icon}
      </span>
      <input multiple accept={accept} className="sr-only" onChange={onChange} type="file" />
    </label>
  );
};

export { AttachFileInputButton };
