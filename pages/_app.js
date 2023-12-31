import "../styles/globals.css";
import { SessionProvider } from "next-auth/react";
import { RecoilRoot } from "recoil";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    // `session` comes from `getServerSideProps` or `getInitialProps`.
    // Avoids flickering/session loading on first load.
    <SessionProvider session={session}>
      <RecoilRoot> {/* this allows for using recoil hooks, basta recoil */}
        <Component {...pageProps} /> {/*entire website/app? I think*/}
      </RecoilRoot>
    </SessionProvider>
  );
}
