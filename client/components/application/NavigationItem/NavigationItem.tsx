import classNames from 'classnames';
import React from 'react';
import { NavLink } from 'react-router-dom';

/**
 * @typedef {object} Props
 * @property {React.ReactNode} icon
 * @property {string} text
 * @property {string} [href]
 * @property {() => void} [onClick]
 */
type Props = {
  icon: React.ReactNode;
  text: string;
  href?: string;
  onClick?: () => void;
};

/** @type {React.VFC<Props>} */
const NavigationItem: React.VFC<Props> = ({ href, icon, onClick, text }) => {
  return (
    <li>
      {href !== undefined ? (
        <NavLink
          end
          className={({ isActive }) =>
            classNames(
              'flex flex-col items-center justify-center w-12 h-12 hover:bg-green-50 rounded-full sm:px-2 sm:w-24 sm:h-auto sm:rounded lg:flex-row lg:justify-start lg:px-4 lg:py-2 lg:w-auto lg:h-auto lg:rounded-full',
              {
                'text-green-800': isActive,
              },
            )
          }
          onClick={onClick}
          to={href}
        >
          <span className="lg:pr-2 text-xl lg:text-3xl">{icon}</span>
          <span className="hidden sm:inline sm:text-sm lg:text-xl lg:font-bold">{text}</span>
        </NavLink>
      ) : (
        <button
          className="flex flex-col lg:flex-row justify-center lg:justify-start items-center lg:py-2 sm:px-2 lg:px-4 w-12 sm:w-24 lg:w-auto h-12 sm:h-auto lg:h-auto hover:bg-green-50 rounded-full sm:rounded lg:rounded-full"
          onClick={onClick}
        >
          <span className="lg:pr-2 text-xl lg:text-3xl">{icon}</span>
          <span className="hidden sm:inline sm:text-sm lg:text-xl lg:font-bold">{text}</span>
        </button>
      )}
    </li>
  );
};

export { NavigationItem };
