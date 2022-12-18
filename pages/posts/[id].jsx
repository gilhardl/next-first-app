import Head from "next/head";

import { getAllPostIds, getPostData } from "../../lib/posts";
import utilStyles from "../../styles/util.module.css";
import Layout from "../../components/layout";
import Date from "../../components/date";

// Fetch list of all post ids as static paths
export async function getStaticPaths() {
  const paths = await getAllPostIds();
  return {
    paths,
    fallback: false,
  };
}

// Fetch post data based on id as static props
export async function getStaticProps({ params }) {
  const postData = await getPostData(params.id);
  return {
    props: {
      postData,
    },
  };
}

export default function Post({ postData }) {
  return (
    <Layout>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <h1 className={utilStyles.headingXl}>{postData.title}</h1>
      <div className={utilStyles.lightText}>
        <Date dateString={postData.date} />
      </div>
      <div
        className={utilStyles.paddingVertical}
        dangerouslySetInnerHTML={{ __html: postData.contentHtml }}
      />
    </Layout>
  );
}
