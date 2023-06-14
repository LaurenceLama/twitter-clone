import Image from "next/image";
import Head from "next/head";
import Sidebar from "@/component/Sidebar";


export default function Home() {
  return (
    <>
      <Head>
        <title>Twitter</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="bg-black min-h-screen flex max-w-[1500px] mx-auto">
        <Sidebar />
        {/* feed */}
        {/* widgets */}

        {/* Modal */}
      </main>
    </>
  );
}
