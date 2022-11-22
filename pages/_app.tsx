import '../styles/globals.css';
import React from 'react';
import type { AppProps } from 'next/app';
import type { NextComponentType } from 'next';
import { Provider } from 'react-redux';
import store from '../redux/store';
import { SessionProvider, useSession } from 'next-auth/react';

type CustomAppProps = AppProps & {
  Component: NextComponentType & { auth?: boolean };
}

export default function App({ Component, pageProps: { session, ...pageProps } }: CustomAppProps) {
  return (
    <Provider store={store}>
      <SessionProvider session={session}>
        {
          Component.auth ? (
            <Auth>
              <Component {...pageProps} />
            </Auth>
          ) : (
            <Component {...pageProps} />
          )
        }
      </SessionProvider>
    </Provider>
  )
}

function Auth({ children }: any) {
  const { status } = useSession();

  if (status === 'loading') {
    return <div>Loading...</div>
  }

  if (status === 'unauthenticated') {
    return <div>Unauthenticated</div>
  }

  return children;
}
