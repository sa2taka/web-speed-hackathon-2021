import React from 'react';
import { Models } from '../../../types/model';

import { FontAwesomeIcon } from '../../foundation/FontAwesomeIcon';
import { NavigationItem } from '../NavigationItem';

/**
 * @typedef {object} Props
 * @property {Models.User | null} activeUser
 * @property {() => void} onRequestOpenAuthModal
 * @property {() => void} onRequestOpenPostModal
 */
type Props = {
  activeUser: Models.User | null;
  onRequestOpenAuthModal: () => void;
  onRequestOpenPostModal: () => void;
};

/** @type {React.VFC<Props>} */
const Navigation: React.VFC<Props> = ({ activeUser, onRequestOpenAuthModal, onRequestOpenPostModal }) => {
  return (
    <nav className="fixed lg:relative right-0 bottom-0 left-0 z-10 lg:w-48 h-12 lg:h-full bg-white border-t lg:border-t-0 lg:border-r border-gray-300">
      <ul className="grid relative lg:fixed grid-flow-col lg:grid-flow-row lg:auto-rows-min lg:gap-2 justify-evenly lg:justify-start items-center lg:p-2 lg:w-48 lg:h-full">
        <NavigationItem href="/" icon={<FontAwesomeIcon iconType="home" styleType="solid" />} text="ホーム" />
        {activeUser !== null ? (
          <NavigationItem
            icon={<FontAwesomeIcon iconType="edit" styleType="solid" />}
            onClick={onRequestOpenPostModal}
            text="投稿する"
          />
        ) : null}
        {activeUser !== null ? (
          <NavigationItem
            href={`/users/${activeUser.username}`}
            icon={<FontAwesomeIcon iconType="user" styleType="solid" />}
            text="マイページ"
          />
        ) : null}
        {activeUser === null ? (
          <NavigationItem
            icon={<FontAwesomeIcon iconType="sign-in-alt" styleType="solid" />}
            onClick={onRequestOpenAuthModal}
            text="サインイン"
          />
        ) : null}
        <NavigationItem
          href="/terms"
          icon={<FontAwesomeIcon iconType="balance-scale" styleType="solid" />}
          text="利用規約"
        />
      </ul>
    </nav>
  );
};

export { Navigation };
