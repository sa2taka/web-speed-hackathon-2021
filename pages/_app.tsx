import React from 'react';
import '../styles/globals.css';
import type { AppProps } from 'next/app';
import 'tailwindcss/tailwind.css';
import { Models } from '../types/model';
import { useFetch } from '../components/hooks/use_fetch';
import { fetchJSON } from '../libs/utils/fetchers';
import Head from 'next/head';
import { AppPage } from '../components/application/AppPage';
import { AuthModalContainer } from '../components/containers/AuthModalContainer';
import { NewPostModalContainer } from '../components/containers/NewPostModalContainer';

function MyApp({ Component, pageProps }: AppProps) {
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pageProps]);

  const [activeUser, setActiveUser] = React.useState<Models.User | null>(null);
  const { data, isLoading } = useFetch<Models.User>('/api/v1/me', fetchJSON);
  React.useEffect(() => {
    setActiveUser(data);
  }, [data]);

  const [modalType, setModalType] = React.useState('none');
  const handleRequestOpenAuthModal = React.useCallback(() => setModalType('auth'), []);
  const handleRequestOpenPostModal = React.useCallback(() => setModalType('post'), []);
  const handleRequestCloseModal = React.useCallback(() => setModalType('none'), []);

  if (isLoading) {
    return (
      <Head>
        <title>読込中 - CAwitter</title>
      </Head>
    );
  }

  return (
    <>
      <AppPage
        activeUser={activeUser}
        onRequestOpenAuthModal={handleRequestOpenAuthModal}
        onRequestOpenPostModal={handleRequestOpenPostModal}
      >
        <Component />
      </AppPage>

      {modalType === 'auth' ? (
        <AuthModalContainer onRequestCloseModal={handleRequestCloseModal} onUpdateActiveUser={setActiveUser} />
      ) : null}
      {modalType === 'post' ? <NewPostModalContainer onRequestCloseModal={handleRequestCloseModal} /> : null}
    </>
  );
}

export default MyApp;
