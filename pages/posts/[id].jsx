import Head from "next/head";

import {
  // getAllPostIds,
  // getPostData,
  getAllPostsId,
  getPost,
} from "../../lib/posts";
import utilStyles from "../../styles/util.module.css";
import Layout from "../../components/layout";
import Date from "../../components/date";

// Fetch list of all post ids as static paths
export async function getStaticPaths() {
  const ids = await getAllPostsId();
  return {
    paths: ids.map((id) => ({
      params: {
        id,
      },
    })),
    fallback: false,
  };
}

// Fetch a post based on id as static props
export async function getStaticProps({ params }) {
  const post = await getPost(params.id);
  return {
    props: {
      post,
    },
  };
}

export default function Post({ post }) {
  return (
    <Layout>
      <Head>
        <title>{post.title}</title>
      </Head>
      <h1 className={utilStyles.headingXl}>{post.title}</h1>
      <div className={utilStyles.lightText}>
        <Date dateString={post.created} />
      </div>
      <div
        className={utilStyles.paddingVertical}
        dangerouslySetInnerHTML={{ __html: post.contentHtml }}
      />
    </Layout>
  );
}
