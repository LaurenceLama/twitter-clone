import Head from "next/head";
import Sidebar from "@/components/Sidebar";
import Feed from "@/components/Feed";
import { getProviders, getSession, useSession } from "next-auth/react";
import Login from "@/components/Login";
import Modal from "@/components/Modal";
import { useRecoilState } from "recoil";
import { modalState } from "@/atoms/modalAtom";
import Widgets from "@/components/Widgets";

export default function Home({ trendingResults, followResults, providers }) {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useRecoilState(modalState);

  if (!session) return <Login providers={providers} />;

  return (
    <>
      <Head>
        <title>Twitter</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="bg-black min-h-screen flex max-w-[1500px] mx-auto">
        <Sidebar />
        <Feed />
        <Widgets
        // when fetching props, always have them called back in main file such as index.js
          trendingResults={trendingResults} 
          followResults={followResults}
        />

        {isOpen && <Modal />}
      </main>
    </>
  );
}

//getStaticProps I think is used for fetching props that you DO NOT WANT TO CHANGE
//but this thing below, is dynamic and always changes because yeah dynamic to every account and stuff
export async function getServerSideProps(context) {
  //for widgets
  const trendingResults = await fetch("https://jsonkeeper.com/b/NKEV").then(
    (res) => res.json()
  );
  const followResults = await fetch("https://jsonkeeper.com/b/WWMJ").then(
    (res) => res.json()
  );
  const providers = await getProviders();
  const session = await getSession(context); // discards the session from login page and mounts directly on main page WHEN LOGGED IN - I think this is what it is

  return {
    props: {
      trendingResults,
      followResults,
      providers,
      session,
    },
  };
}
