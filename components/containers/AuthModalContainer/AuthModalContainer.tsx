import React from 'react';

import { AuthModalPage } from '../../auth_modal/AuthModalPage';
import { Modal } from '../../modal/Modal';
import { sendJSON, Either } from '../../../libs/utils/fetchers';
import { Models } from '../../../types/model';

/**
 * @typedef {object} Props
 * @property {() => void} onRequestCloseModal
 * @property {(user: Models.User) => void} onUpdateActiveUser
 */
type Props = {
  onRequestCloseModal: () => void;
  onUpdateActiveUser: (user: Models.User) => void;
};

/** @type {React.VFC<Props>} */
const AuthModalContainer: React.VFC<Props> = ({ onRequestCloseModal, onUpdateActiveUser }) => {
  const [hasError, setHasError] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  const handleResetError = React.useCallback(() => {
    setHasError(false);
  }, []);

  const setResult = React.useCallback(
    ({ data: user, error }: Either<Models.User>) => {
      if (user) {
        onUpdateActiveUser(user);
      } else if (error) {
        setHasError(true);
      }
      setIsLoading(false);
    },
    [onUpdateActiveUser, setHasError, setIsLoading],
  );

  const handleSubmit = React.useCallback(
    async ({ type, ...params }) => {
      setIsLoading(true);
      if (type === 'signin') {
        const result = await sendJSON<Models.User>('/api/v1/signin', params);
        setResult(result);
      } else if (type === 'signup') {
        const result = await sendJSON<Models.User>('/api/v1/signup', params);
        setResult(result);
      }
    },
    [setResult],
  );

  return (
    <Modal onRequestCloseModal={onRequestCloseModal}>
      <AuthModalPage
        hasError={hasError}
        isLoading={isLoading}
        onRequestCloseModal={onRequestCloseModal}
        onResetError={handleResetError}
        onSubmit={handleSubmit}
      />
    </Modal>
  );
};

export { AuthModalContainer };
