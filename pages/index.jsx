import Head from "next/head";
import Link from "next/link";

import { getSortedPostsMeta } from "../lib/posts";
import utilStyles from "../styles/util.module.css";
import Layout, { siteTitle } from "../components/layout";
import Date from "../components/date";

// Static Site Generation
export async function getStaticProps() {
  const allPosts = await getSortedPostsMeta();
  return {
    props: {
      allPosts,
    },
  };
}

// Server Side Rendering
// export async function getServerSideProps() {
//   const allPosts = getSortedPostsMeta();
//   return {
//     props: {
//       allPosts,
//     },
//   };
// }

export default function Home({ allPosts }) {
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
      <section className={`${utilStyles.paddingVertical}`}>
        <h2 className={utilStyles.headingLg}>Articles</h2>
        <ul className={utilStyles.list}>
          {allPosts.map((post) => (
            <li className={utilStyles.listItem} key={post.id}>
              <Link href={`/posts/${post.id}`}>{post.title}</Link>
              <br />
              <small className={utilStyles.lightText}>
                <Date dateString={post.created} />
              </small>
            </li>
          ))}
        </ul>
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
