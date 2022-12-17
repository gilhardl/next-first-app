import Head from "next/head";

import utilStyles from "../styles/util.module.css";
import Layout, { siteTitle } from "../components/layout";

export default function Home() {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section>
        <p className={utilStyles.headingMd}>
          Hi ! My name is <strong>Lucas</strong>, I'm a software engineer
          building websites and web / mobile applications using Next.js and
          Flutter.
        </p>
      </section>
      <footer>
        <p>
          This is a sample website - you’ll be building a site like this on{" "}
          <a href="https://nextjs.org/learn">our Next.js tutorial</a>.
        </p>
      </footer>
    </Layout>
  );
}
