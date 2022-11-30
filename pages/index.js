import Head from "next/head";
import Image from "next/image";
import Script from "next/script";
import { useEffect, useState } from "react";
import styles from "../styles/Home.module.css";
import { useRouter } from "next/router";

export default function Home({ staticProps }) {
  const [infleuxTrackerObject, setInfleuxTrackerObject] = useState(null);
  const [iflxSd, setIflxSd] = useState(null);
  const router = useRouter();

  const reportPageViewManually = ({ page }) => {
    if (typeof window !== "undefined") {
      window.InfleuxTracker.reportPageView(page);
    }
  };

  useEffect(() => {
    if (router.query?.iflx_sd !== undefined) {
      setIflxSd(router.query?.iflx_sd);
    } else {
      setIflxSd("parameter is not on the url.");
    }
  }, [router]);

  return (
    <div className={styles.container}>
      <Head>
        <title>Infleux Laboratory</title>
        <meta name="description" content="Guinea pigs are soooo cute :)" />
      </Head>
      <Script
        src="https://cdn.infleux.io/infleux-tracker/scripts/tracker-web.js"
        onLoad={() => {
          window.InfleuxTracker &&
            window.InfleuxTracker.init("ee8d1d1b-1784-4ac5-ac01-52d35d77a6c2");
          setInfleuxTrackerObject(window.InfleuxTracker);
        }}
      />
      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to{" "}
          <a href="https://infleux.co" target="_blank" rel="noreferrer">
            Infleux Laboratory
          </a>
        </h1>
        <p className={styles.description}>
          InfleuxTracker: {`${JSON.stringify(infleuxTrackerObject)}`}
        </p>

        <p className={styles.description}>iflx_sd: {`${iflxSd}`}</p>
        <button
          className={styles.button}
          onClick={() =>
            reportPageViewManually({
              page: "http://localhost:2999/simulacao-iniciada",
            })
          }
        >
          Report page view manually
        </button>
        {staticProps.map((data) => (
          <p key={data.id} className={styles.description}>
            {data.text}
          </p>
        ))}
      </main>
    </div>
  );
}

export async function getStaticProps() {
  return {
    props: {
      staticProps: [
        {
          id: 1,
          text: "dummy text to simulate a server side rendering (and prove that the script works even when using SSR)",
        },
      ],
    },
  };
}
