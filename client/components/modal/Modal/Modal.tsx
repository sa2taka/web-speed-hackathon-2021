import React from 'react';
import { createPortal } from 'react-dom';
import 'wicg-inert';

/**
 * @typedef {object} Props
 * @property {React.ReactNode} children
 * @property {() => void} onRequestCloseModal
 */
type Props = {
  children: React.ReactNode;
  onRequestCloseModal: () => void;
};

/** @type {React.VFC<Props>} */
const Modal: React.VFC<Props> = ({ children, onRequestCloseModal }) => {
  // overflow: hidden を付与して、スクロールできないようにする
  React.useEffect(() => {
    document.body.style.setProperty('overflow', 'hidden');
    return () => {
      document.body.style.removeProperty('overflow');
    };
  }, []);

  // inert 属性を #app に付与して、アプリケーションが操作できないようにする
  React.useEffect(() => {
    (document.getElementById('app') as any).inert = true;
    return () => {
      (document.getElementById('app') as any).inert = false;
    };
  }, []);

  // Escape キーを入力すると、モーダルを閉じる
  React.useEffect(() => {
    const handler = (ev: KeyboardEvent) => {
      if (ev.key === 'Escape') {
        onRequestCloseModal();
      }
    };
    document.addEventListener('keyup', handler);
    return () => document.removeEventListener('keyup', handler);
  }, [onRequestCloseModal]);

  return createPortal(
    <div className="flex fixed top-0 right-0 bottom-0 left-0 z-10 justify-center items-center bg-black bg-opacity-50">
      <div className="absolute top-0 right-0 bottom-0 left-0" onClick={onRequestCloseModal}></div>
      <div className="flex flex-col justify-center items-center px-2 w-full h-4/6">
        <div className="relative py-8 px-2 w-full max-w-md max-h-full bg-white rounded">
          <div className="overflow-auto relative w-full max-h-full">{children}</div>
        </div>
      </div>
    </div>,
    document.getElementById('modal')!,
  );
};

export { Modal };
